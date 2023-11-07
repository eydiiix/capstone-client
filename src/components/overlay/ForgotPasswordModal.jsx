import { useEffect, useState } from "react";
import InputErrorMessage from "../error/InputErrorMessage";
import ButtonLoader from "../loader/ButtonLoader";
import { Ripple, initTE } from "tw-elements";
import { handleResetEmailError } from "@/utils/validation";
import { resetUserPassword } from "@/utils/auth";

function ForgotPasswordModal({ toggle }) {
    useEffect(() => {
        initTE({ Ripple });
    }, []);

    const [resetEmailError, setResetEmailError] = useState("");
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleChangeResetPassword = (e) => {
        setEmail(e.target.value);
    };

    const handleFocus = () => {
        setResetEmailError("");
    };

    const handleDone = () => {
        toggle();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSending(true);
        try {
            await resetUserPassword(email);
            setEmailSent(true);
        } catch (error) {
            const errorFound = await handleResetEmailError(error, email);
            setResetEmailError(errorFound);
        }
        setIsSending(false);
        setEmail("");
    };

    return (
        <div className=" py-8 flex items-end lg:items-center justify-center w-screen h-screen absolute z-50 backdrop-blur-sm bg-black/40">
            <div
                className={`flex flex-col items-center flex-wrap p-5 h-fit w-11/12 max-w-md bg-white rounded-md `}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 bg-gradient-to-br from-primary to-secondary p-2.5 stroke-white rounded-full h-12 stroke-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>

                <p className="py-2 text-slate-800 font-bold">
                    Forgot password?
                </p>
                <p
                    className={`p-1 text-center  text-slate-500 ${
                        emailSent ? "text-sm" : "text-ss"
                    }`}
                >
                    {emailSent ? (
                        <>
                            We've sent you an email with a link to <br /> reset
                            your password.
                        </>
                    ) : (
                        <>
                            Enter your email address in the form below and we
                            will send you a link to reset your password
                        </>
                    )}
                </p>
                {!emailSent && (
                    <form
                        className=" flex flex-col w-full"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className={`border h-10 border-slate-400 p-2 mt-2  focus:outline-0 focus:border-primary focus:ring-1 focus:ring-primary rounded-md ${
                                resetEmailError
                                    ? "animate-shake border-2 border-error ring-1 ring-error"
                                    : ""
                            } `}
                            type="email"
                            placeholder="Email address"
                            value={email}
                            disabled={isSending}
                            onFocus={handleFocus}
                            onChange={handleChangeResetPassword}
                            name="email"
                            autoComplete="new-email"
                        />
                        <InputErrorMessage message={resetEmailError} />
                        <div className="block lg:flex lg:flex-row-reverse lg:gap-4">
                            <button
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                type="submit"
                                className="mt-4 font-semibold rounded-md w-full bg-primary h-10  text-white text-center"
                                disabled={isSending}
                            >
                                <ButtonLoader
                                    name="Confirm"
                                    condition={isSending}
                                />
                            </button>
                            <button
                                type="button"
                                className="mt-2 lg:mt-4 h-10 rounded-md font-semibold text-slate-500 bg-slate-100 border-slate-400 border ring-slate-400 text-center w-full"
                                onClick={toggle}
                                disabled={isSending}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
                {emailSent && (
                    <button
                        className="mt-4 font-semibold rounded-md w-full bg-primary h-10  text-white text-center"
                        onClick={handleDone}
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
}

export default ForgotPasswordModal;
