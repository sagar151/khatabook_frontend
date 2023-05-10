const getDauChartData = (keys, values) => {
  // console.log("keys, values", keys, values);
  return {
    height: 400,
    type: "bar",
    options: {
      chart: {
        id: "basic-bar",
        stacked: true,
        toolbar: {
          show: true,
          tools: {
            download: false,
          },
        },
        zoom: {
          enabled: true,
        },
      },
      colors: ["#4527a0", "#d84315", "#808080", "#FFBD00"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      xaxis: {
        type: "category",
        categories: keys,
      },
      yaxis: {
        labels: {
          show: true,
          formatter: (value) => {
            return value;
          },
        },
      },
      tooltip: {
        y: {
          title: {
            formatter: function (seriesName) {
              return "";
            },
          },
        },
      },
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: "bottom",
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: "solid",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    },
    series: [
      {
        name: "Credit",
        data: values.isCredit,
      },
      {
        name: "Debt",
        data: values.isDebt,
      },
    ],
  };
};

export default getDauChartData;
