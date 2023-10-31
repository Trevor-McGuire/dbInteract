import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Alert from "@mui/material/Alert";
import "../style/login.sass";

export default function BasicStack() {
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const [validEmail, setValidEmail] = React.useState(true);
  const [validPassword, setValidPassword] = React.useState(true);
  const [validCredentials, setValidCredentials] = React.useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value.trim(),
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleEmailValidation();
    handlePasswordValidation();
    if (!validEmail) return;
    if (!validPassword) return;
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      setValidCredentials(false);
    }
    setFormState({
      email: "",
      password: "",
    });
  };

  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(formState.email));
  };

  const handlePasswordValidation = () => {
    setValidPassword(formState.password !== "");
  };

  return (
    <Box
      id="login-page"
      sx={{
        maxWidth: "500px",
        marginX: "auto",
        padding: "2rem",
        filter: loading ? "blur(5px)" : "",
      }}
    >
      <h4>Log In</h4>
      <form onSubmit={handleFormSubmit} noValidate>
        <Stack>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={formState.email}
            onChange={(e) => {
              handleChange(e);
              setValidEmail(true);
              setValidCredentials(true);
            }}
            onBlur={handleEmailValidation}
            error={!validEmail}
            helperText={!validEmail ? "Invalid email address" : ""}
            sx={{
              paddingBottom: validEmail ? "2rem" : "1rem",
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formState.password}
            onChange={(e) => {
              handleChange(e);
              setValidPassword(true);
              setValidCredentials(true);
            }}
            onBlur={handlePasswordValidation}
            error={!validPassword}
            helperText={!validPassword ? "Password cannot be empty " : ""}
            sx={{
              paddingBottom: validPassword ? "2rem" : "1rem",
            }}
          />
        </Stack>
        <Box id="login-page-buttons">
          <Link>
            <Button
              type="submit"
              variant="contained"
              startIcon={<LoginIcon />}
              size="large"
            >
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button
              sx={{ float: "right" }}
              variant="outlined"
              endIcon={<HowToRegIcon />}
            >
              Register
            </Button>
          </Link>
        </Box>
        <Alert
          variant="outlined"
          severity="error"
          sx={{
            visibility: !validCredentials ? "visible" : "hidden",
            marginTop: "1rem",
          }}
        >
          Email and/or Password is incorrect
        </Alert>
      </form>
    </Box>
  );
}
