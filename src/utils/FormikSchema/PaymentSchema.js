/* eslint-disable */
import * as Yup from "yup";

export const PaymentSchema = Yup.object().shape({
  totalAmount: Yup.number(),
  paidAmount: Yup.number()
    .min(0, `Minimum tip is $0`)
    .test({
      name: 'max',
      exclusive: false,
      params: { },
      message: 'Paid amount must be less than or equal of the Total amount',
      test: function (value) {
          return value <= parseFloat(this.parent.totalAmount)
      },
    }),
});
