// src/pages/agent/ReportsPage.jsx
import { useEffect, useState } from "react";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { ArrowPathIcon } from "@heroicons/react/24/outline"; // updated icon

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ReportsPage = () => {
  const { leads, fetchLeads } = useLeads();
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    dailyCounts: [],
  });

  useEffect(() => {
    calculateStats();
  }, [leads]);

  const calculateStats = () => {
    const total = leads.length;
    const approved = leads.filter((l) => l.status === "Approved").length;
    const rejected = leads.filter((l) => l.status === "Rejected").length;
    const pending = leads.filter((l) => l.status === "Pending").length;

    const dailyCounts = leads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt).toLocaleDateString();
      if (!acc[date]) acc[date] = 0;
      acc[date]++;
      return acc;
    }, {});
    const sortedDates = Object.keys(dailyCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    setStats({
      total,
      approved,
      rejected,
      pending,
      dailyCounts: sortedDates.map((date) => ({
        date,
        count: dailyCounts[date],
      })),
    });
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchLeads();
    setLoading(false);
  };

  // Pie Chart Data
  const pieData = {
    labels: ["Approved", "Rejected", "Pending"],
    datasets: [
      {
        data: [stats.approved, stats.rejected, stats.pending],
        backgroundColor: ["#10B981", "#EF4444", "#FBBF24"],
        hoverOffset: 10,
      },
    ],
  };

  // Bar Chart Data
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

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-400">View your lead performance at a glance.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-500 rounded-lg p-4 shadow-md flex flex-col items-center">
          <p className="font-medium text-white">Total Leads Submitted</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-green-500 rounded-lg p-4 shadow-md flex flex-col items-center">
          <p className="font-medium text-white">Approved Leads</p>
          <p className="text-2xl font-bold text-white">{stats.approved}</p>
        </div>
        <div className="bg-red-500 rounded-lg p-4 shadow-md flex flex-col items-center">
          <p className="font-medium text-white">Rejected Leads</p>
          <p className="text-2xl font-bold text-white">{stats.rejected}</p>
        </div>
        <div className="bg-yellow-500 rounded-lg p-4 shadow-md flex flex-col items-center">
          <p className="font-medium text-gray-900">Pending Leads</p>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-2">Lead Status Distribution</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-lg font-bold mb-2">Leads Submitted per Day</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
