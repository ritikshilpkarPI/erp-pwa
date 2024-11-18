import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
export const setUpRecaptcha = (number: string) => {
    console.log({number});
  const captchaOptions = {
    size: "invisible",
    "expired-callback": () => {},
  };
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    captchaOptions
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
};

export const firebaselogOut = () => {
  return signOut(auth);
};
