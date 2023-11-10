import React, { useState } from "react";
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

export default function BasicStack() {
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validCredentials, setValidCredentials] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value.trim() });
    setValidEmail(true);
    setValidPassword(true);
    setValidCredentials(true);
  };

  const handleValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(formState.email));
    setValidPassword(formState.password !== "");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleValidation();
    if (!validEmail || !validPassword) return;

    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (e) {
      setValidCredentials(false);
    }

    setFormState({ email: "", password: "" });
  };

  return (
    <Box
      id="login-page"
      sx={{
        maxWidth: "500px",
        marginX: "auto",
        padding: "2rem",
        filter: loading ? "blur(5px)" : "",
        "& form": {
          "& p": {
            height: "1rem",
            margin: 0,
            padding: 0,
            borderSize: 0,
          },
        },
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
            onChange={handleChange}
            onBlur={handleValidation}
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
            onChange={handleChange}
            onBlur={handleValidation}
            error={!validPassword}
            helperText={!validPassword ? "Password cannot be empty" : ""}
            sx={{
              paddingBottom: validPassword ? "2rem" : "1rem",
            }}
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            gap: "1rem",
            "& a, button": {
              flexGrow: 1,
              "& button": {
                width: "100%",
              },
            },
          }}
        >
          <Button
            type="submit"
            variant="contained"
            startIcon={<LoginIcon />}
            size="large"
            onClick={handleFormSubmit}
          >
            Log In
          </Button>
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
