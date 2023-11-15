import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, deleteUser, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getFirebaseConfig } from './firebase-config';
import { getAnalytics } from "firebase/analytics";

const app = initializeApp(getFirebaseConfig());

getAnalytics(app)

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const rdb = getDatabase(app); 

export const signInWithGoogle = async () => {

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
  
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential);
      console.log(result);
  
      return email;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteUserAccount = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
        console.log('User account deleted successfully');
      } else {
        console.error('No user account to delete');
      }
    } catch (error) {
      throw error;
    }
  };
  
