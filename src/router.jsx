import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import App from "@/App";
import Home from "@/pages/userDashboard/Home";
import SignIn from "@/pages/SigIn";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateOutlet from "./components/PrivateOutlet";
import SignUp from "./pages/SignUp";
import Terms from "./pages/Terms";
import HomeLayout from "@/pages/userDashboard/HomeLayout";
import Profile from "./pages/userDashboard/Profile";
import Search from "./pages/userDashboard/Search";
import Messages from "./pages/userDashboard/Messages";
import Settings from "./pages/userDashboard/Settings";
import Notifications from "./pages/userDashboard/Notifications";

function AppRouter() {
    const { currentUser, currentUserData } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const userId = params.userId;

    useEffect(() => {
        if (currentUser && userId !== currentUserData.userId) {
            navigate(`/${currentUserData.userId}`);
        }
    }, [currentUser, currentUserData.userId, userId]);

    return (
        <Routes>
            <Route index element={<App />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateOutlet />}>
                <Route path="/:userId" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="search" element={<Search />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="notifications" element={<Notifications />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRouter;
