import ButtonLoader from "@/components/loader/ButtonLoader";
import { AuthContext } from "@/context/AuthContext";
import { updateUserData } from "@/utils/firestore";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { storage } from "@/utils/firebase";
import { updateProfile } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faSpinner,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import YesNoModal from "@/components/overlay/YesNoModal";

function PersonalInforamtion() {
    const { currentUserData, currentUser } = useContext(AuthContext);
    const uid = currentUser.uid;
    const [edit, setEdit] = useState(true);
    const [loading, setLoading] = useState(false);
    const [deleteImg, setDeleteImg] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const { photoURL } = currentUser;
    const [imgDeleting, setImgDeleting] = useState(false);

    const toggleDeleteImg = () => {
        setDeleteImg((prev) => !prev);
    };

    

    const userData = {
        userId: currentUserData.userId,
        email: currentUserData.email,
        firstname: currentUserData.firstname,
        lastname: currentUserData.lastname,
        gender: currentUserData.gender,
        birthday: currentUserData.birthday,
        isVolunteer: currentUserData.isVolunteer,
        age: currentUserData.age,
        interest: currentUserData?.interests,
        bio: currentUserData?.bio,
    };
    
    const [imageUpload, setImageUpload] = useState(null);
    const [userDataField, setUserDataField] = useState(userData);
    const { email, firstname, lastname, gender, bio, birthday, isVolunteer } = userDataField;

    const handleDeleteImg = async () => {
        setImgDeleting(true);
        try {
            setDeleteImg(false);
            await updateProfile(currentUser, { photoURL: "" });
            toast.success("Image removed");
        } catch (error) {
            toast.error(error.message);
        }
        setDeleteImg(false);
        setImgDeleting(false);
    };


    const handleUploadImage = async (event) => {
        event.preventDefault();
        setImgUploading(true);
        if (imageUpload === null) {
            toast.error("Please select an image");
            return;
        }

        const imageRef = storageRef(storage, `images/${uid}`);

        try {
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const url = await getDownloadURL(snapshot.ref);
            updateProfile(currentUser, {
                photoURL: url,
            });
            toast.success('Avatar Updated')
        } catch (error) {
            toast.error(error.message);
        }
        setImgUploading(false);
        setImageUpload(null);
        
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserDataField((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const toggleEdit = (event) => {
        event.preventDefault();
        setEdit((prev) => !prev);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const status = await updateUserData(uid, userDataField);
            if (status) {
                toast.success("Updated!");
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        setEdit(true);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full lg:p-0 p-3 lg:items-start items-center">
            <YesNoModal
                title="Remove Avatar"
                description=" Are you sure you want to remove avatar?"
                condition={deleteImg}
                Yes={handleDeleteImg}
                No={toggleDeleteImg}
            />
            <div className="p-6 lg:max-w-[30%] w-full">
                <h1 className="font-bold text-md text-slate-800">
                    Pesonal Information
                </h1>
                <p className="text-[0.85rem] pt-1 text-slate-700">
                    Use a valid email address where you can receive email.
                </p>
            </div>
            <div className="flex flex-col lg:w-[70%] w-full py-4 px-5 ">
                <form
                    className="flex gap-5 w-full min-h-[100px] h-[100px] "
                    onSubmit={handleUploadImage}
                >
                    <div className="bg-black border-2 w-[100px] h-[100px] relative rounded">
                        <div className="flex absolute items-center justify-center backdrop-blur-sm bg-black/30 top-0 right-0 w-full h-full">
                            <FontAwesomeIcon
                                icon={faCamera}
                                className="text-white/70 h-10"
                            />
                        </div>
                        <input
                            className=" w-[100px] hidden h-[100px]"
                            id="imageInput"
                            label="Image"
                            accept="image/png,image/jpeg"
                            type="file"
                            onChange={(e) => {
                                setImageUpload(e.target.files[0]);
                            }}
                        />
                        { photoURL ? (
                            <img src={ photoURL } alt="" />
                        ) : (
                            <div className="text-white font-semibold text-4xl uppercase flex items-center justify-center h-full">
                                {firstname.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        {imageUpload == null ? (
                            <div className="flex gap-1">
                                <button
                                    type="button"
                                    disabled={imgDeleting}
                                    onClick={() => {
                                        document
                                            .getElementById("imageInput")
                                            .click();
                                    }}
                                    className="bg-primary text-white rounded-md h-9 font-semibold text-sm w-32"
                                >
                                    Change avatar
                                </button>
                                <button
                                    className={`bg-error text-white rounded-md h-9 font-semibold text-sm w-9 disabled:bg-slate-400`}
                                    type="button"
                                    disabled={imgDeleting || !photoURL}
                                    onClick={toggleDeleteImg}
                                >
                                    {imgDeleting ? (
                                        <FontAwesomeIcon
                                            icon={faSpinner}
                                            spinPulse
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faTrash} />
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-1">
                            <button
                                type="submit"
                                className="bg-primary text-white rounded-md h-9 font-semibold text-sm w-32"
                            >
                                <ButtonLoader
                                    name="Update"
                                    condition={imgUploading}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={()=>{setImageUpload(null)}}
                                className="bg-error text-white rounded-md h-9 font-semibold text-sm px-4"
                            >
                                Cancel
                            </button>
                            </div>
                        )}
                        <p className="text-[0.85rem] text-slate-600">
                            Update your avatar now
                        </p>
                    </div>
                </form>
                <form
                    className="w-full py-4 lg:pr-7 h-fit"
                    onSubmit={handleSave}
                >
                    <div className="flex flex-col lg:flex-row lg:gap-5">
                        <div className="flex flex-col lg:w-2/4 w-full">
                            <label
                                htmlFor="firstname"
                                className="font-semibold text-sm py-2"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={firstname}
                                disabled={edit}
                                onChange={handleChange}
                                className={`h-10 w-full rounded-md px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                            />
                        </div>
                        <div className="flex flex-col lg:w-2/4 w-full lg:mt-0 mt-7">
                            <label
                                htmlFor="lastname"
                                className="font-semibold text-sm py-2"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                disabled={edit}
                                onChange={handleChange}
                                className={`h-10 w-full rounded-md px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                            />
                        </div>
                    </div>
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
                            disabled={edit}
                            onChange={handleChange}
                            className={`h-10 w-full rounded-md px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                        />
                    </div>
                    <div className="flex flex-col w-full mt-7">
                        <label
                            htmlFor="gender"
                            className="font-semibold text-sm py-2"
                        >
                            Gender
                        </label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={gender}
                            disabled={true}
                            onChange={handleChange}
                            className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
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
                            disabled={true}
                            className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                        />
                    </div>
                    <div className="flex flex-col w-full mt-7">
                        <label
                            htmlFor="bio"
                            className="font-semibold text-sm py-2"
                        >
                            Bio
                        </label>
                        <input
                            type="text"
                            id="bio"
                            name="bio"
                            value={bio}
                            disabled={edit}
                            onChange={handleChange}
                            className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 `}
                        />
                    </div>
                    <div className="flex flex-col w-full mt-7">
                        <label
                            htmlFor="isVolunteer"
                            className="font-semibold text-sm py-2"
                        >
                            Are you volunteer?
                        </label>
                        <select
                            className={`w-full h-10 bg-transparent  rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-500 cursor-text disabled:cursor-default focus:ring-1 disabled:border-slate-400 disabled:bg-slate-50`}
                            name="isVolunteer"
                            id="isVolunteer"
                            defaultValue={isVolunteer}
                            disabled={edit}
                            onChange={handleChange}
                        >
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    <div className="flex gap-3 my-10">
                        {edit ? (
                            <button
                                type="button"
                                onClick={toggleEdit}
                                className=" rounded-md h-10 px-4 font-semibold w-20 bg-primary text-white"
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className=" rounded-md font-semibold w-20 bg-primary text-white h-10 px-4"
                                >
                                    <ButtonLoader
                                        name="Save"
                                        condition={loading}
                                    />
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleEdit}
                                    className={`border-2 ${
                                        loading ? "hidden" : "block"
                                    } border-slate-300 rounded-md h-10 px-4 font-semibold text-slate-400 hover:bg-slate-50 `}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalInforamtion;
