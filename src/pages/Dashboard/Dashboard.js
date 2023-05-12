/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  collapseClasses,
} from "@mui/material";
import AddDialog from "../../components/AddDialog/AddDialog";
import { useDispatch, useSelector } from "react-redux";
import { getDebtState } from "../../redux/slices/debtStateSlice";
import { getCreditState } from "../../redux/slices/creditState";
import TotalIncomeDarkCard from "../../components/TotalIncomeDarkCard";
import TotalIncomeLightCard from "../../components/TotalIncomeLightCard";
import getDashboardChart from "./Chart";
import DatePicker from "../../components/DatePicker/DatePicker";
import { getChartData } from "../../redux/slices/chartSlice";
import Card from "./Card";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [chartObj, setchartObj] = useState({
    chartCredit: [],
    chartDate: [],
    chartDebt: [],
  });
  const [reportsDateRange, setReportsDateRange] = useState([
    {
      startDate: new Date(moment().subtract(6, "days").format("MM-DD-YYYY")),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const payloadDebt = {
      type: "DEBT",
    };
    const payloadCredit = {
      type: "CREDIT",
    };

    dispatch(getDebtState(payloadDebt));
    dispatch(getCreditState(payloadCredit));
  }, []);

  useEffect(() => {
    const start = moment(reportsDateRange[0].startDate)
      .utcOffset("+05:30")
      .format("YYYY-MM-DD");
    const end = moment(reportsDateRange[0].endDate)
      .utcOffset("+05:30")
      .format("YYYY-MM-DD");
    const payloadChart = {
      start,
      end: moment(end).add(1, "d"),
    };
    dispatch(getChartData(payloadChart));
  }, [reportsDateRange]);

  const { debtState, loading } = useSelector((state) => state.debtState);
  const { creditState, loading: creditLoading } = useSelector(
    (state) => state.creditState
  );
  const { chart, loading: chartLoading } = useSelector((state) => state.chart);

  useEffect(() => {
    const uniqueDates =
      chart.reduce((acc, obj) => {
        if (!acc.includes(obj.date)) {
          acc.push(obj.date);
        }
        return acc;
      }, []) ?? [];

    const creditValue =
      chart.reduce((acc, obj) => {
        let total = [];
        if (obj.types.length) {
          total = obj.types.reduce((prev, curr) => {
            if (curr.type === "CREDIT") prev.push(curr.totalAmount);
            else if (obj.types.length === 1) prev.push(0);
            return prev;
          }, []);
        }
        return [...acc, ...total];
      }, []) ?? [];
    const debtValue =
      chart.reduce((acc, obj) => {
        let total = [];
        if (obj.types.length) {
          total = obj.types.reduce((prev, curr) => {
            if (curr.type === "DEBT") prev.push(curr.totalAmount);
            else if (obj.types.length === 1) prev.push(0);
            return prev;
          }, []);
        }
        return [...acc, ...total];
      }, []) ?? [];

    setchartObj({
      chartDate: uniqueDates,
      chartCredit: creditValue,
      chartDebt: debtValue,
    });
  }, [chart]);

  const DashboardChart = getDashboardChart(chartObj.chartDate, {
    credit: chartObj.chartCredit,
    debt: chartObj.chartDebt,
  });

  return (
    <>
      {!loading && !creditLoading && !chartLoading ? (
        <>
          <Card creditState={creditState} debtState={debtState} />
          <Grid container spacing={3} sx={{ mt: 1, mb: 1 }}>
            <Grid item xs={12} lg={9} sm={6}>
              <Paper>
                <Box className="dashboard-chart">
                  <DatePicker
                    setDateRanges={setReportsDateRange}
                    ranges={reportsDateRange}
                  />
                </Box>
                <Chart {...DashboardChart}></Chart>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={3} sm={6}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleClickOpen}
                  >
                    Add Entry
                  </Button>
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeDarkCard debtState={debtState} />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <TotalIncomeLightCard creditState={creditState} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <AddDialog open={open} handleClose={handleClose} />
        </>
      ) : (
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
