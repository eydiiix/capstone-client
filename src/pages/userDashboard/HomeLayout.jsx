import { useState } from "react";
import SideMenu from "@/components/home/SideMenu";
import Header from "@/components/home/Header";
import { Outlet, useLocation } from "react-router-dom";

function HomeLayout() {
    const [showMenu, setshowMenu] = useState(false);
    
    const { pathname } = useLocation();
    const splitPath = pathname.split("/");
    let currentPathName;

    if (splitPath.length == 3) {
        currentPathName = splitPath[splitPath.length - 1];
    } else {
        currentPathName = "home";
    }

    const toggleMenu = () => {
        setshowMenu((open) => !open);
    };


    return (
        <div className="flex flex-col justify-center items-center bg-white w-screen h-screen overflow-hidden select-none relative">
            <Header toggleMenu={toggleMenu} currentPath={currentPathName} />
            
            <div className="flex h-full w-full">
                <SideMenu
                    showMenu={showMenu}
                    currentPath={currentPathName}
                    toggleMenu={toggleMenu}
                />
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;
