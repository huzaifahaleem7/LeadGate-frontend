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
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

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

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 } 
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bg-gray-900 min-h-screen text-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-6"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-400">View your lead performance at a glance.</p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition cursor-pointer"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Leads Submitted", value: stats.total, color: "bg-blue-500", textColor: "text-white" },
          { label: "Approved Leads", value: stats.approved, color: "bg-green-500", textColor: "text-white" },
          { label: "Rejected Leads", value: stats.rejected, color: "bg-red-500", textColor: "text-white" },
          { label: "Pending Leads", value: stats.pending, color: "bg-yellow-500", textColor: "text-gray-900" },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className={`${card.color} rounded-lg p-4 shadow-md flex flex-col items-center cursor-pointer`}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <p className={`font-medium ${card.textColor}`}>{card.label}</p>
            <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold mb-2">Lead Status Distribution</h2>
          <Pie data={pieData} />
        </motion.div>

        <motion.div
          className="bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold mb-2">Leads Submitted per Day</h2>
          <Bar data={barData} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReportsPage;
