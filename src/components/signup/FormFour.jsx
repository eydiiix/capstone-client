import { useState } from "react";
import InputErrorMessage from "../error/InputErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

function FormFour(props) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        email,
        createPassword,
        confirmPassword,
        emailError,
        passwordError,
        confirmPasswordError,
        handleChange,
        setEmailError,
        setPasswordError,
        setConfirmPasswordError,
        back,
    } = props;

    return (
        <div className="flex justify-start w-10/12 lg:h-4/5 sm:w-8/12 md:w-6/12 lg:w-4/12 items-center flex-col">
            <label
                htmlFor="email"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                Email address
            </label>

            <input
                className={`w-full h-10 rounded-md px-3 pr-20 focus:outline-0 border focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                    emailError
                        ? "animate-shake border-error ring-1 ring-error"
                        : "border-slate-300"
                }`}
                type="email"
                placeholder="Enter your email address."
                onFocus={setEmailError}
                onChange={handleChange}
                autoComplete="new-email"
                name="email"
                id="email"
                value={email}
            />

            <InputErrorMessage message={emailError} />
            <label
                htmlFor="createPassword"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                Password
            </label>
            <div className="relative flex w-full">
                <input
                    className={`w-full h-10 rounded-md px-3 pr-20 focus:outline-0 border  focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                        passwordError
                            ? "animate-shake border-error ring-1 ring-error"
                            : "border-slate-300"
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create your password."
                    onFocus={setPasswordError}
                    onChange={handleChange}
                    name="createPassword"
                    id="createPassword"
                    value={createPassword}
                />
                {createPassword.length != 0 && (
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
            <label
                htmlFor="confirmPassword"
                className="w-full py-1 text-sm text-slate-800 mt-3"
            >
                Confirm password
            </label>
            <input
                className={`w-full h-10 rounded-md px-3 pr-20 focus:outline-0 border  focus:border-primary disabled:text-slate-400 focus:ring-1 ${
                    confirmPasswordError
                        ? "animate-shake border-error ring-1 ring-error"
                        : "border-slate-300"
                }`}
                type="password"
                placeholder="Confirm your password."
                onFocus={setConfirmPasswordError}
                onChange={handleChange}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
            />
            <InputErrorMessage message={confirmPasswordError} />
            <div className="flex flex-col-reverse w-full">
                <button
                    className="h-10 w-full mt-3 border border-slate-400 rounded-md text-slate-400 font-semibold"
                    type="button"
                    onClick={back}
                >
                    Back
                </button>
                <button
                    className="h-10 w-full mt-10 bg-primary rounded-md text-white font-semibold"
                    type="submit"
                >
                    Signup
                </button>
            </div>
        </div>
    );
}

export default FormFour;
