import { NavLink, Outlet } from "react-router-dom"
import { useContext, useEffect } from "react"
import { provider } from "../utils/provider"
import { useNavigate } from "react-router"
import { UserContext } from "../components/UserContext"

export default function ProfileLayout() {

    const userContext = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        provider(userContext);
        userContext.userInfo.status !== "success" && navigate("/");
    }, [])

    return (
        <div className="profile-container">
            <nav className="profile-nav">
                <NavLink to="/profile" end style={({ isActive }) => isActive ? { textDecoration: "underline" } : { textDecoration: "none" }}>My Profile</NavLink>
                <NavLink to="/profile/posts" style={({ isActive }) => isActive ? { textDecoration: "underline" } : { textDecoration: "none" }}>My Posts</NavLink>
            </nav>
            <Outlet />
        </div>
    )
}