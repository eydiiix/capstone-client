import { emailRegex, passwordRegex } from "./regex";

export const handleEmailError = async (error) => {
    if (error.message === "email/is-empty") {
        return "Email address cannot be empty.";
    } else if (error.code === "auth/invalid-email") {
        return "Invalid email format.";
    } else if (error.message === "email/test-failed") {
        return "Invalid email format.";
    } else if (error.code === "auth/email-already-in-use") {
        return "The email address you entered is already in use.";
    } else if (error.code === "auth/user-not-found") {
        return "User not found. ";
    } else if (error.code === "auth/invalid-login-credentials") {
        return "Invalid credentials check your email and password. ";
    } else if (error.code === "auth/network-request-failed") {
        return "Please check your  internet connection and try again.";
    } else if (error.code === "auth/user-disabled") {
        return "Your account has been disabled. Please contact support.";
    } else if (error.code === "auth/too-many-requests") {
        return "Too many attempt. Please try again later.";
    }
    return error.code;
};

export const handlePasswordError = async (error) => {
    let errorObj = {};

    if (error.message === "pass/is-empty") {
        errorObj.passwordError = "Password cannot be empty.";
    } else if (error.code === "auth/wrong-password") {
        errorObj.passwordError = "Incorrect password.";
    } else if (error.code === "auth/missing-password") {
        errorObj.passwordError = "Password cannot be empty.";
    } else if (error.code === "auth/weak-password") {
        errorObj.passwordError = "Password should be at least 6 characters.";
    } else if (error.message === "pass/test-failed") {
        errorObj.passwordError =
            "Password must contain an uppercase letter, one symbol, and one number.";
    } else if (error.message === "confirm-pass/is-empty") {
        errorObj.confirmError = "Confirm password cannot be empty.";
    } else if (error.message === "pass/not-match") {
        errorObj.confirmError = "Confirm password did not match.";
    }

    return errorObj;
};

export const validateEmail = async (email) => {
    if (email === "") {
        throw new Error("email/is-empty");
    } else if (!emailRegex.test(email)) {
        throw new Error("email/test-failed");
    }
};

export const validateSignUpPassword = async (...args) => {
    if (args.length != 2) {
        throw new Error("The validateSignUpPassword() need 2 arguments");
    }
    const [password, confirm] = args;
    if (password.length === 0) {
        throw new Error("pass/is-empty");
    } else if (confirm.length === 0) {
        throw new Error("confirm-pass/is-empty");
    } else if (confirm !== "") {
        if (!passwordRegex.test(password)) {
            throw new Error("pass/test-failed");
        } else if (password !== confirm) {
            throw new Error("pass/not-match");
        }
    }
};

export const handleResetEmailError = async (error, email) => {
    if (email === "") {
        return "Please enter your email address.";
    } else if (error.code === "auth/invalid-email" || !emailRegex.test(email)) {
        return "Invalid email format.";
    } else if (error.code === "auth/user-not-found") {
        return "User not found.";
    } else if (error.code === "auth/too-many-requests") {
        return "Too may requests. Please try again later.";
    } else {
        return error.code || error.message;
    }
};
