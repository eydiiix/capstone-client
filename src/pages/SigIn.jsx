import logo from "@/assets/LogoV3.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
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
        // Show the terms and conditions modal
        setShowTermsModal(true);
    };
    const handleAgree = () => {
        // Close the modal and navigate to the signup page
        setShowTermsModal(false);
        navigate("/signup"); // Navigate to the signup page
    };

    const handleDecline = () => {
        setShowTermsModal(false); // Close the modal when the "Decline" button is clicked
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
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">
                            <Link to="/terms" className="text-primary">
                                Terms and Conditions
                            </Link>
                        </h2>
                        <div className="flex items-center mb-4"> {}
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={() => setAgreedToTerms(!agreedToTerms)}
                                className="mr-2"
                            />
                            <span>
                                By clicking, you are agreed to Terms and Condition.
                                (Click the Terms and Condition above for more info )
                            </span>
                        </div>
                        <div className="flex"> {}
                            <button
                                className={`bg-primary text-white px-4 py-2 rounded-md font-semibold ${
                                    !agreedToTerms ? "cursor-not-allowed opacity-50" : ""
                                } mr-2`} 
                                onClick={handleAgree}
                                disabled={!agreedToTerms}
                            >
                                Agree
                            </button>
                            <button
                                className="bg-red-300 text-red-600 px-4 py-2 rounded-md font-semibold" // Style for the "Decline" button
                                onClick={handleDecline}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </form>
            <TransitionOpacity show={forgotPasswordIsOpen}>
                <ForgotPasswordModal toggle={toggleForgotPassword} />
            </TransitionOpacity>
        </div>
    );
}

export default SignIn;
