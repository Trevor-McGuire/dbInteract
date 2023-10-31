import React, { useState, useEffect } from "react";
import { Box, Stack, TextField, Button, FormControlLabel, Alert, Switch, Divider } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CreateIcon from "@mui/icons-material/Create";


import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../utils/mutations";

import "../style/register.sass";


import registerLists from "../utils/lists";
import Auth from "../utils/auth";

const { inputValues, firstNames, lastNames, addresses } = registerLists;

export default function BasicStack() {
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  // holds the state of the form inputs
  const [formState, setFormState] = useState(
    Object.fromEntries(inputValues.map((i) => [i.lowercase, ""]))
  );
  // holds the validation state of the form inputs
  const [formValidation, setFormValidation] = useState({
    ...Object.fromEntries(inputValues.map((i) => [i.lowercase, true])),
  });
  // controls visibility of alert
  const [cridentials, setCridentials] = useState(true);
  // value of the same address switch
  const [sameAddress, setSameAddress] = useState(true);

  const autoFill = () => {
    const randInt = (max) => Math.floor(Math.random() * max);
    const userNumber = randInt(999999);
    const userAddress = addresses[Math.floor(Math.random() * addresses.length)];
    setFormState({
      username: `user${userNumber}`,
      email: `user${userNumber}@test.com`,
      password: "password123",
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      billingAddress: userAddress,
      shippingAddress: userAddress,
    });
    if (!sameAddress) setSameAddress(true);
    setFormValidation({
      ...Object.fromEntries(
        Object.keys(formValidation).map((key) => [key, true])
      ),
    });
  };

  const textFieldConfig = ({ lowercase, proper }, sameAddress, index) => {
    const commonProps = {
      name: lowercase,
      type: lowercase,
      value: formState[lowercase],
      onChange: (e) => {
        handleFormStateChange(e);
        setFormValidation({
          ...formValidation,
          [lowercase]: true,
        });
        setCridentials(true);
      },
      onBlur: (e) => handleFormValidationChange(lowercase, e.target.value),
      error: !formValidation[lowercase],
      helperText: !formValidation[lowercase] ? `Invalid ${proper}` : "",
      sx: {
        paddingBottom: formValidation[lowercase] ? "2rem" : "1rem",
        width: "100%",
      },
    };

    if (lowercase === "shippingAddress") {
      return {
        ...commonProps,
        label: proper,
        variant: sameAddress ? "filled" : "outlined",
        disabled: sameAddress,
      };
    }

    return {
      ...commonProps,
      label: proper,
      variant: "outlined",
      disabled: false,
    };
  };

  const handleFormStateChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value.trim(),
      ["shippingAddress"]:
        name === "billingAddress" && sameAddress
          ? value.trim()
          : name === "shippingAddress"
          ? value.trim()
          : formState.shippingAddress,
    });
  };

  const handleFormValidationChange = (name, value, returnVal) => {
    let pass;
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        pass = emailRegex.test(value);
        break;
      default:
        pass = value.length > 0;
        break;
    }
    setFormValidation({
      ...formValidation,
      [name]: pass,
      ["shippingAddress"]:
        name === "billingAddress" && sameAddress
          ? pass
          : name === "shippingAddress"
          ? pass
          : formValidation.shippingAddress,
    });
    if (returnVal) return pass;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedFormValidation = {};
    Object.keys(formState).forEach((key) => {
      updatedFormValidation[key] = handleFormValidationChange(
        key,
        formState[key],
        true
      );
    });
    setFormValidation(updatedFormValidation);
    try {
      const { data } = await registerUser({
        variables: { input: { ...formState } },
      });
      Auth.login(data.registerUser.token);
    } catch (e) {
      setCridentials(false);
    }
    setFormState({
      email: "",
      password: "",
    });
  };

  const handleSameAddress = () => {
    setFormState({
      ...formState,
      shippingAddress: !sameAddress ? formState.billingAddress : "",
    });
    setSameAddress(!sameAddress);
    setFormValidation({
      ...formValidation,
      shippingAddress: true,
    });
  };

  return (
    <Box
      id="register-page"
      sx={{
        maxWidth: "500px",
        marginX: "auto",
        padding: "2rem",
        filter: loading ? "blur(5px)" : "",
      }}
    >
      <h4>Register</h4>
      <form onSubmit={handleFormSubmit} noValidate>
        <Stack>
          {inputValues.map((i, index) => (
            <Box key={i.lowercase}>
              <TextField
                key={i.lowercase}
                {...textFieldConfig(i, sameAddress, index)}
              />
              {index === 2 && (
                <Divider
                  sx={{
                    marginBottom: "2rem",
                  }}
                />
              )}
              {index === 5 && (
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e) => {
                        handleSameAddress();
                      }}
                      checked={sameAddress}
                    />
                  }
                  label="Same as Billing Address"
                />
              )}
            </Box>
          ))}
        </Stack>
        <Box id="register-page-buttons">
          <Button
            type="submit"
            variant="contained"
            startIcon={<HowToRegIcon />}
            size="large"
          >
            Register
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            startIcon={<CreateIcon />}
            onClick={autoFill}
          >
            Auto Fill
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{ float: "right" }}
            variant="outlined"
            endIcon={<LoginIcon />}
          >
            Log In
          </Button>
        </Box>
        <Alert
          variant="outlined"
          severity="error"
          sx={{
            visibility: !cridentials ? "visible" : "hidden",
            marginTop: "1rem",
          }}
        >
          {error && error.message
            ? error.message
            : "Please double check the information you entered."}
        </Alert>
      </form>
    </Box>
  );
}
