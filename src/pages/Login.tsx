import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>ERP PWA APP</h1>
      <p onClick={() => navigate('/login')}>Login</p>
      <p onClick={() => navigate('/about')}>About</p>
      <p onClick={() => navigate('/contact')}>Contact</p>

    </>
  );
};

export default Login;
