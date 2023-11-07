import InputErrorMessage from "@/components/error/InputErrorMessage";
import ButtonLoader from "@/components/loader/ButtonLoader";
import { AuthContext } from "@/context/AuthContext";
import { reauthenticateUser, updateUserPassword } from "@/utils/auth";
import {
    handlePasswordError,
    validateSignUpPassword,
} from "@/utils/validation";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const passwords = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

function ChangePassword() {
    const { currentUser, currentUserData } = useContext(AuthContext);
    const { email } = currentUserData;
    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [passwordField, setPasswordField] = useState(passwords);
    const { currentPassword, newPassword, confirmPassword } = passwordField;
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordField((prev) => ({ ...prev, [name]: value }));
    };

    const resetPasswordField = () => {
        setPasswordField(passwords);
    };

    const handleFocus = () => {
        setCurrentPasswordError("");
        setNewPasswordError("");
        setConfirmPasswordError("");
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await reauthenticateUser(currentUser, email, currentPassword);
            await validateSignUpPassword(newPassword, confirmPassword);
            if (newPassword === currentPassword) {
                throw new Error("auth/same-password");
            }
            await updateUserPassword(currentUser, newPassword);
            toast.success("Password updated");
            resetPasswordField();
        } catch (error) {
            const { passwordError, confirmError } = await handlePasswordError(
                error
            );
            if (error.code == "auth/missing-password") {
                setCurrentPasswordError("This field cannot be empty");
            } else if (error.code == "auth/invalid-login-credentials") {
                setCurrentPasswordError("Incorrect password. Please try again");
            } else if (passwordError) {
                setNewPasswordError(passwordError);
            } else if (confirmError) {
                setConfirmPasswordError(confirmError);
            } else if (error.message == "auth/same-password") {
                setNewPasswordError(
                    "New password must be different from the current password"
                );
            } else {
                setCurrentPasswordError(error.message);
            }
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full lg:p-0 px-3 pt-10 lg:items-start items-center">
            <Toaster />
            <div className="p-6 lg:max-w-[30%] w-full">
                <h1 className="font-bold text-md text-slate-800">
                    Change password
                </h1>
                <p className="text-[0.85rem] pt-1 text-slate-700">
                    Update your password associated with your account.
                </p>
            </div>
            <form
                className="flex flex-col lg:w-[70%] w-full py-4 px-5 "
                onSubmit={handleUpdate}
            >
                <div className="flex flex-col w-full">
                    <label
                        htmlFor="currentPassword"
                        className="font-semibold text-sm py-2"
                    >
                        Current password
                    </label>
                    <div className="flex w-full relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            id="currentPassword"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            autoComplete="new-password"
                            disabled={loading}
                            maxLength={50}
                            className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border  focus:border-primary focus:ring-1 disabled:text-slate-400 ${
                                currentPasswordError
                                    ? "animate-shake border-error ring-1 ring-error"
                                    : "border-slate-300"
                            } `}
                        />
                        {currentPassword.length != 0 && (
                            <button
                                className="absolute right-4 top-2/4 translate-y-[-50%] text-slate-400"
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword((show) => !show)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        showCurrentPassword ? faEye : faEyeSlash
                                    }
                                />
                            </button>
                        )}
                    </div>
                </div>
                <InputErrorMessage message={currentPasswordError} />
                <div className="flex flex-col w-full mt-7">
                    <label
                        htmlFor="newPassword"
                        className="font-semibold text-sm py-2"
                    >
                        New password
                    </label>
                    <div className="flex relative w-full">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            disabled={loading}
                            autoComplete="new-password"
                            maxLength={50}
                            className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border focus:border-primary focus:ring-1 disabled:text-slate-400 ${
                                newPasswordError
                                    ? "animate-shake border-error ring-1 ring-error"
                                    : "border-slate-300"
                            }  `}
                        />
                        {newPassword.length != 0 && (
                            <button
                                className="absolute right-4 top-2/4 translate-y-[-50%] text-slate-400"
                                type="button"
                                onClick={() =>
                                    setShowNewPassword((show) => !show)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={showNewPassword ? faEye : faEyeSlash}
                                />
                            </button>
                        )}
                    </div>
                </div>
                <InputErrorMessage message={newPasswordError} />
                <div className="flex flex-col w-full mt-7">
                    <label
                        htmlFor="confirmPassword"
                        className="font-semibold text-sm py-2"
                    >
                        Confirm password
                    </label>
                    <div className="flex relative w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            autoComplete="new-password"
                            disabled={loading}
                            maxLength={50}
                            className={`h-10 w-full rounded-md capitalize px-3 text-sm focus:outline-0 border focus:border-primary focus:ring-1 disabled:text-slate-400 ${
                                confirmPasswordError
                                    ? "animate-shake border-error ring-1 ring-error"
                                    : "border-slate-300"
                            } `}
                        />
                        {confirmPassword.length != 0 && (
                            <button
                                className="absolute right-4 top-2/4 translate-y-[-50%] text-slate-400"
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((show) => !show)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        showConfirmPassword ? faEye : faEyeSlash
                                    }
                                />
                            </button>
                        )}
                    </div>
                </div>
                <InputErrorMessage message={confirmPasswordError} />
                <button
                    type="submit"
                    className=" rounded-md font-semibold w-24 bg-primary my-10 text-white h-10 px-4"
                >
                    <ButtonLoader name="Update" condition={loading} />
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
