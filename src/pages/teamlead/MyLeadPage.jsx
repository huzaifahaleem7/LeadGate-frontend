// src/pages/agent/MyLeadsPage.jsx
import { useState, useEffect } from "react";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import { motion } from "framer-motion";

const MyLeadsPage = () => {
  const { leads, fetchLeads, loading } = useLeads();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeLeads = Array.isArray(leads) ? leads : [];

  const formatPhone = (phone) => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10)
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    if (digits.length > 10)
      return `+${digits.slice(
        0,
        digits.length - 10
      )} (${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(
        -4
      )}`;
    return phone;
  };

  const filteredLeads = safeLeads.filter(
    (lead) =>
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.zipCode?.includes(searchTerm) ||
      lead.jornayaId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">My Leads</h2>
        <p className="text-gray-400 mt-1">
          Track and manage your leads efficiently with real-time updates.
        </p>
      </motion.div>

      {/* Search */}
      <motion.input
        type="text"
        placeholder="Search by name, phone, ZIP, Jornaya ID, etc..."
        className="w-full p-2 mb-6 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Scrollable Table Wrapper */}
      <motion.div
        className="w-full overflow-x-auto rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <table className="min-w-[1100px] w-full text-sm whitespace-nowrap">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">ZIP</th>
              <th className="px-4 py-3 text-left">Jornaya ID</th>
              <th className="px-4 py-3 text-left">TCPA</th>
              <th className="px-4 py-3 text-left">DNC</th>
              <th className="px-4 py-3 text-left">Playback</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  {/* Bluish spinner like AgentHomePage */}
                  <motion.div
                    className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  />
                  <p className="text-gray-400 mt-2">Loading leads...</p>
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  No leads found.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead._id}
                  className="hover:bg-gray-800/70 transition-all duration-200 cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-2">{lead.firstName || "-"}</td>
                  <td className="px-4 py-2">{lead.lastName || "-"}</td>
                  <td className="px-4 py-2">{formatPhone(lead.phone)}</td>
                  <td className="px-4 py-2">{lead.zipCode || "-"}</td>
                  <td className="px-4 py-2 break-all">{lead.jornayaId || "-"}</td>
                  <td className="px-4 py-2">
                    {lead.tcpConsent ? "Submitted" : "Not Submitted"}
                  </td>
                  <td className="px-4 py-2">
                    {lead.dncStatus === "none" ? "No / Not DNC" : lead.dncStatus}
                  </td>
                  <td className="px-4 py-2">
                    {lead.playbackUrl ? "Available" : "N/A"}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyLeadsPage;
