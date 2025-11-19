import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BiddersAuctioneerGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: [
      {
        label: "Bidders Registered",
        data: totalBidders,
        borderColor: "#F4B400",
        backgroundColor: "rgba(244,180,0,0.3)",
        pointBackgroundColor: "#F4B400",
        pointBorderColor: "#fff",
        borderWidth: 2,
        fill: true,
        tension: 0.35,
      },
      {
        label: "Auctioneers Registered",
        data: totalAuctioneers,
        borderColor: "#3AB8FF",
        backgroundColor: "rgba(58,184,255,0.3)",
        pointBackgroundColor: "#3AB8FF",
        pointBorderColor: "#fff",
        borderWidth: 2,
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          color: "#ffffffcc",
          callback: function (value) {
            return value + " users";
          },
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#ffffffcc" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "#F4B400",
          font: { size: 14, weight: "bold" },
        },
      },

      title: {
        display: true,
        text: "Monthly Registration Data (Bidders vs Auctioneers)",
        color: "#F4B400",
        font: { size: 20, weight: "bold" },
        padding: { top: 10, bottom: 20 },
      },
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneerGraph;
