import { useNavigate } from "react-router"
import { Link } from "react-router-dom";

export default function Post({ title, writer, created, id, image, summary, url }) {

    const navigate = useNavigate();

    if (summary.length > 160) {
        summary = summary.substring(0, 160)
        summary += "..."
    }
    if (title.length > 50) {
        title = title.substring(0, 50)
        title += "..."
    }

    const handleClick = () => {
        navigate(`/post/${url}?id=${id}`)
    }
    return (
        <div className="post-item">
            <div className="image">
                <img src={image} alt="valami" />
            </div>
            <div className="content-body">
                <h2 onClick={handleClick} className="title">{title}</h2>
                <p className="info">
                    <span>Author: <Link style={{ color: "#D3AC2B", textDecoration: "none" }} to={`/author/${writer}`}>{writer}</Link> | </span><span> Date: {created}</span>
                </p>
                <p>{summary}</p>
            </div>
        </div>
    )
}