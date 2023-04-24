import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox, TextField, Typography } from "@mui/material";
import GoogleLogin from "../../components/GoogleLogin";
import { toast } from "react-toastify";
import { AuthAPI } from "../../api/AuthAPI";
import { Formik } from "formik";
import { LoginSchema } from "../../utils/FormikSchema/LoginSchema ";
import "./Login.css";
import { LocalStorageSet } from "../../utils/localstorage";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ForgotPWDSchema } from "../../utils/FormikSchema/ForgotPWDSchema ";

const Login = () => {
  const navigate = useNavigate();

  const [forgotPwd, setforgotPwd] = useState(false);
  return (
    <Box className="main">
      {!forgotPwd ? (
        <>
          <Box className="title">
            <Typography
              sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
              variant="h3"
            >
              Hello Guest
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", color: "rgb(148, 144, 144)" }}
            >
              Welcome to Mate Family.Please Login with your personal account
              information letter.
            </Typography>
          </Box>
          <Box className="btn-container">
            <GoogleLogin text="Sign in with Google" />
            <Box className="box-main">
              <Typography className="box-content">OR</Typography>
            </Box>
          </Box>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const payload = {
                  email: values.email,
                  password: values.password,
                };
                const response = await AuthAPI("/signin", {
                  method: "POST",
                  data: payload,
                });
                if (response.success === true) {
                  await LocalStorageSet("token", response.token);
                  toast.success("Sucessfully Sign in", { autoClose: 5000 });
                  navigate("/dashboard");
                } else if (response.status === 500) {
                  const errorMessage = response.data.includes("email");
                  toast.warn(
                    `Login Failed, Please check your ${
                      errorMessage ? "email" : "password"
                    }.`,
                    { autoClose: 5000 }
                  );
                } else {
                  toast.error("Something went to wrong,please try again!", {
                    autoClose: 5000,
                  });
                }
              } catch (error) {
                toast.error("Something went to wrong,please try again!", {
                  autoClose: 5000,
                });
                console.log(error);
              }
            }}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box className="login-form">
                  <TextField
                    id="email"
                    name="email"
                    className="input"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <Typography className="error">{errors.email}</Typography>
                  <TextField
                    id="password"
                    name="password"
                    className="input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Typography className="error">{errors.password}</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "340px",
                      mb: 5,
                    }}
                  >
                    <Checkbox
                      defaultChecked
                      size="small"
                      sx={{ color: "rgb(148, 144, 144)" }}
                    />
                    <Typography sx={{ color: "rgb(148, 144, 144)" }}>
                      Remember me.
                    </Typography>
                  </Box>
                  <Box className="action-btn">
                    <Button variant="contained" type="submit">
                      Sign in
                    </Button>
                    <Button variant="text" onClick={() => setforgotPwd(true)}>
                      Forgot Password
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <Box className="title-pwd">
            <Typography
              sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
              variant="h4"
            >
              Forgot Password
            </Typography>
          </Box>
          <Box className="login-form-pwd">
            <Formik
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={ForgotPWDSchema}
              onSubmit={async (values) => {
                try {
                  const payload = {
                    email: values.email,
                    password: values.password,
                  };
                  const response = await AuthAPI("/forgot-password", {
                    method: "PUT",
                    data: payload,
                  });
                  console.log("response is here----------------->", response);
                  if (response.success === true) {
                    toast.success(response.message ?? "Password update", {
                      autoClose: 5000,
                    });
                    setforgotPwd(false);
                  } else if (response.status === 500) {
                    toast.warn(response.data.message, { autoClose: 5000 });
                  } else {
                    toast.error("Something went to wrong,please try again!", {
                      autoClose: 5000,
                    });
                  }
                } catch (error) {
                  toast.error("Something went to wrong,please try again!", {
                    autoClose: 5000,
                  });
                  console.log(error);
                }
              }}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="email"
                    name="email"
                    className="input"
                    label="Email Address"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <Typography className="error">{errors.email}</Typography>
                  <TextField
                    id="password"
                    name="password"
                    className="input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Typography className="error">{errors.password}</Typography>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    className="input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <Typography className="error">
                    {errors.confirmPassword}
                  </Typography>
                  <Box className="action-btn" sx={{ mt: 3 }}>
                    <Button variant="contained" type="submit">
                      Confirm
                    </Button>
                    <Button variant="text" onClick={() => setforgotPwd(false)}>
                      Cancel
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Login;
