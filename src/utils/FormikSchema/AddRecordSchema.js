import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const AddRecordSchema = Yup.object().shape({
  debtorName: Yup.string().min(3, "Too Short!").required("Required"),
  creditorName: Yup.string().min(3, "Too Short!").required("Required"),
  debtorNumber: Yup.string()
    .required("Please Enter Mobile Number")
    .matches(phoneRegExp, "Mobile number is not valid"),
  paymentMode: Yup.object().required("Year value is required."),
  paybackDate: Yup.string().required("Payback Date is required"),
  payDate: Yup.string().required("Pay Date is required"),
  principalAmount: Yup.number().required("Pay Date is required"),
  interestRate: Yup.number().max(100, "Rate should not be more than 100."),
});
