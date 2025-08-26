// src/components/LeadDetailsModal.jsx
import React from "react";

const LeadDetailsModal = ({ lead, onClose }) => {
  if (!lead) return null;

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-gray-900";
      case "Approved":
        return "bg-green-500 text-gray-50";
      case "Rejected":
        return "bg-red-500 text-gray-50";
      default:
        return "bg-gray-500 text-gray-50";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-gray-900 text-gray-100 rounded-lg shadow-lg w-11/12 max-w-2xl mx-auto p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-50">
              {lead.name || "-"}
            </h2>
            <p className="text-gray-400 text-sm">Lead ID: {lead.id || "-"}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-100 text-2xl font-bold transition"
          >
            &times;
          </button>
        </div>

        {/* Lead Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-medium">Phone:</p>
            <p>{lead.phone || "-"}</p>
          </div>
          <div>
            <p className="font-medium">State:</p>
            <p>{lead.state || "-"}</p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <span
              className={`px-2 py-1 rounded-full font-medium text-sm ${getStatusBadge(
                lead.status
              )}`}
            >
              {lead.status || "-"}
            </span>
          </div>
          <div>
            <p className="font-medium">Team Lead Remarks:</p>
            <p>{lead.remarks || "-"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="font-medium">Notes / Comments:</p>
            <p className="whitespace-pre-wrap">{lead.notes || "-"}</p>
          </div>
          {lead.recording && (
            <div className="sm:col-span-2">
              <p className="font-medium">Recording:</p>
              <a
                href={lead.recording}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white transition"
              >
                Play Recording
              </a>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
