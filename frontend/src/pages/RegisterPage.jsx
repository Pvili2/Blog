import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify"
import loading2 from "../images/loading2.svg"

export default function HomePage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBtnDisabled(true)
        if (!password || !username) return toast.error("Please enter your username or password") && setBtnDisabled(false)

        let isError = false;
        await axios.post("https://talkblog-backend.onrender.com/api/v1/users/register", { username, password }).catch(err => {
            isError = true;
        })
        if (isError) toast.error("Registration fail! 💥")
        !isError && toast.success("Registration successful! 👏")
        setUsername("")
        setPassword("")
        setBtnDisabled(false)
    }

    return (
        <div className="auth-form">
            <p style={{ fontSize: "2.3rem", marginBottom: "10px" }}>Register:</p>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username:" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password:" />
                <button disabled={btnDisabled} style={btnDisabled ? { backgroundColor: "inherit", border: "1px solid black", color: "black", cursor: "default" } : null} className="submit-btn">{btnDisabled ? <img width="40px" src={loading2} alt="loading" /> : <span>Register</span>}</button>
            </form>
        </div>
    )
}