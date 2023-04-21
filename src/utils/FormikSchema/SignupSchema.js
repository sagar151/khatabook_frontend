import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(3, "Too Short!").required("Required"),
  lastName: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Please enter valid email").required("Required"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
   confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
   mobileno: Yup.string().required("Please Enter Mobile Number").matches(phoneRegExp, 'Mobile number is not valid')
});