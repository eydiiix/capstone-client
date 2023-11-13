import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import avatar from "@/assets/avatar.jpg";
import CopyIcon from "@/components/icons/CopyIcon";
import { Toaster, toast } from "react-hot-toast";
import MaleIcon from "@/components/icons/MaleIcon";
import FemaleIcon from "@/components/icons/FemaleIcon";
import QuestionIcon from "@/components/icons/QuestionIcon";

function Profile() {
    const { currentUserData, currentUser } = useContext(AuthContext);
    const {
        email,
        firstname,
        lastname,
        userId,
        gender,
        age,
        bio,
        birthday,
        isVolunteer,
    } = currentUserData;

    const copyId = () => {
        navigator.clipboard.writeText(userId);
        toast.success("Copied to Clipboard!");
    };

    return (
        <div className="flex flex-col w-full px-10 pt-20 pb-10 overflow-x-hidden overflow-scroll">
            <Toaster />
            <div className="flex gap-5 w-full min-h-[100px] h-[100px] ">
                <div className="relative flex w-fit h-fit">
                    <div
                        className={`flex justify-center items-center h-4 w-7  absolute ${
                            gender == "male"
                                ? "bg-blue-500"
                                : gender == "female"
                                ? "bg-pink-500"
                                : "bg-slate-500"
                        } translate-x-[-50%] rounded-lg left-2/4 bottom-[-5px]`}
                    >
                        {gender == "male" ? (
                            <MaleIcon />
                        ) : gender == "female" ? (
                            <FemaleIcon />
                        ) : (
                            <QuestionIcon />
                        )}
                    </div>
                    <div
                        className={`block w-28 h-28 shadow-lg border-[3px] ${
                            gender == "male"
                                ? "border-blue-500"
                                : gender == "female"
                                ? "border-pink-500"
                                : "border-slate-500"
                        } rounded-full overflow-hidden bg-black`}
                    >{ currentUser.photoURL ?
                        <img src={currentUser.photoURL} alt="" /> :
                        <div className="text-white font-semibold text-4xl uppercase flex items-center justify-center h-full">{firstname.charAt(0)}</div>}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="font-semibold pt-3 uppercase md:text-md text-[15px]">
                        {firstname} {lastname}
                    </h1>
                    <div
                        onClick={copyId}
                        className="flex items-center cursor-pointer text-slate-600 gap-1"
                    >
                        <p className="pt-1 text-[0.85rem] lg:text-base">
                            ID:{userId}
                        </p>
                        <CopyIcon />
                    </div>
                </div>
            </div>
            <div className="w-full py-4 lg:pr-7 h-fit">
                <div className="flex flex-col w-full mt-7">
                    <label
                        htmlFor="email"
                        className="font-semibold text-sm py-2"
                    >
                        Email address
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        disabled
                        className={`h-10 w-full rounded-md px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                    />
                </div>
                <div className="flex flex-col w-full mt-7">
                    <label
                        htmlFor="birthday"
                        className="font-semibold text-sm py-2"
                    >
                        Birthday
                    </label>
                    <input
                        type="text"
                        id="birthday"
                        name="birthday"
                        value={birthday}
                        disabled
                        className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                    />
                </div>
                <div className="flex flex-col w-full mt-7">
                    <label htmlFor="age" className="font-semibold text-sm py-2">
                        Age
                    </label>
                    <input
                        type="text"
                        id="age"
                        name="age"
                        value={age}
                        disabled
                        className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                    />
                </div>
            </div>
        </div>
    );
}

export default Profile;
