// src/pages/agent/AgentHomePage.jsx
import { useEffect, useState } from "react";
import LeadDetailsModal from "../../components/modals/LeadDetailsModal.jsx";
import { Pie, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import { getUserProfile } from "../../api/authApi/authApi.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AgentHomePage = () => {
  const { leads, fetchLeads } = useLeads();
  const [selectedLead, setSelectedLead] = useState(null);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
    dailyCounts: [],
  });

  // Fetch leads
  useEffect(() => {
    const loadLeads = async () => {
      setLoadingLeads(true);
      await fetchLeads();
      setLoadingLeads(false);
    };
    loadLeads();
  }, []);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        if (res?.data?.user) setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  // Calculate stats whenever leads change
  useEffect(() => {
    if (!Array.isArray(leads)) return;

    const total = leads.length;
    const approved = leads.filter((l) => l.status === "Approved").length;
    const rejected = leads.filter((l) => l.status === "Rejected").length;
    const pending = leads.filter((l) => l.status === "Pending").length;

    const dailyCounts = leads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
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
      dailyCounts: sortedDates.map((date) => ({ date, count: dailyCounts[date] })),
    });
  }, [leads]);

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

  const barData = {
    labels: stats.dailyCounts.map((d) => d.date),
    datasets: [
      {
        label: "Leads Submitted",
        data: stats.dailyCounts.map((d) => d.count),
        backgroundColor: "#3B82F6", // Bluish color for bars
      },
    ],
  };

  // Loading screen
  if (loadingUser || loadingLeads) {
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
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center">
      {/* Smooth Welcome */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "linear" }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2">
          Welcome, {user?.fullName || "Agent"}!
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Monitor your leads, analyze trends, and optimize performance.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full">
        {[
          { label: "Total Leads", value: stats.total, bg: "bg-blue-500", text: "text-gray-50" },
          { label: "Approved Leads", value: stats.approved, bg: "bg-green-500", text: "text-gray-50" },
          { label: "Rejected Leads", value: stats.rejected, bg: "bg-red-500", text: "text-gray-50" },
          { label: "Pending Leads", value: stats.pending, bg: "bg-yellow-500", text: "text-gray-900" },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className={`${card.bg} rounded-lg p-6 shadow-lg flex flex-col items-center cursor-pointer`}
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
          >
            <p className={`font-medium ${card.text}`}>{card.label}</p>
            <p className={`text-3xl font-bold ${card.text}`}>{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer"
          whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <h2 className="text-xl font-bold mb-4">Lead Status Distribution</h2>
          <Pie data={pieData} />
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto cursor-pointer"
          whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <h2 className="text-xl font-bold mb-4">Leads Submitted per Day</h2>
          <Bar data={barData} />
        </motion.div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
};

export default AgentHomePage;
