import axios from "axios";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";


export async function loader({ request }) {
    const id = new URLSearchParams(request.url.split("?")[1]).get("id")
    if (!id) return null;

    const response = await axios.get(process.env.REACT_APP_API_URL + "/api/v1/posts/" + id)

    return response?.data?.data;
}

export default function SinglePostPage() {
    const format = require("date-format")
    const post = useLoaderData();
    const date = format("yyyy-MM-dd hh:mm", new Date(post.publishedTime))

    return (
        <div className="single-post">
            <h1>{post.title}</h1>
            <div className="info">
                <span>Author: <Link>{post.writer}</Link> | </span> <span> Last updated: {date}</span>
            </div>
            <hr />
            <div className="blog-post">
                <div style={{ textJustify: "inter-character", fontSize: "1.2rem" }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
        </div>
    )
}