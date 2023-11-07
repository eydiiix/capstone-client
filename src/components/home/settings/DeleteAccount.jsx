import TrashIcon from "@/components/icons/TrashIcon";
import ButtonLoader from "@/components/loader/ButtonLoader";
import { AuthContext } from "@/context/AuthContext";
import { deleteUserAccount } from "@/utils/auth";
import { delay } from "@/utils/delay";
import { deleteUserData } from "@/utils/firestore";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

function DeleteAccount() {
    const { currentUserData, currentUser, signOut } = useContext(AuthContext);
    const userId = currentUserData.userId;
    const [deleteThisUser, setDeleteThisUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        setDeleteThisUser(event.target.value);
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (userId === deleteThisUser) {
                await deleteUserData(currentUser.uid);
                await deleteUserAccount(currentUser);
                toast.success("Your Account Has Been Successfully Deleted");
                await delay(3);
                signOut();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const toggleDelete = () => {
        setShowModal((prev) => !prev);
        setDeleteThisUser("");
    };

    return (
        <div className="px-10 pt-10 w-full">
            <div
                className={`${
                    showModal ? "flex opacity-100" : "hidden opacity-0"
                } h-screen duration-200 z-50 bg-black/40 backdrop-blur-sm w-screen lg:items-center md:items-center  items-end py-3 justify-center absolute top-0 right-0`}
            >
                <div
                    className={`flex relative flex-col py-4 px-6  lg:w-[40%] w-[96%] md:w-[80%] md:h-[250px] lg:h-[250px] h-[320px] bg-white shadow-lg rounded-lg overflow-hidden`}
                >
                    <button
                        type="button"
                        className="absolute w-7 h-7 top-3 rounded-full right-3"
                        onClick={toggleDelete}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h1 className="flex items-center gap-3 font-semibold text-md text-center pb-4">
                        <div className="h-10 w-10 grid place-items-center bg-error/10 border-2 border-error rounded-full ">
                            <TrashIcon />
                        </div>
                        Are you sure you want to delete?
                    </h1>
                    <hr />
                    <p className="text-sm py-3">
                        Deleting your account will remove all your information
                        from our database. This cannot be undone.
                    </p>
                    <p className="text-slate-600 mt-4 text-[0.85rem]">
                        To confirm this, type your id "{userId}"
                    </p>
                    <form
                        className="flex flex-col lg:flex-row md:flex-row w-full py-2 md:gap-5 gap-2 h-10"
                        onSubmit={handleDelete}
                    >
                        <input
                            type="text"
                            value={deleteThisUser}
                            onChange={handleChange}
                            disabled={loading}
                            className={`h-10 min-h-[40px] w-full rounded-md px-3 text-sm focus:outline-0 border border-slate-300 disabled:text-slate-400 `}
                        />
                        <button
                            type="submit"
                            className="h-10 min-h-[40px]  bg-error font-semibold text-white px-6 rounded-md "
                        >
                            <ButtonLoader name="Delete" condition={loading} />
                        </button>
                    </form>
                </div>
            </div>
            <h1 className="font-bold text-md text-slate-800">Delete account</h1>
            <p className="text-[0.85rem] pt-2 leading-6 text-slate-700">
                No longer want to use our app? You can delete your account here.
                This action is not reversible. All information related to this
                account will be deleted permanently.
            </p>
            <button
                type="button"
                onClick={toggleDelete}
                className=" rounded-md font-semibold w-fit bg-error my-10 text-white h-10 px-4"
            >
                Delete my account
            </button>
        </div>
    );
}

export default DeleteAccount;
