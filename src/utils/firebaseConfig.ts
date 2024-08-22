// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const { 
//     REACT_APP_FIREBASE_KEY: apiKey,
//     REACT_APP_FIREBASE_DOMAIN: authDomain,
//     REACT_APP_FIREBASE_PROJECT_ID: projectId,
//     REACT_APP_FIREBASE_STORAGE_BUCKET: storageBucket,
//     REACT_APP_FIREBASE_SENDER_ID: messagingSenderId,
//     REACT_APP_APP_ID: appId,
//     REACT_APP_MEASUREMENT_ID: measurementId
// } = process.env;
//rishabh
// const firebaseConfig = {
//     apiKey: "AIzaSyCcK2GTFdfRO2vAhw-GNgalYwcyf1EuAfw",
//     authDomain: "erp-pwa-ee6ee.firebaseapp.com",
//     projectId: "erp-pwa-ee6ee",
//     storageBucket: "erp-pwa-ee6ee.appspot.com",
//     messagingSenderId: "58882702921",
//     appId: "1:58882702921:web:d473b82d5033d12cef0998",
//     measurementId: "G-5KC3FJD9PY"
// };

const firebaseConfig = {
    apiKey: "AIzaSyANXwBh16BdvVBIxnf5Rf-4ZMMPjRDMNbw",
    authDomain: "erp-next-34a60.firebaseapp.com",
    projectId: "erp-next-34a60",
    storageBucket: "erp-next-34a60.appspot.com",
    messagingSenderId: "534239695870",
    appId: "1:534239695870:web:d7ed8066aeafbf1cba66af",
    measurementId: "G-6ZFHNKTC5M"
  };

console.log({firebaseConfig});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };