import axios from "axios"
import { useLoaderData } from "react-router";
import Post from "../components/PostComponent";
import img from "../images/704031.jpg"

export async function loader() {

    const response = await axios.get("https://talkblog-backend.onrender.com/api/v1/posts/getUserPosts", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }
    })

    return response?.data?.data;
}

export default function ProfilePostsPage() {

    const posts = useLoaderData();

    return (
        <div className="profile-content">
            {!posts ?
                <>You don't have any post yet!</> : <div className="posts"> {posts.map((post, index) => {
                    return <Post key={index} url={post.urlTitle} id={post._id} summary={post.summary} writer={post.writer} image={img} content={post.content} title={post.title} created={post.publishedTime} />
                })} </div>
            }
        </div>
    )
}