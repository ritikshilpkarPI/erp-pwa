import React, { useEffect } from 'react';
import LoginPage from '../components/loginPage/LoginPage';
import { useAppContext } from '../appState/appStateContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { globalState } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
  if (globalState?.isLoggedIn) {
     navigate("/cart")
  }
  // eslint-disable-next-line
  }, [globalState?.isLoggedIn]);

  return (
    <LoginPage/>

  );
};

export default Login;
