import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutation";

const CreateUser = ({ refetch }) => {
  const [createUser] = useMutation(CREATE_USER);
  const [formState, setFormState] = useState({
    username: `username${new Date().getTime()}`,
    password: "password",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: { ...formState },
      });
      refetch();
    } catch (registerError) {
      console.error("Registration failed:", registerError.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleRegister(e);
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateUser;
