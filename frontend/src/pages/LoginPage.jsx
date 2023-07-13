import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify"
import axios from 'axios';
import { UserContext } from "../components/UserContext";
import loading2 from "../images/loading2.svg"



export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false)
    const userContext = useContext(UserContext)
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setBtnDisabled(true)
        e.preventDefault();

        const response = await axios.post("https://talkblog-backend.onrender.com/api/v1/users/login", { username, password }).catch((err) => {
            toast.error(err.response.data.message);
        })

        if (response?.data?.status === "success") {
            window.localStorage.setItem("token", response.data.token)
            userContext.setUserInfo({ status: "success", data: response.data.user })
            toast.success("You're signed in! 👌")
            setTimeout(() => {
                navigate("/")
            }, 2000);
        } else {
            userContext.setUserInfo({ status: "error" })
            setBtnDisabled(false)
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
                <button disabled={btnDisabled} style={btnDisabled ? { backgroundColor: "inherit", border: "1px solid black", color: "black", cursor: "default" } : null} className="submit-btn">{btnDisabled ? <img width="40px" src={loading2} alt="loading" /> : <span>Login</span>}</button>
            </form>
        </div>
    )
}