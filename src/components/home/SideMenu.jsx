import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { ProfileIcon } from "@/components/icons/ProfileIcon";
import { MessagesIcon } from "@/components/icons/MessagesIcon";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { SignOutIcon } from "@/components/icons/SignOutIcon";
import logoIcon from "@/assets/LogoV5.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import YesNoModal from "../overlay/YesNoModal";

function SideMenu({ showMenu, toggleMenu, currentPath }) {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showSignOut, setShowSignOut] = useState(false);

    const routeTo = (event) => {
        const path = event.target.getAttribute("data-path");
        navigate(path);

        toggleMenu();
    };

    const toggleSignOut = () => {
        setShowSignOut((prev) => !prev);
    };

    const linkArray = [
        { name: "home", path: "", icon: <HomeIcon /> },
        { name: "profile", path: "profile", icon: <ProfileIcon /> },
        { name: "search", path: "search", icon: <SearchIcon /> },
        { name: "settings", path: "settings", icon: <SettingsIcon /> },
    ];

    return (
        <>
        <YesNoModal condition={showSignOut} Yes={signOut} No={toggleSignOut} title="Sign Out" description="Are you sure you want to signout?" />
            <div
                className={`flex flex-col p-4 min-w-[300px] backdrop-blur-sm ease-in-out duration-200 z-20 lg:static lg:translate-x-0 absolute left border-r-2 lg:border-slate-300  border-r-slate-50 shadow-lg h-screen bg-slate-100/90 ${
                    showMenu ? "translate-x-0" : "translate-x-[-100%]"
                }`}
            >
                <button
                    onClick={toggleMenu}
                    className={`absolute duration-200 lg:hidden w-10 h-10 bg-transparent rounded-full top-3 right-[-45px] ${
                        showMenu ? "block" : "hidden"
                    }`}
                >
                    <FontAwesomeIcon
                        className="text-black"
                        icon={faXmark}
                        size="lg"
                    />
                </button>
                <div className=" mb-2 px-2 pb-5 pt-2 font-extrabold text-slate-700 items-center gap-3 border-b-2 flex ">
                    <img className=" h-10 w-10" src={logoIcon} alt="" />
                    <p className="flex flex-col">
                        Emolink:
                        <span className="font-medium text-xs">
                            Feel, See and Connect
                        </span>
                    </p>
                </div>
                <ul className="flex flex-col w-full text-slate-600 gap-1 text-sm">
                    {linkArray.map((link, i) => (
                        <li
                            key={i}
                            data-path={link.path}
                            onClick={routeTo}
                            className={`flex px-3 capitalize ${
                                currentPath == link.name
                                    ? "bg-primary text-white"
                                    : "hover:bg-primary/10 hover:text-secondary"
                            } items-center gap-3 font-semibold  rounded-md w-full h-12 lg:h-10`}
                        >
                            {link.icon}
                            {link.name}
                        </li>
                    ))}

                    <hr />
                    <li
                        onClick={toggleSignOut}
                        className="flex px-3 items-center gap-3 font-semibold hover:bg-red-10 hover:text-red-600 rounded-md w-full h-12 lg:h-10 "
                    >
                        <SignOutIcon />
                        SignOut
                    </li>
                </ul>
            </div>
            <div
                className={`absolute bg-black/20 delay-200 z-10 backdrop-blur-sm ${
                    showMenu ? "block" : "hidden"
                } w-screen h-screen lg:hidden`}
            ></div>
        </>
    );
}

export default SideMenu;
