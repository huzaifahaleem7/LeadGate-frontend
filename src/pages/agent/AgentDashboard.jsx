// src/pages/agent/AgentHomePage.jsx
import { useState } from "react";
import LeadDetailsModal from "../../components/modals/LeadDetailsModal.jsx";
import { PlusIcon, Squares2X2Icon, ChartBarIcon } from "@heroicons/react/24/outline";

const AgentHomePage = () => {
  const [selectedLead, setSelectedLead] = useState(null);

  // Placeholder stats
  const stats = { total: 120, pending: 15, approved: 80, rejected: 25 };

  // Placeholder recent leads
  const recentLeads = [
    { _id: 1, name: "Ali Khan", phone: "03001234567", status: "Pending", createdAt: new Date() },
    { _id: 2, name: "Sara Ahmed", phone: "03007654321", status: "Approved", createdAt: new Date() },
    { _id: 3, name: "Usman Riaz", phone: "03009871234", status: "Rejected", createdAt: new Date() },
    { _id: 4, name: "Ayesha Iqbal", phone: "03006543210", status: "Approved", createdAt: new Date() },
    { _id: 5, name: "Bilal Shah", phone: "03001112233", status: "Pending", createdAt: new Date() },
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-50 mb-2">👋 Welcome, Agent!</h1>
        <p className="text-gray-400">This is your dashboard placeholder. Add leads, track progress, view reports.</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-500 rounded-lg p-4 shadow-md flex flex-col items-center transform hover:scale-105 transition">
          <p className="font-medium text-gray-900">Pending Leads</p>
          <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
        </div>
        <div className="bg-green-500 rounded-lg p-4 shadow-md flex flex-col items-center transform hover:scale-105 transition">
          <p className="font-medium text-gray-50">Approved Leads</p>
          <p className="text-2xl font-bold text-gray-50">{stats.approved}</p>
        </div>
        <div className="bg-red-500 rounded-lg p-4 shadow-md flex flex-col items-center transform hover:scale-105 transition">
          <p className="font-medium text-gray-50">Rejected Leads</p>
          <p className="text-2xl font-bold text-gray-50">{stats.rejected}</p>
        </div>
        <div className="bg-blue-500 rounded-lg p-4 shadow-md flex flex-col items-center transform hover:scale-105 transition">
          <p className="font-medium text-gray-50">Total Leads</p>
          <p className="text-2xl font-bold text-gray-50">{stats.total}</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow transition">
          <PlusIcon className="w-5 h-5 mr-2" /> Add New Lead
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow transition">
          <Squares2X2Icon className="w-5 h-5 mr-2" /> View My Leads
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow transition">
          <ChartBarIcon className="w-5 h-5 mr-2" /> View Reports
        </button>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-100">Name</th>
              <th className="px-4 py-2 text-left text-gray-100">Phone</th>
              <th className="px-4 py-2 text-left text-gray-100">Status</th>
              <th className="px-4 py-2 text-left text-gray-100">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead) => (
              <tr
                key={lead._id}
                className="cursor-pointer bg-gray-800 hover:bg-gray-700 transition"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.phone}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      lead.status === "Pending"
                        ? "bg-yellow-500 text-gray-900"
                        : lead.status === "Approved"
                        ? "bg-green-500 text-gray-50"
                        : "bg-red-500 text-gray-50"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-2">{lead.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Details Modal Placeholder */}
      {selectedLead && (
        <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
};

export default AgentHomePage;
