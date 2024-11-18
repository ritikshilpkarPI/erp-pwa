import React, { useEffect } from 'react'
import SignupPage from '../components/signupPage/SignupPage'
import { useAppContext } from '../appState/appStateContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { globalState } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
  if (globalState?.isLoggedIn) {
     navigate("/landing")
  }
  // eslint-disable-next-line
  }, [globalState?.isLoggedIn]);
  return (
   <SignupPage/>
  )
}

export default Signup