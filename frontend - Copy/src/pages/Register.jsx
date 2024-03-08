import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    navigate('/dashboard');
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={(e) =>
              setFormState({ ...formState, username: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
