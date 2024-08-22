import { useContext, useState, useRef } from "react";
import "./LoginPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import ButtonInput from "../buttonInput/ButtonInput";
import TextInput from "../textInput/TextInput";
import backButtonImage from "../../image/BackButton.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AppStateContext } from "../../appState/appStateContext";

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppStateContext);
  const navigate = useNavigate();
  const lastRequestTimeRef = useRef(0);
  const [canCall, setCanCall] = useState(true);

  const loginUserFormFunc = (event) => {
    event.preventDefault();
    logInHandler();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const logInHandle = async () => {
    try {
      const emailOrPhoneTrimmed = emailOrPhone.trim();

      if (!emailOrPhoneTrimmed || !password) {
        enqueueSnackbar("Please fill all the fields", { variant: "error" });
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrPhoneTrimmed,
            password: password,
          }),
        }
      );

      const result = await response.json();

      setLoading(false);

      if (result?.error) {
        enqueueSnackbar(result.error?.message, { variant: "error" });
      }

      if (result.token) {
        dispatch({ type: "SET_USER", payload: result.user });
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", result.token);
        }
        navigate("/landing");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const logInHandler = () => {
    const currentTime = Date.now();
    if (!canCall && currentTime - lastRequestTimeRef.current < 5000) {
      return;
    }

    if (canCall || currentTime - lastRequestTimeRef.current >= 5000) {
      logInHandle();
      lastRequestTimeRef.current = currentTime;
      setCanCall(false);
      setTimeout(() => setCanCall(true), 5000);
    }
  };

  return (
    <div className="login-page-container">
      <NavigationHeader
        title="Log In"
        titleClassName="navigation-header-login"
        NavigationHeaderImage={backButtonImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={handleBackClick}
      />

      <div className="login-form-container">
        <form className="login-form" onSubmit={loginUserFormFunc}>
          <TextInput
            className="login-user-id-input"
            type="text"
            labelTitle="Email"
            placeholder="Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />

          <TextInput
            className="login-user-password-input"
            type="password"
            labelTitle="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonInput
            type="submit"
            className="login-submit-button-input"
            title="Log In"
            isLoading={loading}
          />
        </form>
        <Link to="/forgotpassword" className="forgot-password">
          Forgot Password?
        </Link>
        <div>
          <span>Don't have an account? </span>
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>

        <div className="privacy-policy-container">
          <span>By logging in, you agree to our </span>
          <Link to="/policy" className="privacy-policy-link">
            Privacy Policy
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;
