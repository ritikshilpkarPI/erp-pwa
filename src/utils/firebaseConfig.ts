import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const { 
    REACT_APP_FIREBASE_KEY,
    REACT_APP_FIREBASE_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_SENDER_ID,
    REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_KEY,
    authDomain: REACT_APP_FIREBASE_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };