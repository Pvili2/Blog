import axios from "axios";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";


export async function loader({ request }) {
    console.log(request.url)
    const id = new URLSearchParams(request.url.split("?")[1]).get("id")
    if (!id) return null;

    const response = await axios.get("https://talkblog-backend.onrender.com/api/v1/posts/" + id)

    return response?.data?.data;
}

export default function SinglePostPage() {

    const post = useLoaderData();

    console.log(post)
    return (
        <div className="single-post">
            <h1>{post.title}</h1>
            <div className="info">
                <span>Author: <Link>{post.writer}</Link> | </span> <span> Last updated: {post.publishedTime.split("T")[0]} {post.publishedTime.split("T")[1].split('.')[0]}</span>
            </div>
            <hr />
            <div className="blog-post">
                <div style={{ textJustify: "inter-character", fontSize: "1.2rem" }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
        </div>
    )
}