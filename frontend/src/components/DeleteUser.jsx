import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../utils/mutation'; // Replace with your actual logout mutation

const Logout = () => {
  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (logoutError) {
      console.error('Logout failed:', logoutError.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;