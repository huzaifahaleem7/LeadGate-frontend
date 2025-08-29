// src/pages/agent/ReportsPage.jsx
import { useEffect, useState } from "react";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

// ✅ Reuse components and utils like in AgentHomePage
import StatCard from "../../components/stats/StatCard.jsx";
import { LeadPieChart, LeadsBarChart } from "../../components/charts";
import { calculateLeadStats } from "../../utils";

const ReportsPage = () => {
  const { leads, fetchLeads } = useLeads();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(calculateLeadStats([]));

  useEffect(() => {
    setStats(calculateLeadStats(leads));
  }, [leads]);

  const handleRefresh = async () => {
    setLoading(true);
    await fetchLeads();
    setLoading(false);
  };

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
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
          <p className="text-gray-400">
            View your lead performance at a glance.
          </p>
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
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Leads Submitted"
          value={stats.total}
          bg="bg-blue-500"
          text="text-gray-50"
        />
        <StatCard
          label="Approved Leads"
          value={stats.approved}
          bg="bg-green-500"
          text="text-gray-50"
        />
        <StatCard
          label="Rejected Leads"
          value={stats.rejected}
          bg="bg-red-500"
          text="text-gray-50"
        />
        <StatCard
          label="Pending Leads"
          value={stats.pending}
          bg="bg-yellow-500"
          text="text-gray-900"
        />
      </motion.div>

      {/* Charts */}
      <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-bold mb-4">Lead Status Distribution</h2>
          <LeadPieChart stats={stats} />
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-bold mb-4">Leads Submitted per Day</h2>
          <LeadsBarChart stats={stats} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReportsPage;
