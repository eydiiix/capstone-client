import {
    EmailAuthProvider,
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const userStateListener = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const signUpUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const resetUserPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
};

export const reauthenticateUser = async (user, email, password) => {
    const credentials = EmailAuthProvider.credential(email, password );
    return await reauthenticateWithCredential(user, credentials);
}

export const updateUserPassword = async (user, newPassword) => {
    return await updatePassword(user, newPassword)
}

export const deleteUserAccount = async (user) => {
    return await deleteUser(user)
}