import "./ChangePassword.css"
import backbtnsvg from "../../image/BackButton.svg"
import NavigationHeader from '../navigationHeader/NavigationHeader'
import TextInput from "../textInput/TextInput"
import { useState } from "react"
import ButtonInput from "../buttonInput/ButtonInput"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate()

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      setValidationMessage('Passwords do not match');
      return false;
    }
    if (newPassword.length < 6) {
      setValidationMessage('Password must be at least 6 characters long');
      return false;
    }
    setValidationMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Handle password change logic here
      navigate("/cart")
      console.log('Password changed successfully');
    }
  };

  const backFunc = () =>{
    navigate(-1)
    
  }

  const disabled = !newPassword || !confirmPassword;

  return (
    <div className='change-password'>
      <NavigationHeader
        title="Change Password"
        titleClassName="navigation-header-change-password"
        NavigationHeaderImage={backbtnsvg}
        NavigationHeaderImageClassName="back-button-image-full"
        onClick={backFunc}
      />
      <div className="change-password-form-container">
        <form className="change-password-form" onSubmit={handleSubmit}>
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
            className={`change-password-submit-button ${disabled ? "button-disabled" : ""}`}
            title="Submit"
            disable={disabled}
          />
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
