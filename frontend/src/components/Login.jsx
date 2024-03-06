import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutation'; // Replace with your actual login mutation

const Login = () => {
  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async (username, password) => {
    try {
      await loginUser({
        variables: { username, password },
      });
    } catch (loginError) {
      console.error('Login failed:', loginError.message);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Login;