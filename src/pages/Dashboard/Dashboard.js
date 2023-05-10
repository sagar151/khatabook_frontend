/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddDialog from "../../components/AddDialog/AddDialog";
import { useDispatch, useSelector } from "react-redux";
import { getDebtState } from "../../redux/slices/debtStateSlice";
import { getCreditState } from "../../redux/slices/creditState";
import TotalIncomeDarkCard from "../../components/TotalIncomeDarkCard";
import TotalIncomeLightCard from "../../components/TotalIncomeLightCard";
import { getChartData } from "../../redux/slices/chartSlice";
import Chart from "react-apexcharts";
import "./Dashboard.css";
import getDashboardChart from "./Chart";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [chartKeys, setchartKeys] = useState([]);

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
    const payloadChart = {
      start: "2023-05-08",
      end: "2023-05-11",
    };
    dispatch(getDebtState(payloadDebt));
    dispatch(getCreditState(payloadCredit));
    dispatch(getChartData(payloadChart));
  }, []);
  const { debtState, loading } = useSelector((state) => state.debtState);
  const { creditState, loading: creditLoading } = useSelector(
    (state) => state.creditState
  );
  const { chart, loading: chartLoading } = useSelector((state) => state.chart);

  useEffect(() => {
    const totalTypes = chart.reduce((prev, curr) => {
      const isTypes = [];
      curr.type.length && curr.type.map((data) => isTypes.push(data));
      return (prev = isTypes.length ? [...isTypes, ...prev] : []);
    }, []);

    const sortData = totalTypes.sort(function (a, b) {
      return new Date(a._id) - new Date(b._id);
    });
    setchartKeys([...sortData]);
  }, [chart]);

  // console.log("chartKeys,chartLoading,chartKeys,chartKeys", chart, chartKeys);

  const date = chartKeys.length
    ? chart
        .map((data) => data._id)
      .sort(function (a, b) {
          console.log('a---------------------------b',a,b)
          return new Date(a) - new Date(b);
        })
    : [];

  const isCredit = chartKeys.length
    ? chartKeys
        .sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .map((data) => (data.type === "CREDIT" ? data.totalAmount : 0))
    : [];

  const isDebt = chartKeys.length
    ? chartKeys
        .sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .map((data) => (data.type === "DEBT" ? data.totalAmount : 0))
    : [];

  console.log(
    "isCredit===================================>",
    date,
    chart,
    chartKeys
  );
  const DashboardChart = getDashboardChart(date, { isCredit, isDebt });

  return (
    <>
      {!loading && !creditLoading && !chartLoading ? (
        <>
          <Card creditState={creditState} debtState={debtState} />
          <Grid container spacing={3} sx={{ mt: 1, mb: 1 }}>
            <Grid item xs={12} lg={9} sm={6}>
              {/* <Box className="chart-dashboard">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                purus turpis, iaculis dignissim orci nec, maximus laoreet orci.
                Sed bibendum eros ut lectus dignissim, vel ultrices erat
                sagittis. Aliquam ullamcorper varius ex, eget consectetur magna
                volutpat quis. Duis pulvinar nec dolor gravida volutpat. Mauris
                tincidunt sit amet dui imperdiet aliquam. Phasellus consequat
                turpis nec eleifend consectetur. Cras lacinia massa scelerisque
                elit pharetra, et posuere felis dignissim. Pellentesque sed
                consectetur orci. In enim ante, imperdiet a quam eget,
                vestibulum laoreet tellus. Integer at ultrices diam. Cras sed
                porttitor erat. Praesent nisl lorem, convallis quis est id,
                eleifend varius dolor. Nulla sagittis mauris et elementum
                viverra. Phasellus est elit, volutpat non hendrerit in, finibus
                sit amet est. Vestibulum est sem, consequat ut elementum vel,
                aliquam ac quam. Mauris sed posuere arcu. Donec vulputate rutrum
                massa quis cursus. Vivamus facilisis nulla id metus dignissim
                scelerisque. Cras at eleifend est, at mollis urna. Phasellus
                quis imperdiet est, ut pharetra nulla. Proin enim magna,
                ullamcorper ac imperdieLorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nulla purus turpis, iaculis dignissim orci nec,
                maximus laoreet orci. Sed bibendum eros ut lectus dignissim, vel
                ultrices erat sagittis. Aliquam ullamcorper varius ex, eget
                consectetur magna volutpat quis. Duis pulvinar nec dolor gravida
                volutpat. Mauris tincidunt sit amet dui imperdiet aliquam.
                Phasellus consequat turpis nec eleifend consectetur. Cras
                lacinia massa scelerisque elit pharetra, et posuere felis
                dignissim. Pellentesque sed consectetur orci. In enim ante,
                imperdiet a quam eget, vestibulum laoreet tellus. Integer at
                ultrices diam. Cras sed porttitor erat. Praesent nisl lorem,
                convallis quis est id, eleifend varius dolor. Nulla sagittis
                mauris et elementum viverra. Phasellus est elit, volutpat non
                hendrerit in, finibus sit amet est. Vestibulum est sem,
                consequat ut elementum vel, aliquam ac quam. Mauris sed posuere
                arcu. Donec vulputate rutrum massa quis cursus. Vivamus
                facilisis nulla id metus dignissim scelerisque. Cras at eleifend
                est, at mollis urna. Phasellus quis imperdiet est, ut pharetra
                nulla. Proin enim magna, ullamcorper ac imperdiet vel, luctus
                eget urna. Curabitur consectetur tincidunt neque, vel auctor
                nisl tincidunt vitae. Integer fermentum ligula tristique mi
                convallis porta. Curabitur in blandit ipsum. Maecenas dignissim
                ante diam, ac feugiat tellus auctor eget. Fusce luctus, erat vel
                iaculis porttitor, purus justo pretium orci, non fringilla
                tortor nulla sed nunc. Morbi ultrices diam ipsum, vel vulputate
                lectus varius eu. Sed sit amet velit non sapien ultricies ornare
                at vel sem. Proin viverra justo eu nibh dapibus luctus. Duis
                gravida bibendum neque a pretium. Nullam nec luctus leo.
                Curabitur tristique feugiat efficitur. Nunc ultrices facilisis
                ex finibus volutpat. Vestibulum eleifend euismod tincidunt. Duis
                mollis tellus at finibus tristique. Quisque ipsum nisi,
                tincidunt id semper non, fermentum lacinia lorem. Mauris in
                justo lorem. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Suspendisse eleifend
                massa sit amet quam congue, quis luctus mi efficitur. Mauris
                imperdiet pellentesque sapien in tempor. Mauris viverra ornare
                purus. Sed tincidunt felis et augue dignissim faucibus. Cras
                vulputate molestie leo et ultrices. Donec facilisis justo sed
                lectus viverra venenatis. Maecenas a urna metus. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Integer sit amet quam sapien. Nulla sagittis
                luctus magna. Curabitur sed condimentum quam, eget efficitur
                felis. Donec nec volutpat ante, quis mattis massa. Vestibulum
                dui lacus, dictum a posuere ut, malesuada ut sapien. Sed
                iaculis, magna a fringilla interdum, tellus ipsum pretium dui,
                egestas accumsan justo mi id diam. Proin quis ligula congue,
                tincidunt dolor ut, pulvinar nulla. In pellentesque finibus orci
                et dignissim. Nulla tempor ipsum velit, quis cursus eros rutrum
                at. Suspendisse tempor mattis arcu eget pulvinar. Mauris ut
                molestie neque. Donec egestas ut risus quis vehicula. Vestibulum
                sit amet sem vel metus tempor maximus eu a erat. Nam mattis
                consectetur dui, quis dictum justo posuere vitae. Morbi sodales
                feugiat enim eget efficitur. Nulla congue augue mi, non tempor
                lorem elementum eu. Duis consectetur augue purus, eu eleifend
                metus faucibus nec. Generated 5 paragraphs, 486 words, 3322
                bytes of Lorem Ipsum t vel, luctus eget urna. Curabitur
                consectetur tincidunt neque, vel auctor nisl tincidunt vitae.
                Integer fermentum ligula tristique mi convallis porta. Curabitur
                in blandit ipsum. Maecenas dignissim ante diam, ac feugiat
                tellus auctor eget. Fusce luctus, erat vel iaculis porttitor,
                purus justo pretium orci, non fringilla tortor nulla sed nunc.
                Morbi ultrices diam ipsum, vel vulputate lectus varius eu. Sed
                sit amet velit non sapien ultricies ornare at vel sem. Proin
                viverra justo eu nibh dapibus luctus. Duis gravida bibendum
                neque a pretium. Nullam nec luctus leo. Curabitur tristique
                feugiat efficitur. Nunc ultrices facilisis ex finibus volutpat.
                Vestibulum eleifend euismod tincidunt. Duis mollis tellus at
                finibus tristique. Quisque ipsum nisi, tincidunt id semper non,
                fermentum lacinia lorem. Mauris in justo lorem. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Suspendisse eleifend massa sit amet quam
                congue, quis luctus mi efficitur. Mauris imperdiet pellentesque
                sapien in tempor. Mauris viverra ornare purus. Sed tincidunt
                felis et augue dignissim faucibus. Cras vulputate molestie leo
                et ultrices. Donec facilisis justo sed lectus viverra venenatis.
                Maecenas a urna metus. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Integer sit
                amet quam sapien. Nulla sagittis luctus magna. Curabitur sed
                condimentum quam, eget efficitur felis. Donec nec volutpat ante,
                quis mattis massa. Vestibulum dui lacus, dictum a posuere ut,
                malesuada ut sapien. Sed iaculis, magna a fringilla interdum,
                tellus ipsum pretium dui, egestas accumsan justo mi id diam.
                Proin quis ligula congue, tincidunt dolor ut, pulvinar nulla. In
                pellentesque finibus orci et dignissim. Nulla tempor ipsum
                velit, quis cursus eros rutrum at. Suspendisse tempor mattis
                arcu eget pulvinar. Mauris ut molestie neque. Donec egestas ut
                risus quis vehicula. Vestibulum sit amet sem vel metus tempor
                maximus eu a erat. Nam mattis consectetur dui, quis dictum justo
                posuere vitae. Morbi sodales feugiat enim eget efficitur. Nulla
                congue augue mi, non tempor lorem elementum eu. Duis consectetur
                augue purus, eu eleifend metus faucibus nec. Generated 5
                paragraphs, 486 words, 3322 bytes of Lorem Ipsum
              </Box> */}
              <Chart {...DashboardChart}></Chart>
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
