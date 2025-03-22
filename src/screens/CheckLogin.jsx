import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn } from '../utils/AuthHandler';

const CheckLogin = ({ children }) => {
  return isUserLoggedIn() ? children : <Navigate to="/login" />;
};

export default CheckLogin;
