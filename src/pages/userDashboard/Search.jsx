import MaleIcon from "@/components/icons/MaleIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { userCollection } from "@/utils/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import search from "@/assets/search-user.png";
import nothing from "@/assets/nothing.png";
import FemaleIcon from "@/components/icons/FemaleIcon";
import QuestionIcon from "@/components/icons/QuestionIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "@/context/AuthContext";

function Search() {
    const { currentUserData } = useContext(AuthContext);
    const [UID, setUID] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    const { firstname, lastname, interest, gender, age, userId } = user;

    const handleChange = async (event) => {
        setUID(event.target.value);
    };

    useEffect(() => {
        setLoaded(false);
    }, [UID]);

    const q = query(userCollection, where("userId", "==", UID));

    const handleSearch = async (event) => {
        event.preventDefault();
        setLoading(true);
        const querySnapshot = await getDocs(q);
        if (currentUserData.userId !== UID) {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                });
            } else {
                setUser({});
            }
        }
        setLoading(false);
        setLoaded(true);
    };

    return (
        <div className="flex px-16 pb-8 relative pt-20 flex-col h-full w-full">
            <header
                className={`px-3 absolute right-0 justify-center mt-16 lg:mt-14 flex top-0 w-full h-14 bg-white items-end`}
            >
                <form className="h-10 w-[90%] lg:w-[80%] flex " onSubmit={handleSearch}>
                    <div className="flex w-full h-10 items-center relative">
                        <SearchIcon className="absolute-y-center left-4 text-slate-700" />
                        <input
                            className="w-full h-full pl-14 pr-16 rounded-l-full rounded-r-full border-2 border-slate-300 focus:outline-none focus:border-none focus:ring-2 ring-primary"
                            type="text"
                            placeholder="Enter id here"
                            value={UID}
                            onChange={handleChange}
                            maxLength={10}
                            disabled={loading}
                            onFocus={()=>{setUID(''); setUser({})}}
                        />
                        {UID.length == 10 && !loaded && (
                            <button
                                className={`absolute-y-center font-semibold text-slate-600 right-4 p-2`}
                            >
                                Search
                            </button>
                        )}
                    </div>
                </form>
            </header>
            <div className="h-full flex lg:mt-14 md:mt-16 mt-24 items-center justify-center">
                {Object.keys(user).length != 0 ? (
                    <div className="w-96 h-full flex flex-col px-6 py-12 items-center">
                        <div
                            className={`flex items-center justify-center text-white font-bold uppercase text-5xl h-28 w-28 relative bg-black rounded-full ring-4 ${
                                gender === "male"
                                    ? "ring-primary"
                                    : gender === "female"
                                    ? "ring-pink-600"
                                    : "ring-slate-600"
                            }`}
                        >
                            <span
                                className={`flex items-center bottom-[-6px] absolute text-white rounded-r-full rounded-l-full gap-1 px-2 ${
                                    gender === "male"
                                        ? "bg-primary"
                                        : gender === "female"
                                        ? "bg-pink-600"
                                        : "bg-slate-600"
                                } text-sm font-semibold`}
                            >
                                {gender === "male" ? (
                                    <MaleIcon className="text-md" />
                                ) : gender === "female" ? (
                                    <FemaleIcon className="text-md" />
                                ) : (
                                    <QuestionIcon className="text-md" />
                                )}{" "}
                                {age}
                            </span>
                            {firstname?.charAt(0)}
                        </div>
                        <h1 className="font-semibold pt-6 capitalize text-lg">
                            {firstname} {lastname}
                        </h1>
                        <p className="text-sm  mb-6 text-slate-700">
                            ID: {userId}
                        </p>
                        <p className="text-[.7rem] py-2">INTERESTS:</p>
                        <div className="flex flex-wrap justify-center lg:px-4 gap-1">
                            {interest.map((inter, i) => {
                                return (
                                    <p
                                        key={i}
                                        className="border bg-slate-100 border-slate-500 rounded-l-full rounded-r-full px-2 text-slate-600 text-[.75rem] uppercase"
                                    >
                                        {inter}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                ) : Object.keys(user).length === 0 && loaded ? (
                    <div className="w-96 h-full flex flex-col px-6 py-12 justify-center items-center">
                        <img
                            src={nothing}
                            className="opacity-80 h-20 w-20"
                            alt=""
                        />
                        <h1 className="py-3 text-sm text-slate-800 font-semibold ">
                            Whooops!
                        </h1>
                        <p className="lg:pb-20 pb-32 text-slate-600 text-xs">
                            We couldn't find the user you were looking for.
                        </p>
                    </div>
                ) : loading ? (
                    <FontAwesomeIcon
                        icon={faSpinner}
                        spinPulse
                        className="w-6 h-6 text-primary"
                    />
                ) : (
                    <div className="w-96 h-full flex flex-col px-6 py-12 justify-center items-center">
                        <img
                            src={search}
                            className="opacity-80 h-20 w-20"
                            alt=""
                        />
                        <h1 className="py-3 text-sm text-slate-800 font-semibold ">
                            Search result
                        </h1>
                        <p className="lg:pb-20 pb-32 text-slate-600 text-xs">
                            You'll find search results here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
