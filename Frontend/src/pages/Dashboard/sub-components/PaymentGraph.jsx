import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

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
        label: "Revenue (₹)",
        data: monthlyRevenue,
        backgroundColor: "rgba(244,180,0,0.7)",
        borderColor: "#F4B400",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(244,180,0,1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      y: {
        beginAtZero: true,
        max: 50000,
        ticks: {
          color: "#ffffffcc",
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: {
          color: "#ffffffcc",
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
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
        text: "Monthly Payment Received",
        color: "#F4B400",
        font: { size: 20, weight: "bold" },
        padding: { top: 10, bottom: 20 },
      },
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
