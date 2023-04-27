import moment from "moment";
import * as Yup from "yup";

const phoneRegExp =
  /^[6-9]\d{9}$/gi;

export const AddRecordSchema = Yup.object().shape({
  debtorName: Yup.string().min(3, "Too Short!").required("Required"),
  creditorName: Yup.string().min(3, "Too Short!").required("Required"),
  debtorNumber: Yup.string()
    .required("Please Enter Mobile Number")
    .matches(phoneRegExp, "Mobile number is not valid"),
  paymentMode: Yup.string().required("Payment mode is required."),
  type: Yup.string().required("Type is required."),
  payDate: Yup.date()
    .nullable()
    .required("Pay Date is required")
    .typeError("Invalid Date!"),
  paybackDate: Yup.date()
    .nullable()
    .required("Payback Date is required")
    .typeError("Invalid Date!")
    .when("payDate", {
      is: (payDate) => moment(payDate).isValid(),
      then: (payDate) =>
        Yup.date().when("payDate", (payDate, schema) =>
          moment(payDate).isValid() ? schema.min(payDate) : schema.min(payDate)
        ),
    }),
  principalAmount: Yup.number().required("Principal amount is required"),
  isInterest: Yup.boolean(),
  isWhatsapp: Yup.boolean(),
  interestRate: Yup.number().when("isInterest", {
    is: true,
    then: () =>
      Yup.number()
        .required("Interest Rate is required")
        .max(100, "Rate should not be more than 100."),
  }),
  paymentApplication: Yup.object().when("paymentMode", {
    is: (paymentMode) => ["UPI", "NET BANKING"].includes(paymentMode),
    then: () => Yup.object().required("Payment Application is required"),
  }),
});
