import React, { useEffect } from 'react'
import SplashScreen from '../components/splashScreen/Splashscreen'
import { useAppContext } from '../appState/appStateContext';
import { useNavigate } from 'react-router-dom';

const Splash = () => {

  const { globalState } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
  if (globalState?.isLoggedIn) {
     navigate("/landing")
  }
  // eslint-disable-next-line
  }, [globalState?.isLoggedIn]);
  return (
    <SplashScreen/>
  )
}

export default Splash