import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateOutlet() {
    const { currentUser } = useContext(AuthContext);

    return  currentUser ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateOutlet;
