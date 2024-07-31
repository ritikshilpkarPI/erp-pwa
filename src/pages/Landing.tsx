import React from 'react'
import LandingPage from '../components/landingPage/LandingPage'
import { useAppContext } from '../appState/appStateContext';
import { useNavigate } from 'react-router-dom';
const Landing = () => {

  const { globalState } = useAppContext();
  const { isLoggedIn = false } = globalState;
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/')
  }

  return (
    <LandingPage/>
  )
}

export default Landing