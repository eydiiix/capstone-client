import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { useNavigate } from "react-router-dom";

function Header({ toggleMenu, currentPath }) {
    const { currentUser, currentUserData } = useContext(AuthContext);
    const { firstname } = currentUserData
    const navigate = useNavigate();

    return (
        <header
            className={`px-3 ${
                currentPath == "home" ? "pt-1" : ""
            } flex w-screen absolute z-10 top-0 right-0 h-14 bg-white shadow-sm items-center overflow-hidden`}
        >
            {currentPath == "home" ? (
                <>
                    <button onClick={toggleMenu} className="lg:hidden w-10 ">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className="ml-auto mr-4 relative">
                        <span
                            className={`absolute h-2 w-2 block outline outline-slate-200 ${
                                currentUser
                                    ? "bg-green-500 animate-active"
                                    : "bg-slate-300"
                            } rounded-full right-[1px] bottom-[1px]`}
                        ></span>
                        {currentUser.photoURL ? (
                            <img
                                src={currentUser?.photoURL}
                                className="h-9 w-9 rounded-full border-2 border-slate-300 outline-4 outline-slate-400"
                                alt=""
                            />
                        ) : (
                            <div className="text-white bg-black h-9 w-9 border-2 border-slate-300  font-semibold text-xl rounded-full border uppercase flex items-center justify-center">
                                {firstname?.charAt(0)}
                            </div>
                        )}

                    </div>
                </>
            ) : (
                <>
                    <button
                        onClick={() => {
                            navigate(-1);
                            toggleMenu();
                        }}
                        className="lg:hidden w-10 pl-4 "
                    >
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="capitalize lg:hidden font-semibold absolute translate-x-[-50%] left-[50%]">
                        {currentPath}
                    </h1>
                </>
            )}
        </header>
    );
}

export default Header;
