import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';
import { UserContext } from "../components/UserContext";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userContext = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await axios.post("http://localhost:4000/api/v1/users/login", { username, password }).catch((err) => {
            alert(err.response.data.message);
        })

        if (response?.data?.status === "success") {
            window.localStorage.setItem("token", response.data.token)
            userContext.setUserInfo({ status: "success", data: response.data.user })
            navigate("/")
        } else {
            userContext.setUserInfo({ status: "error" })
            return null;
        }
    }

    const handleChange = (e) => {
        e.target.name === "username" ? setUsername(e.target.value) : setPassword(e.target.value);
    }

    return (
        <div className="auth-form">
            <p style={{ fontSize: "2.3rem", marginBottom: "10px" }}>Login:</p>
            <form onSubmit={handleLogin}>
                <input onChange={handleChange} type="text" name="username" placeholder="Username:" value={username} />
                <input onChange={handleChange} type="password" name="password" placeholder="Password:" value={password} />
                <button className="submit-btn">Login</button>
            </form>
        </div>
    )
}