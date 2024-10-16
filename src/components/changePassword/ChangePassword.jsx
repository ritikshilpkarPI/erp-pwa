import "./ChangePassword.css";
import backbtnsvg from "../../image/BackButton.svg";
import NavigationHeader from "../navigationHeader/NavigationHeader";
import TextInput from "../textInput/TextInput";
import { useState } from "react";
import ButtonInput from "../buttonInput/ButtonInput";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const { tempToken, email } = location.state;
  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setValidationMessage("Passwords do not match");
      return false;
    }
    if (newPassword.length < 6) {
      setValidationMessage("Password must be at least 6 characters long");
      return false;
    }
    setValidationMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tempToken, newPassword }),
            credentials: "include"
          }
        );

        const data = await response.json();
        if (response.ok && data.message === "Password changed successfully") {
          navigate("/login");
        } else {
          throw new Error(data.message || "Password change failed");
        }
      } catch (error) {
        setValidationMessage(
          error.message || "Error changing password. Please try again."
        );
      }
    }
  };

  const backFunc = () => {
    navigate(-1);
  };

  const disabled = !newPassword || !confirmPassword;

  return (
    <div className="change-password">
      <NavigationHeader
        title="Change Password"
        titleClassName="navigation-header-change-password"
        NavigationHeaderImage={backbtnsvg}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={backFunc}
      />
      <div className="change-password-form-container">
        <form className="change-password-form" onSubmit={handleSubmit}>
          <div className="change-password-email-container">
            Enter your new password for :{" "}
            <span style={{ fontWeight: "600" }}>{email}</span>.
          </div>
          <TextInput
            className="change-password-input"
            type="password"
            labelTitle="New Password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextInput
            className="change-password-input"
            type="password"
            labelTitle="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {validationMessage && (
            <div className="validation-message">{validationMessage}</div>
          )}
          <ButtonInput
            type="submit"
            className={`change-password-submit-button ${
              disabled ? "button-disabled" : ""
            }`}
            title="Submit"
            disable={disabled}
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
