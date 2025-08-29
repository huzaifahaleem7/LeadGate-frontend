// src/components/charts/LeadsBarChart.jsx
import React, { useEffect, useState } from "react";
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

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeadsBarChart = ({ stats = {} }) => {
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Leads Submitted",
        data: [],
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  });

  useEffect(() => {
    const dailyCounts = Array.isArray(stats.dailyCounts) ? stats.dailyCounts : [];

    if (dailyCounts.length === 0) {
      setBarData({
        labels: ["No Data"],
        datasets: [
          {
            label: "Leads Submitted",
            data: [0],
            backgroundColor: "#3B82F6",
            borderRadius: 6,
          },
        ],
      });
      return;
    }

    const data = {
      labels: dailyCounts.map((d) => d.date || "-"),
      datasets: [
        {
          label: "Leads Submitted",
          data: dailyCounts.map((d) => d.count || 0),
          backgroundColor: "#3B82F6",
          borderRadius: 6,
        },
      ],
    };

    setBarData(data);
  }, [stats]);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ensures chart fills container
    plugins: {
      legend: { display: true, position: "top", labels: { color: "#E5E7EB", font: { size: 14, weight: "600" } } },
      tooltip: { enabled: true, backgroundColor: "#1F2937", titleColor: "#F9FAFB", bodyColor: "#F9FAFB" },
      title: { display: false },
    },
    scales: {
      x: { ticks: { color: "#D1D5DB", font: { size: 12 } }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#D1D5DB", beginAtZero: true }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  return (
    <div className="h-72 w-full">
      <Bar data={barData} options={options} />
    </div>
  );
};

export default LeadsBarChart;
