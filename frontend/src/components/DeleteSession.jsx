import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_SESSION } from '../utils/mutation';
import client from '../apollo';

const DeleteSession = ({ refetch }) => {
  const [logoutUser] = useMutation(DELETE_SESSION);

  const handleLogout = async () => {
    try {
      // must logout and refect before clearing the store 
      // to avoid clearing the cache before the refetch/logout is complete
      await logoutUser();
      await refetch();
      client.clearStore();
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

export default DeleteSession;
