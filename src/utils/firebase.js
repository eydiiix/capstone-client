import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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
