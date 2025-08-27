import { Bar } from "react-chartjs-2";

const LeadsBarChart = ({ stats }) => {
  const barData = {
    labels: stats.dailyCounts.map((d) => d.date),
    datasets: [
      {
        label: "Leads Submitted",
        data: stats.dailyCounts.map((d) => d.count),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return <Bar data={barData} />;
};

export default LeadsBarChart;
