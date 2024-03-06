import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SESSION } from "../utils/mutation"; // Replace with your actual login mutation

const CreateSession = ({ refetch }) => {
  const [loginUser, { error }] = useMutation(CREATE_SESSION);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({
        variables: { ...formState },
      });
      refetch();
    } catch (loginError) {
      console.error("Login failed:", loginError.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
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
        <button type="submit">Login</button>
      </form>
      <p>
        {error ? `Error: ${error.message}` : ""}
      </p>
    </div>
  );
};

export default CreateSession;
