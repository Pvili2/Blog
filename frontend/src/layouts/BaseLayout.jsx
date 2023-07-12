import { Outlet } from "react-router";
import Header from "../components/Header";

export default function BaseLayout() {

    return (
        <div className="container">
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}