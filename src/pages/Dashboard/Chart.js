const getDauChartData = (keys, values) => ({

    height: 500,
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
      colors: ["#1b5e20", "#d32f2f", "#808080", "#FFBD00"],
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
            return value.toFixed(2);
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
        data: values.credit,
      },
      {
        name: "Debt",
        data: values.debt,
      },
    ],
  }
)
export default getDauChartData;
