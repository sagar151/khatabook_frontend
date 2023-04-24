import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleLogin from "../../components/GoogleLogin";
import "./Register.css";
import { Formik } from "formik";
import { SignupSchema } from "../../utils/FormikSchema/SignupSchema";
import { AuthAPI } from "../../api/AuthAPI";
import { LocalStorageSet } from "../../utils/localstorage";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  return (
    <Box className="main">
      <Box className="title-register">
        <Typography
          sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          variant="h4"
        >
          Create your account
        </Typography>
      </Box>
      <Box className="btn-container">
        <GoogleLogin text="Sign up with Google" />
        <Box className="box-main">
          <Typography className="box-content">OR</Typography>
        </Box>
      </Box>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobileno: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const payload = {
              email: values.email,
              password: values.password,
              firstname: values.firstName,
              lastname: values.lastName,
              mobileno: values.mobileno,
            };
            const response = await AuthAPI("/signup", {
              method: "POST",
              data: payload,
            });
            if (response.status === true) {
              await LocalStorageSet("token", response.token);
              toast.success("Sucessfully Sign up", { autoClose: 5000 });
              navigate("/dashboard");
            } else if (response.status === 422) {
              const errorMessage =
                response.data.message.errors.email ??
                "User exists already, please login instead.";
              toast.error(errorMessage, { autoClose: 5000 });
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
                id="firstName"
                name="firstName"
                className="input"
                label="First name"
                value={values.firstName}
                onChange={handleChange}
              />
              <Typography className="error">{errors.firstName}</Typography>
              <TextField
                id="lastName"
                name="lastName"
                className="input"
                label="Last name"
                value={values.lastName}
                onChange={handleChange}
              />
              <Typography className="error">{errors.lastName}</Typography>
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
                id="mobileno"
                name="mobileno"
                className="input"
                label="Mobile number"
                value={values.mobileno}
                onChange={handleChange}
              />
              <Typography className="error">{errors.mobileno}</Typography>
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
              <Box className="action-btn-register">
                <Button type="submit" variant="contained">
                  Sign up
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
