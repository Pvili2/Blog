import axios from "axios";
import { useState } from "react"


export default function HomePage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !username) return alert("Please enter your username or password")

        let isError = false;
        await axios.post("http://localhost:4000/api/v1/users/register", { username, password }).catch(err => {
            isError = true;
            return alert(err.response.data.message)
        })
        !isError && alert("Registration successfull")
        setUsername("")
        setPassword("")

    }

    return (
        <div className="auth-form">
            <p style={{ fontSize: "2.3rem", marginBottom: "10px" }}>Register:</p>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username:" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password:" />
                <button className="submit-btn">Register</button>
            </form>
        </div>
    )
}