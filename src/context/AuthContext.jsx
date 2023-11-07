import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { signOutUser, userStateListener } from "@/utils/auth";
import { doc, getDoc } from "firebase/firestore";
import { userCollection } from "@/utils/firestore";

export const AuthContext = createContext({
    currentUser: {},
    currentUserData: {},
    setCurrentUser: (_user) => {},
    signOut: () => {},
});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [currentUserData, setCurrentUserData] = useState({});

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                setCurrentUser(user);
            }
        });
        return unsubscribe;
    }, [setCurrentUser]);

    useEffect(() => {
        const getData = async () => {
            if (currentUser) {
                const data = await getDoc(doc(userCollection, currentUser.uid));
                if (data.exists()) {
                    setCurrentUserData(data.data());
                }
            } else {
                setCurrentUserData({});
            }
        };

        getData();
    }, [currentUser]);

    const signOut = () => {
        signOutUser();
        setCurrentUser(null);
        navigate("/");
    };

    const value = {
        currentUser,
        currentUserData,
        setCurrentUser,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
