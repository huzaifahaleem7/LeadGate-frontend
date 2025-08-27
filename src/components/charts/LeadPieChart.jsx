import { Pie } from "react-chartjs-2";

const LeadPieChart = ({ stats }) => {
  const pieData = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ["#10B981", "#EF4444", "#FBBF24"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ye canvas ko parent ke size ke hisaab se adjust karega
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff", // legend ka color white
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-64 lg:h-80"> {/* container ka size control */}
      <Pie data={pieData} options={options} />
    </div>
  );
};

export default LeadPieChart;