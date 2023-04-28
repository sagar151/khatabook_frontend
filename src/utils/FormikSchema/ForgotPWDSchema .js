/* eslint-disable */
import * as Yup from "yup";

export const ForgotPWDSchema  = Yup.object().shape({
  email: Yup.string().email("Please enter valid email").required("Required"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
   confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});