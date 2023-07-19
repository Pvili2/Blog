import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from "../components/UserContext";

export async function loader({ request }) {
    const id = new URLSearchParams(request.url.split("?")[1]).get("id")
    if (!id) return null;

    const response = await axios.get(process.env.REACT_APP_API_URL + "/api/v1/posts/" + id)

    return response?.data?.data;
}

export default function SinglePostPage() {
    const userContext = useContext(UserContext)
    const format = require("date-format")
    const post = useLoaderData();
    const comments = post.comments;

    const date = format("yyyy-MM-dd hh:mm", new Date(post.publishedTime))
    const [showComments, setShowComments] = useState(true)
    const [message, setMessage] = useState("");

    const handleChange = () => {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
        }
    }

    const handleCommentSending = async () => {
        await axios.post(process.env.REACT_APP_API_URL + "/api/v1/comments", {
            content: message,
            id: post._id
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }).catch(err => console.log(err))


        setMessage("");
    }

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
            <Accordion expanded={showComments} onChange={handleChange} style={{ backgroundColor: "#B7C6D8" }}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Comments</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {userContext.userInfo.status === "success" && (
                        <Paper
                            component="form"
                            sx={{ display: 'flex', alignItems: 'center', flexDirection: "row" }}
                        >
                            <InputBase
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                sx={{ ml: 1, flex: 1, borderRadius: "10px" }}
                                placeholder="Write a comment..."

                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton onClick={handleCommentSending} type="button" sx={{ p: '10px' }} aria-label="search">
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    )}
                    {comments && comments.map((comment, index) => {
                        return <Comment key={index} content={comment.content} username={comment.username} createdAt={format("yyyy-MM-dd hh:mm", new Date(Number(comment.createdAt)))} />
                    })}
                </AccordionDetails>
            </Accordion>

        </div>
    )
}

function Comment({ content, username, createdAt }) {
    return (
        <div className="comment-item">
            <div className="comment-author"><span>@{username} </span><span> {createdAt}</span></div>
            <div>
                {content}
            </div>
        </div>
    )
}