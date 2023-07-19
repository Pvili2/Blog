import { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from './UserContext'
import { provider } from '../utils/provider'


export default function Header() {

    const userContext = useContext(UserContext)
    const username = userContext?.userInfo?.data?.username;
    useEffect(() => {
        provider(userContext);
    }, [])
    const handleClick = () => {
        localStorage.setItem("token", null)
        userContext.setUserInfo({ status: "error" })
    }
    return (

        <header>
            <div className="logo">
                <NavLink style={({ isActive }) => isActive ? { color: "#D3AC2B", backgroundColor: "none" } : {}} to="/">TalkBlog</NavLink>
            </div>
            {userContext.userInfo.status === "success" && (
                <nav>
                    <NavLink onClick={handleClick}>Logout</NavLink>
                    <NavLink style={({ isActive }) => isActive ? { color: "#D3AC2B" } : {}} to="/profile">{username}</NavLink>
                    <NavLink style={({ isActive }) => isActive ? { color: "#D3AC2B" } : {}} to="/create">Write new post</NavLink>
                </nav>
            )}
            {userContext.userInfo.status !== "success" && (
                <nav>

                    <NavLink style={({ isActive }) => isActive ? { color: "#D3AC2B" } : {}} to="/login">Login</NavLink>
                    <NavLink style={({ isActive }) => isActive ? { color: "#D3AC2B" } : {}} to="/register">Register</NavLink>
                </nav>
            )}
        </header>
    )
}