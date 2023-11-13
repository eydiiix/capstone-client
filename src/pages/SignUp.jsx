import { useState } from "react";
import { generateUniqueId } from "@/utils/uid";
import { writeUserData } from "@/utils/firestore";
import FormOne from "@/components/signup/FormOne";
import FormTwo from "@/components/signup/FormTwo";
import FormThree from "@/components/signup/FormThree";
import SignUpLoader from "@/components/loader/SignUpLoader";
import Stepper from "@/components/signup/Stepper";
import { signUpUser } from "@/utils/auth";
import {
    handleEmailError,
    handlePasswordError,
    validateSignUpPassword,
} from "@/utils/validation";
import { delay } from "@/utils/delay";


export const interestList = [
    "Family",
    "School",
    "Lovelife",
    "Kpop",
    "Anime",
    "Pets",
    "Sports",
    "Music",
    "Books",
    "Travel",
    "Foods",
    "Drama",
];

function SignUp() {
    const [step, setStep] = useState(1);

    // Error Hook states
    const [isLoading, setIsLoading] = useState(false);
    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [stepper, setStepper] = useState(1);

    

    const userData = {
        userId: generateUniqueId(),
        firstname: "",
        lastname: "",
        gender: "",
        birthday: "",
        email: "",
        createPassword: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState(userData);

    const {
        firstname,
        lastname,
        gender,
        birthday,
        email,
        createPassword,
        confirmPassword,
    } = formData;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value,
            };
        });
    };

    const handleDateChange = async (newValue) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                birthday: newValue,
            };
        });
    };

    const resetSignUpPage = () => {
        setFormData(userData);
        setStep(1);
    };

    const handleFocus = (errorMessageSetter, e) => {
        errorMessageSetter("");
    };

    const goToStep = (num, next) => {
        const message = "This field cannot be empty";
        if (next && step === 1) {
            if (firstname === "") {
                setFirstnameError(message);
            } else if (/\d/.test(firstname)) {
                setFirstnameError("It should not contain numbers.");
            } else {
                setFirstnameError("");
            }
    
            if (lastname === "") {
                setLastnameError(message);
            } else if (/\d/.test(lastname)) {
                setLastnameError("It should not contain numbers.");
            } else {
                setLastnameError("");
            }
            if (firstname && lastname && !(/\d/.test(firstname) || /\d/.test(lastname))) {
                setStep(num);
                if (stepper <= 2) {
                    setStepper(2);
                }
            }
        } else if (next && step === 2) {
            if (gender === "") {
                setGenderError(message);
            }
            if (birthday === "") {
                setBirthdayError(message);
            } else {
                
                const selectedDate = new Date(birthday);
                const currentDate = new Date();
                const age = currentDate.getFullYear() - selectedDate.getFullYear();
    
                if (
                    age < 12 ||
                    age > 150 ||  // Check if age is greater than 150
                    (age === 12 && currentDate.getMonth() < selectedDate.getMonth()) ||
                    (age === 12 && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())
                ) {
                    setBirthdayError("Your age must be between 12 and 150 years.");
                } else {
                    setBirthdayError("");
                }
            }
    
            if (birthday && gender && !birthdayError) {
                setStep(num);
                if (stepper <= 3) {
                    setStepper(3);
                }
            }
        } else if (!next && step === 3) {
            setStep(num);
        } else {
            setStep(num);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await validateSignUpPassword(createPassword, confirmPassword);
            const userCredential = await signUpUser(email, createPassword);
            const uid = userCredential.user.uid;

            if (uid) {
                const registerUserData = await writeUserData(uid, formData);
                if (registerUserData) {
                    resetSignUpPage();
                }
            }
        } catch (error) {
            const { passwordError, confirmError } = await handlePasswordError(
                error
            );
            const emailError = await handleEmailError(error);
            if (emailError) {
                setEmailError(emailError);
            }
            if (passwordError) {
                setPasswordError(passwordError);
            }
            if (confirmError) {
                setConfirmPasswordError(confirmError);
            }
        }
        delay(1);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center select-none">
            <form
                className=" pb-5 lg:py-16  flex h-full w-full flex-col justify-center items-center overflow-scroll"
                onSubmit={handleSubmit}
            >
                <h1 className="py-3 text-slate-800 font-semibold text-2xl ">
                    Create an account
                </h1>

                <Stepper step={stepper} count={step} />

                {step === 1 && (
                    <FormOne
                        firstname={firstname}
                        firstnameError={firstnameError}
                        lastname={lastname}
                        lastnameError={lastnameError}
                        handleChange={handleChange}
                        setFirstnameError={() => handleFocus(setFirstnameError)}
                        setLastnameError={() => handleFocus(setLastnameError)}
                        next={() => goToStep(2, true)}
                    />
                )}
                {step === 2 && (
                    <FormTwo
                        gender={gender}
                        birthday={birthday}
                        genderError={genderError}
                        birthdayError={birthdayError}
                        setBirthdayError={() => handleFocus(setBirthdayError)}
                        setGenderError={() => handleFocus(setGenderError)}
                        handleChange={handleChange}
                        handleDateChange={handleDateChange}
                        back={() => goToStep(1, false)}
                        next={() => goToStep(3, true)}
                    />
                )}
                {step === 3 && (
                    <FormThree
                        email={email}
                        createPassword={createPassword}
                        confirmPassword={confirmPassword}
                        emailError={emailError}
                        passwordError={passwordError}
                        confirmPasswordError={confirmPasswordError}
                        handleChange={handleChange}
                        setEmailError={() => handleFocus(setEmailError)}
                        setPasswordError={() => handleFocus(setPasswordError)}
                        setConfirmPasswordError={() =>
                            handleFocus(setConfirmPasswordError)
                        }
                        back={() => goToStep(2, false)}
                    />
                )}
            </form>
            {isLoading && <SignUpLoader />}
        </div>
    );
}

export default SignUp;
