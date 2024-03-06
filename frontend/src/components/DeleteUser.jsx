import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_SESSION } from '../utils/mutation'; // Replace with your actual logout mutation

const DeleteUser = ({ refetch }) => {
  const [logoutUser] = useMutation(DELETE_SESSION);

  const handleLogout = async () => {
    try {
      await logoutUser();
      refetch();
    } catch (logoutError) {
      console.error('Logout failed:', logoutError.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Delete Account</button>
    </div>
  );
};

export default DeleteUser;