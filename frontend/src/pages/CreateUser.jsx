import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { READ_SESSION } from '../utils/query';
import { DELETE_SESSION, CREATE_USER } from '../utils/mutation';

const CreateUser = () => {
  const { loading, error, data, refetch } = useQuery(READ_SESSION);
  const [deleteSession] = useMutation(DELETE_SESSION);
  const [createUser] = useMutation(CREATE_USER);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleLogin = async (username, password) => {
    const timestamp = new Date().getTime();
    username = `${username}${timestamp}`;
    password = `password` 
    try {
      await createUser({
        variables: { username, password },
      });
      await refetch();

    } catch (loginError) {
      console.error('Login failed:', loginError.message);
    }
  };

  const handleLogout = async () => {
    try {
      // Call the deleteSession mutation to log out
      await deleteSession();
      await refetch();

    } catch (logoutError) {
      console.error('Logout failed:', logoutError.message);
    }
  };

  return (
    <div>
      {data.readSession !== "No session found" ? (
        // If the user is logged in, show a logout button
        <button onClick={handleLogout}>Logout</button>
      ) : (
        // If the user is not logged in, show a login form
        <form onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const password = e.target.password.value;
          handleLogin(username, password);
        }}>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default CreateUser;
