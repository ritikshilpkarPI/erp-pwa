import { useContext, useState, useRef, useEffect } from "react";
import "./LoginPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import ButtonInput from "../buttonInput/ButtonInput";
import TextInput from "../textInput/TextInput";
import backButtonImage from "../../image/BackButton.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AppStateContext } from "../../appState/appStateContext";
import { setUpRecaptcha } from "../../utils";

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginOption, setLoginOption] = useState();
  const [result, setResult] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppStateContext);
  const navigate = useNavigate();
  const lastRequestTimeRef = useRef(0);
  const [canCall, setCanCall] = useState(true);

  const loginOptions = {
    EMAIL: 'EMAIL',
    PHONE: 'PHONE'
  }

  const loginUserFormFunc = (event) => {
    event.preventDefault();
    logInHandler();
  };

  const handleBackClick = () => {
    Boolean(loginOption)? setLoginOption("") : navigate(-1);
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

  const sendOtpToPhone = async() => {
    try {
      setLoading(true);
      const responseResult = await setUpRecaptcha(`+${emailOrPhone}`);
      setResult(responseResult);
      enqueueSnackbar("OTP sent successfully", { variant:"success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("error while sending otp", { variant: "error" });
    } finally{
      setLoading(false);
    }
  }

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await result.confirm(otp);
      enqueueSnackbar("OTP verified successfully", { variant:"success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("OTP verification failed", { variant:"error" });
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    setEmailOrPhone("");
    setResult("");
    setOtp("");
  },[loginOption])

  return (
    <div className="login-page-container">
      <NavigationHeader
        title="Log In"
        titleClassName="navigation-header-login"
        NavigationHeaderImage={backButtonImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={handleBackClick}
      />

      {
        !Boolean(loginOption) &&  
        <div className="login-options-wrapper">
          <button 
            onClick={()=>setLoginOption(loginOptions.PHONE)} 
            type="button"
            className="login-option-button"
          >
            Log In with Phone Number
          </button>
          <h3>Or</h3>
          <button 
            onClick={()=>setLoginOption(loginOptions.EMAIL)} 
            type="button"
            className="login-option-button"
          >
            Log In with Email & password
          </button>
        </div>
      }

      <div className="login-form-container">
      {loginOption === loginOptions.EMAIL && 
        <>
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
        </>
      }
      {
        loginOption === loginOptions.PHONE && 
        <div className="login-form">
          <TextInput
            className="login-user-id-input"
            type="number"
            labelTitle="Enter Phone number"
            placeholder="phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <ButtonInput
            type="button"
            className="login-submit-button-input"
            title={result ? "Verify OTP" : "Send OTP"}
            isLoading={loading}
            disabled={result ? !Boolean(otp) : !Boolean(emailOrPhone)}
            onClick={result ? verifyOtp : sendOtpToPhone}
          />
          { result &&
            <TextInput
              className="login-user-id-input"
              type="number"
              labelTitle="Enter OTP"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          }
          <div style={{display:"none"}} id="recaptcha-container"></div>
        </div>
      }
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
