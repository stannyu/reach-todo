import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/home');

  return (
    <div>
      <button>Login</button>
      <button onClick={handleClick}>Log Out</button>
    </div>
  );
};

export { LoginComponent };
