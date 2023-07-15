import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserContext } from "../components/UserContext";

export async function loader({ request }) {
    const id = new URLSearchParams(request.url.split("?")[1]).get("id")
    if (!id) return null;

    const response = await axios.get(process.env.REACT_APP_API_URL + "/api/v1/posts/" + id)

    return response?.data?.data;
}

export default function SinglePostPage() {
    const userContext = useContext(UserContext)
    console.log(userContext.userInfo)
    const format = require("date-format")
    const post = useLoaderData();
    const date = format("yyyy-MM-dd hh:mm", new Date(post.publishedTime))
    const [showComments, setShowComments] = useState(false)
    return (
        <div className="single-post">
            <h1>{post.title}</h1>
            <div className="info">
                <span>Author: <Link to={`/author/${post.writer}`}>{post.writer}</Link> | </span> <span> Last updated: {date}</span>
            </div>
            <hr />
            <div className="blog-post">
                <div style={{ textJustify: "inter-character", fontSize: "1.2rem" }} dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
            <hr />
            <Accordion style={{ backgroundColor: "#B7C6D8" }}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Comments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {userContext.userInfo.status === "success" && (
                        <div>
                            <form>
                                <input type="textarea" style={{ width: "100%" }} placeholder="Comment..." />
                                <button>Send</button>
                            </form>
                        </div>
                    )}
                    <Comment key="1" />
                    <Comment key="2" />
                    <Comment key="3" />
                </AccordionDetails>
            </Accordion>

        </div>
    )
}

function Comment() {
    return (
        <div className="comment-item">
            <div className="comment-author">Pvili2:</div>
            Comment content
        </div>
    )
}