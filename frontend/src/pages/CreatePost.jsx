import axios from "axios";
import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router";
import { UserContext } from "../components/UserContext";
import { provider } from "../utils/provider";
import 'react-quill/dist/quill.snow.css';


export default function CreatePost() {

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const userContext = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        provider(userContext);
        userContext.userInfo.status !== "success" && navigate("/");
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content || !title || !summary) return alert("You must have a title, a summary, and content");

        await axios.post(process.env.REACT_APP_API_URL + "/api/v1/posts/", { title, content, summary }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response)
        })
    }

    return (
        <div className="create-post">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="title" value={title} onChange={(e) => setTitle(e.target.value)} name="title" placeholder="Title..." />
                <label htmlFor="summary">Summary:</label>
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} name="summary" placeholder="Summary..." />
                <ReactQuill className="textEditor" theme="snow" value={content} onChange={(e) => { setContent(e) }} />
                <button className="submit-btn">Create Post</button>
            </form>

        </div>
    )
}