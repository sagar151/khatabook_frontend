import React from "react";
import { Grid } from "@mui/material";
import HoverDataCard from "../../components/HoverDataCard";
import { useTheme } from "@mui/material/styles";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const Card = ({ creditState, debtState }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverDataCard
          title="Total Debt Amount"
          iconPrimary={CurrencyRupeeIcon}
          primary={debtState.totalAmount}
          secondary={`Total Paid Amount is :- ${debtState.totalPaidAmount}`}
          third={`Total Due amount is :-  ${debtState.totalDueAmount}`}
          color={theme.palette.error.main}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverDataCard
          title="Total Credit Amount"
          iconPrimary={CurrencyRupeeIcon}
          primary={creditState.totalAmount}
          secondary={`Total Paid Amount is :- ${creditState.totalPaidAmount}`}
          third={`Total Due amount is :-  ${creditState.totalDueAmount}`}
          color={theme.palette.success.dark}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverDataCard
          title="Total Debt Interest Amount"
          iconPrimary={CurrencyRupeeIcon}
          primary={debtState.totalInterestAmount}
          secondary={`Total Average Interest Amount is :- ${debtState.averageInterestAmount}`}
          third={`Total Average Interest Rate is :- ${debtState.averageInterestRate}`}
          color={theme.palette.error.main}
        />
      </Grid>
      <Grid item xs={12} lg={3} sm={6}>
        <HoverDataCard
          title="Total Credit Interest Amount"
          iconPrimary={CurrencyRupeeIcon}
          primary={creditState.totalInterestAmount}
          secondary={`Total Average Interest Amount is :- ${creditState.averageInterestAmount}`}
          third={`Total Average Interest Rate is :- ${creditState.averageInterestRate}`}
          color={theme.palette.success.dark}
        />
      </Grid>
    </Grid>
  );
};

export default Card;
