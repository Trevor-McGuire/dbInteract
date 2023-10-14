import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../utils/mutations";
import Alert from "@mui/material/Alert";
import "../style/register.sass";
import CreateIcon from "@mui/icons-material/Create";

export default function BasicStack() {
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const [formState, setFormState] = React.useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const autoFill = () => {
    const randInt = (mag) => Math.floor(Math.random() * mag);
    const userNumber = randInt(999999);
    const firstNames = [
      'James',
      'Jessica',
      'John',
      'Jennifer',
      'Jack',
      'Julia',
      'Jonathan',
      'Jasmine',
      'Joseph',
      'Jocelyn',
      'Jackson',
      'Jenna',
      'Jake',
      'Jade',
      'Jordan',
    ]
    const lastNames = [
      'Smith',
      'Stewart',
      'Sanders',
      'Sullivan',
      'Simpson',
      'Stevens',
      'Snyder',
      'Shaw',
      'Schmidt',
      'Sharp',
      'Singleton',
      'Silva',
      'Saunders',
      'Stephens',
      'Scott',
    ];
    const addresses = [
      '123 Main St, Monroe, WI 53566',
      '456 Oak St, Springfield, IL 62701',
      '789 Elm St, Portland, OR 97201',
      '101 Pine St, Austin, TX 78701',
      '202 Cedar St, Denver, CO 80202',
      '303 Maple St, Seattle, WA 98101',
      '404 Birch St, Phoenix, AZ 85001',
      '505 Spruce St, Nashville, TN 37201',
      '606 Redwood St, Boston, MA 02101',
      '707 Walnut St, Atlanta, GA 30301',
      '808 Cypress St, Chicago, IL 60601',
      '909 Magnolia St, San Francisco, CA 94101',
      '111 Oakwood St, Miami, FL 33101',
      '222 Pinecrest St, New York, NY 10001',
      '333 Birchwood St, Los Angeles, CA 90001',
    ];
    const userAdress = addresses[Math.floor(Math.random() * addresses.length)];
    setFormState({
      username: `user${userNumber}`,
      email: `user${userNumber}@test.com`,
      password: "password123",
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      billingAddress: userAdress,
      shippingAddress: userAdress,
    });
  };

  const [formValidation, setFormValidation] = React.useState({
    username: true,
    email: true,
    password: true,
    firstName: true,
    lastName: true,
    billingAddress: true,
    shippingAddress: true,
  });

  const [cridentials, setCridentials] = React.useState(true);

  const handleFormStateChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value.trim(),
    });
  };

  const handleFormValidationChange = (name, e) => {
    const { value } = e.target;
    let pass = true;
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        pass = emailRegex.test(value);
        console.log(name, value, "email", pass);
        break;
      default:
        console.log(name, value, "default", pass);
        pass = value.length > 0;
        break;
    }
    setFormValidation({
      ...formValidation,
      [name]: pass,
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
      document.getElementsByName("email")[0].focus();
    }
    setFormState({
      email: "",
      password: "",
    });
  };
  const handleFormSubmitnew = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({
        variables: { input: { ...formState } },
      });
      console.log("data", data);

      Auth.login(data.registerUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const inputValues = [
    { Proper: "Username", lowercase: "username" },
    { Proper: "Email", lowercase: "email" },
    { Proper: "Password", lowercase: "password" },
    { Proper: "First Name", lowercase: "firstName" },
    { Proper: "Last Name", lowercase: "lastName" },
    { Proper: "Billing Address", lowercase: "billingAddress" },
    { Proper: "Shipping Address", lowercase: "shippingAddress" },
  ];
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
      <h4>Log In</h4>
      <form onSubmit={handleFormSubmit} noValidate>
        <Stack>
          {inputValues.map((i, index) => (
            <TextField
              key={i.lowercase}
              label={i.Proper}
              variant={index < 3 ? "outlined" : "filled"}
              name={i.lowercase}
              type={i.lowercase}
              value={formState[i.lowercase]}
              autoFocus={index === 0}
              onChange={(e) => {
                handleFormStateChange(e);
                setFormValidation({
                  ...formValidation,
                  [i.lowercase]: true,
                });
                setCridentials(true);
              }}
              onBlur={(e) => handleFormValidationChange(i.lowercase, e)}
              error={!formValidation[i.lowercase]}
              helperText={
                !formValidation[i.lowercase] ? `Invalid ${i.lowercase}` : ""
              }
              sx={{
                paddingBottom: formValidation[i.lowercase] ? "2rem" : "1rem",
              }}
            />
          ))}
        </Stack>
        <Box id='register-page-buttons'>
          <Button type="submit" variant="outlined" startIcon={<HowToRegIcon />}>
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
          <Link to="/login">
            <Button
              sx={{ float: "right" }}
              variant="contained"
              endIcon={<LoginIcon />}
            >
              Log In
            </Button>
          </Link>
        </Box>
        <Alert
          variant="outlined"
          severity="error"
          sx={{
            visibility: !formValidation.cridentials ? "visible" : "hidden",
            marginTop: "1rem",
          }}
        >
          Email and/or Password is incorrect
        </Alert>
      </form>
    </Box>
  );
}

// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { REGISTER_USER } from "../utils/mutations";
// import Auth from "../utils/auth";
// import "../style/Register.sass";

// const randInt = Math.floor(Math.random() * 1000);
// const Register = () => {
//   const [formState, setFormState] = useState({
//     username: `user${randInt}`,
//     email: `user${randInt}@test.com`,
//     password: "password",
//     firstName: "Test",
//     lastName: "User",
//     billingAddress: "123 Test St",
//     shippingAddress: "321 Test Dr",
//   });

//   const [registerUser, { loading }] = useMutation(REGISTER_USER);
//   if (loading) {
//     return <h2>LOADING...</h2>;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await registerUser({
//         variables: { input: { ...formState } },
//       });
//       console.log("data", data);

//       Auth.login(data.registerUser.token);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div id="register-component">
//       <form onSubmit={handleFormSubmit}>
//         <input
//           placeholder="Your username"
//           name="username"
//           type="text"
//           value={formState.username}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="Your email"
//           name="email"
//           type="email"
//           value={formState.email}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="******"
//           name="password"
//           type="password"
//           value={formState.password}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="Your first name"
//           name="firstName"
//           type="text"
//           value={formState.firstName}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="Your last name"
//           name="lastName"
//           type="text"
//           value={formState.lastName}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="Your billing address"
//           name="billingAddress"
//           type="text"
//           value={formState.billingAddress}
//           onChange={handleChange}
//         />
//         <input
//           placeholder="Your shipping address"
//           name="shippingAddress"
//           type="text"
//           value={formState.shippingAddress}
//           onChange={handleChange}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
