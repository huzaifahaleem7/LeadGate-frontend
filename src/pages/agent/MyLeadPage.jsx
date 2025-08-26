// src/pages/agent/MyLeadsPage.jsx
import { useState, useEffect } from "react";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import LeadDetailsModal from "../../components/modals/LeadDetailsModal.jsx";

const MyLeadsPage = () => {
  const { leads, fetchLeads, fetchLeadById, loading } = useLeads();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all leads on component mount
  useEffect(() => {
    if (fetchLeads) {
      fetchLeads(); // <-- ensure fetchLeads exists
    }
  }, [fetchLeads]);

  // Filter & search
  const filteredLeads = leads
    .filter(
      (lead) =>
        (lead.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (lead.phone || "").includes(searchTerm)
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true));

  // Pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  // Open modal
  const handleRowClick = async (id) => {
    if (!fetchLeadById) return;
    const leadData = await fetchLeadById(id);
    setSelectedLead(leadData);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-100">My Leads</h1>
        <p className="text-gray-400">
          Track, search, and filter your submitted leads.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name or Phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-1/4 px-3 py-2 rounded-md bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-gray-800 text-gray-100">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Lead ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Team Lead Remarks</th>
              <th className="px-4 py-2 text-left">Date Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : currentLeads.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No leads found
                </td>
              </tr>
            ) : (
              currentLeads.map((lead) => (
                <tr
                  key={lead._id || lead.id}
                  onClick={() => handleRowClick(lead._id || lead.id)}
                  className="cursor-pointer hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2">{lead._id || lead.id}</td>
                  <td className="px-4 py-2">{lead.name || "-"}</td>
                  <td className="px-4 py-2">{lead.phone || "-"}</td>
                  <td className="px-4 py-2">{lead.state || "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full font-medium text-sm ${
                        lead.status === "Pending"
                          ? "bg-yellow-500 text-gray-900"
                          : lead.status === "Approved"
                          ? "bg-green-500 text-gray-900"
                          : "bg-red-500 text-gray-100"
                      }`}
                    >
                      {lead.status || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{lead.remarks || "-"}</td>
                  <td className="px-4 py-2">
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md font-medium transition ${
                currentPage === i + 1
                  ? "bg-gray-700 text-white"
                  : "bg-gray-600 text-gray-100 hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Lead Details Modal */}
      {isModalOpen && selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyLeadsPage;
