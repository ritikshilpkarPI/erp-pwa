import { useState } from "react";
import "./LoginPage.css";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import ButtonInput from "../buttonInput/ButtonInput";
import TextInput from "../textInput/TextInput";
import backButtonImage from "../../image/BackButton.svg";

import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const LoginPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const htmlErrow = ">";

  const navigate = useNavigate();

  const loginUserFormFunc = (event) => {
    event.preventDefault();
  };

  const backFunc = () => {
    navigate(-1);
  };
  const logInHandler = async () => {
    try {
    
      if (!emailOrPhone || !password) {
        enqueueSnackbar("Please fill all the fields", { variant: "error" });
        return;
      }

      setLoading(true);

      const responst = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailOrPhone,
            password: password,
          }),
        }
      );

      const result = await responst.json();

      setLoading(false);


      if (result?.error) {
        enqueueSnackbar(result.error?.message, { variant: "error" });
      }

      if (result.token) {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  return (
    <div className="login-page-container">
      <NavigationHeader
        title="Log in"
        titleClassName="navigation-header-login"
        NavigationHeaderImage={backButtonImage}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={backFunc}
      />

      <div className="login-form-container">
        <form className="login-form" onSubmit={loginUserFormFunc} action="">
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
            title="Submit"
            onClick={() => {
              logInHandler();
            }}
            isLoading={loading}
          />
        </form>
        <div className="login-page-information-container">
          <p className="login-page-information">
            <span>
              Use the cash register code that can be created by the owner in
            </span>
            <span>Manage Store -{htmlErrow} Cashier Code</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
