// src/pages/agent/AgentHomePage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import { getUserProfile } from "../../api/authApi/authApi.js";
import StatCard from "../../components/stats/StatCard.jsx";
import { LeadPieChart, LeadsBarChart } from "../../components/charts/index.js";
import { calculateLeadStats } from "../../utils/index.js";

const HomePage = () => {
  const { leads, fetchLeads } = useLeads();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(calculateLeadStats([]));
  const [loading, setLoading] = useState(true);

  // Fetch leads + user
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchLeads();
        const res = await getUserProfile();
        if (res?.data?.user) setUser(res.data.user);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Recalculate stats when leads change
  useEffect(() => {
    setStats(calculateLeadStats(leads));
  }, [leads]);

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

  // Sequential animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const welcomeText = `Welcome, ${user?.fullName || "Agent"}!`;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center">
      {/* Sequential Welcome */}
      <motion.div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-semibold text-white mb-2 flex justify-center flex-wrap"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {welcomeText.split("").map((char, index) => (
            <motion.span key={index} variants={child}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-gray-400 text-lg md:text-xl mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Monitor your leads, analyze trends, and optimize performance.
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full">
        <StatCard label="Total Leads" value={stats.total} bg="bg-blue-500" text="text-gray-50" />
        <StatCard label="Approved Leads" value={stats.approved} bg="bg-green-500" text="text-gray-50" />
        <StatCard label="Rejected Leads" value={stats.rejected} bg="bg-red-500" text="text-gray-50" />
        <StatCard label="Pending Leads" value={stats.pending} bg="bg-yellow-500" text="text-gray-900" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
          <h2 className="text-xl font-bold mb-4">Lead Status Distribution</h2>
          <LeadPieChart stats={stats} />
        </motion.div>

        <motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg" whileHover={{ scale: 1.02 }}>
          <h2 className="text-xl font-bold mb-4">Leads Submitted per Day</h2>
          {/* Updated bar chart component */}
          <LeadsBarChart stats={stats} />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
