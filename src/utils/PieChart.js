import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import React from "react";
import { mainColorHex } from "../constants/color";

ChartJS.register(ArcElement, Tooltip, Legend);
const MyPieChart = ({ rawData }) => {
  Chart.defaults.font.size = 10;

  const data = {
    labels: rawData && rawData.map((item) => item?.name),
    datasets: [
      {
        label: "TotalData",
        data: rawData && rawData.map((item) => item?.value),
        backgroundColor: [mainColorHex, "rgb(255,130,157)"],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        display: false,
      },
      tooltip: {
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div style={{ width: "60%" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default MyPieChart;
