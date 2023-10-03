import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../style/Register.sass';

const randInt = Math.floor(Math.random() * 1000);
const Register = () => {
  const [formState, setFormState] = useState({
    username: `user${randInt}`,
    email: `user${randInt}@test.com`,
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
    billingAddress: '123 Test St',
    shippingAddress: '321 Test Dr',
  });
  const [registerUser, { error, data }] = useMutation(REGISTER_USER);




  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await registerUser({
        variables: { ...formState },
      });
      console.log('data', data)

      Auth.login(data.registerUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
<div id='register-component'>
      <form
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
        <input
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <input
          placeholder="Your first name"
          name="firstName"
          type="text"
          value={formState.firstName}
          onChange={handleChange}
        />
        <input
          placeholder="Your last name"
          name="lastName"
          type="text"
          value={formState.lastName}
          onChange={handleChange}
        />
        <input
          placeholder="Your billing address"
          name="billingAddress"
          type="text"
          value={formState.billingAddress}
          onChange={handleChange}
        />
        <input
          placeholder="Your shipping address"
          name="shippingAddress"
          type="text"
          value={formState.shippingAddress}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
</div>
  );
  
}

export default Register

