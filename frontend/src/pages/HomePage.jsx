import axios from 'axios'
import Post from "../components/PostComponent"
import { useLoaderData } from 'react-router';
import img from "../images/704031.jpg"


export async function loader() {
    const response = await axios.get("https://talkblog-backend.onrender.com/api/v1/posts/")

    return response?.data?.data;
}

export default function HomePage() {

    const posts = useLoaderData();
    return (
        <div className="posts">
            {posts && posts.map((post, index) => {
                return <Post key={index} url={post.urlTitle} summary={post.summary} image={img} id={post._id} writer={post.writer} content={post.content} title={post.title} created={post.publishedTime} />
            })}
            {posts.length === 0 && <>There is no post yet! Login in and start writing!</>}
        </div>
    )
}