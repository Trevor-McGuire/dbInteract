import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutation';

const Register = () => {
  const [createUser] = useMutation(CREATE_USER);

  const handleRegister = async (username, password) => {
    const timestamp = new Date().getTime();
    username = `${username}${timestamp}`;
    password = `password` 
    try {
      await createUser({
        variables: { username, password },
      });
    } catch (registerError) {
      console.error('Registration failed:', registerError.message);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        handleRegister(username, password);
      }}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;