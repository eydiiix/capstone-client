import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getAge } from "./getAge";

export const userCollection = collection(db, "Users");

export const writeUserData = async (uid, user) => {
    try {
        const birthday = user.birthday.startDate;
        const age = await getAge(birthday);
        const userData = {
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            age: age,
            birthday: birthday,
            isVolunteer: user.isVolunteer,
            email: user.email,
            interest: user.interests,
        };

        await setDoc(doc(userCollection, uid), userData);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getUserData = async (uid) => {
    try {
        const userData = await getDoc(doc(userCollection, uid));

        if (userData.exists()) {
            const user = userData.data();
            return user;
        } else {
            return;
        }
    } catch (error) {
        console.error("Error fetching user data:", error.message);
    }
    return;
};


export const updateUserData = async (uid, user) => {
    try {
        const userData = {
            userId: user.userId,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            age: user.age,
            birthday: user.birthday,
            isVolunteer: user.isVolunteer,
            email: user.email,
            bio: user?.bio,
            interest: user.interest,
        };

        await updateDoc(doc(userCollection, uid), userData);
        console.log(userData);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteUserData = async (uid) => {
    try {
        await deleteDoc(doc(userCollection, uid))
    } catch (error) {
        console.log(error);
    }
}