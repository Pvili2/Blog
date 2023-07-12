import axios from "axios";
import { useLoaderData } from "react-router";
import Post from "../components/PostComponent";
import img from "../images/704031.jpg"

export async function loader({ request }) {

    const username = new URL(request.url).pathname.split('/')[2];

    const response = await axios.get("http://localhost:4000/api/v1/posts/getUserPosts/" + username)

    return response?.data?.data;
}

export default function AuthorPostPage() {

    const posts = useLoaderData();
    return (
        <div className="posts">
            {posts.length === 0 ? <>This user don't have any post</> : posts.map((post, index) => {
                return <Post key={index} url={post.urlTitle} summary={post.summary} image={img} id={post._id} writer={post.writer} content={post.content} title={post.title} created={post.publishedTime} />
            })}
        </div>
    )
}