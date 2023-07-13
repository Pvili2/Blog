import { Outlet } from "react-router";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function BaseLayout() {

    return (
        <div className="container">
            <ToastContainer />
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}