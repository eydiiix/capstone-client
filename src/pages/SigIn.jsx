import logo from "@/assets/LogoV3.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "@/components/overlay/ForgotPasswordModal";
import InputErrorMessage from "@/components/error/InputErrorMessage";
import ButtonLoader from "@/components/loader/ButtonLoader";
import { Ripple, initTE } from "tw-elements";
import TransitionOpacity from "@/components/transition/TransitionOpacity";
import { signInUser } from "@/utils/auth";
import {
    handleEmailError,
    handlePasswordError,
    validateEmail,
} from "@/utils/validation";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TermsModal from "@/components/signup/TermsModal";

const defaultFormData = { email: "", password: "" };

function SignIn() {
    const navigate = useNavigate();
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    useEffect(() => {
        initTE({ Ripple });
    }, []);

    const [formFields, setFormFields] = useState(defaultFormData);
    const { email, password } = formFields;
    const [rememberMe, setRememberMe] = useState(false);
    const [forgotPasswordIsOpen, setForgotPasswordIsOpen] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitLoader, setSubmitLoader] = useState(false);

    useEffect(() => {
        const storedFormData = localStorage.getItem("storedFormData");
        const storedRemeberMe = localStorage.getItem("storedRememberMe");
        const checked = storedRemeberMe === "true";
        const storedFormDataJSON = JSON.parse(storedFormData);
        if (checked) {
            setFormFields((prev) => ({ ...prev, ...storedFormDataJSON }));
            setRememberMe(true);
        }
    }, []);

    const clearField = (name) => {
        setFormFields((prevFormData) => ({
            ...prevFormData,
            [name]: "",
        }));
    };

    const toggleForgotPassword = () => {
        setForgotPasswordIsOpen((prevStatus) => !prevStatus);
    };

    const resetFormFields = () => {
        return setFormFields(defaultFormData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => {
        setEmailError("");
        setPasswordError("");
    };

    const handleSignUpClick = () => {
        setShowTermsModal(true);
    };
    const handleAgree = () => {
        setShowTermsModal(false);
        navigate("/signup"); 
    };

    const handleDecline = () => {
        setShowTermsModal(false);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitLoader(true);

        try {
            await validateEmail(email);
            const userCredential = await signInUser(email, password);

            if (userCredential) {
                resetFormFields();

                if (rememberMe) {
                    localStorage.setItem(
                        "storedFormData",
                        JSON.stringify(formFields)
                    );
                    localStorage.setItem("storedRememberMe", rememberMe);
                } else {
                    localStorage.removeItem("storedFormData");
                    localStorage.removeItem("storedRememberMe");
                }
                navigate("/home");
            }
        } catch (error) {
            setSubmitLoader(false);
            const { passwordError } = await handlePasswordError(error);
            const emailError = await handleEmailError(error);
            if (emailError === "auth/missing-password") {
                setPasswordError("Password cannot be empty");
            } else if (emailError) {
                setEmailError(emailError);
                clearField("password");
            } else if (passwordError) {
                setPasswordError(passwordError);
            }
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center select-none">
            <img
                src={logo}
                onClick={() => navigate("/")}
                alt=""
                className=" w-14 mb-4 "
            />
            <h1 className="mt-5 mb-8 text-slate-800 font-semibold text-2xl ">
                Sign in to your account
            </h1>
            <form
                className="flex flex-col sm:w-8/12 md:w-6/12 lg:w-4/12"
                onSubmit={handleSubmit}
            >
                <label
                    htmlFor="email"
                    className="py-1 text-sm text-slate-700 mt-3"
                >
                    Email address
                </label>
                <div className="relative">
                    <input
                        className={`h-10 w-full rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                            emailError
                                ? "animate-shake border-error ring-1 ring-error"
                                : ""
                        }`}
                        type="email"
                        disabled={submitLoader}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        autoComplete="off"
                        name="email"
                        id="email"
                        value={email}
                    />
                    {email.length != 0 && (
                        <button
                            className="absolute right-4 top-2/4 translate-y-[-50%] text-slate-400"
                            type="button"
                            onClick={() => {
                                clearField("email");
                                clearField("password");
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    )}
                </div>
                <InputErrorMessage message={emailError} />
                <label
                    htmlFor="password"
                    className="py-1 text-sm text-slate-700 mt-3"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        className={`h-10 w-full rounded-md px-3 focus:outline-0 border border-slate-300 focus:border-primary focus:ring-1 disabled:text-slate-400 ${
                            passwordError
                                ? "animate-shake border-error ring-1 ring-error"
                                : ""
                        }`}
                        type={showPassword ? "text" : "password"}
                        disabled={submitLoader}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        id="password"
                        autoComplete="new-password"
                        name="password"
                        value={password}
                    />
                    {password.length != 0 && (
                        <button
                            className="absolute right-4 top-2/4 translate-y-[-50%] text-slate-400"
                            type="button"
                            onClick={() => setShowPassword((show) => !show)}
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEye : faEyeSlash}
                            />
                        </button>
                    )}
                </div>

                <InputErrorMessage message={passwordError} />
                <div className=" pt-7 flex justify-between items-center">
                    <label className="text-sm" htmlFor="rememberMe">
                        <input
                            className="translate-y-0.5 mr-1"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe((check) => !check)}
                            name="rememberMe"
                            id="rememberMe"
                        />
                        Remember Me
                    </label>
                    <p
                        className="text-primary text-sm font-semibold cursor-pointer"
                        onClick={toggleForgotPassword}
                    >
                        Forgot Password?
                    </p>
                </div>
                <button
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className=" mt-10 mb-3 bg-primary text-white font-semibold rounded-lg h-10"
                    disabled={submitLoader}
                >
                    <ButtonLoader name="Sign In" condition={submitLoader} />
                </button>
                <p className="text-center text-slate-500 text-sm">
                    Don't have an account?
                    <a
                        className="ml-0.5 text-primary font-semibold cursor-pointer"
                        onClick={handleSignUpClick}
                    >
                        Sign Up
                    </a>
                </p>

                {showTermsModal && (
                    <TermsModal
                        agreedToTerms={agreedToTerms}
                        setAgreedToTerms={setAgreedToTerms}
                        handleAgree={handleAgree}
                        handleDecline={handleDecline}
                    />
                )}
            </form>
            <TransitionOpacity show={forgotPasswordIsOpen}>
                <ForgotPasswordModal toggle={toggleForgotPassword} />
            </TransitionOpacity>
        </div>
    );
}

export default SignIn;
