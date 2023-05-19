import React from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { SignupSchema } from "../../utils/FormikSchema/SignupSchema";
import { Formik } from "formik";
import { toast } from "react-toastify";
import "./Profile.css"

const Profile = () => {
  return (
    <Paper>
      <Box>
        <Typography variant="h4"> Profile Page </Typography>
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
            console.log("values----------->", values);
            // const payload = {
            //   email: values.email,
            //   password: values.password,
            //   firstname: values.firstName,
            //   lastname: values.lastName,
            //   mobileno: values.mobileno,
            // };
            // const response = await AuthAPI("/signup", {
            //   method: "POST",
            //   data: payload,
            // });
            // if (response.status === true) {
            //   await LocalStorageSet("token", response.token);
            //   toast.success("Sucessfully Sign up", { autoClose: 5000 });
            //   navigate("/dashboard");
            // } else if (response.status === 422) {
            //   const errorMessage =
            //     response.data.message.errors.email ??
            //     "User exists already, please login instead.";
            //   toast.error(errorMessage, { autoClose: 5000 });
            // } else {
            //   toast.error("Something went to wrong,please try again!", {
            //     autoClose: 5000,
            //   });
            // }
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
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={2}
              columns={{ xs: 4, md: 12 }}
              className="main-grid"
            >
              <TextField
                id="firstName"
                name="firstName"
                className="input-profile"
                label="First name"
                value={values.firstName}
                onChange={handleChange}
              />
              <Typography className="error">{errors.firstName}</Typography>
              <TextField
                id="lastName"
                name="lastName"
                className="input-profile"
                label="Last name"
                value={values.lastName}
                onChange={handleChange}
              />
              <Typography className="error">{errors.lastName}</Typography>
              <TextField
                id="email"
                name="email"
                className="input-profile"
                label="Email Address"
                value={values.email}
                onChange={handleChange}
              />
              <Typography className="error">{errors.email}</Typography>
              <TextField
                id="mobileno"
                name="mobileno"
                className="input-profile"
                label="Mobile number"
                value={values.mobileno}
                onChange={handleChange}
              />
              <Typography className="error">{errors.mobileno}</Typography>
              <TextField
                id="password"
                name="password"
                className="input-profile"
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
                className="input-profile"
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
            </Grid>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default Profile;
