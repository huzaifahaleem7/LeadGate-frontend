const SubmittedLeadTable = ({ lead }) => {
  if (!lead) return null;

  // Badge component for status
  const StatusBadge = ({ status, type }) => {
    const config = {
      status: {
        pending: { text: "Pending", color: "bg-yellow-500" },
        approved: { text: "Approved", color: "bg-green-600" },
        rejected: { text: "Rejected", color: "bg-red-600" },
        default: { text: "Unknown", color: "bg-gray-500" },
      },
      dnc: {
        true: { text: "DNC", color: "bg-red-600" },
        false: { text: "Not DNC", color: "bg-green-600" },
      },
      tcp: {
        true: { text: "Submitted", color: "bg-green-600" },
        false: { text: "Not Submitted", color: "bg-gray-500" },
      },
      playback: {
        true: { text: "Available", color: "bg-indigo-600" },
        false: { text: "Not Available", color: "bg-gray-500" },
      },
    };

    if (type === "status") {
      const statusConfig = config.status[status] || config.status.default;
      return (
        <div className="flex justify-center">
          <span
            className={`${statusConfig.color} text-white px-3 py-1.5 rounded-full text-xs font-semibold inline-block min-w-[100px] text-center`}
          >
            {statusConfig.text}
          </span>
        </div>
      );
    }

    let statusKey;

    if (type === "dnc") {
      statusKey = status && status !== "none" ? "true" : "false";
    } else if (type === "playback") {
      // Playback: if backend gives text/value, it's available
      const val = typeof status === "string" ? status.trim() : "";
      statusKey = val && val.toLowerCase() !== "not available" ? "true" : "false";
    } else {
      statusKey = status ? "true" : "false";
    }

    const { text, color } = config[type][statusKey];

    return (
      <div className="flex justify-center">
        <span
          className={`${color} text-white px-3 py-1.5 rounded-full text-xs font-semibold inline-block min-w-[100px] text-center cursor-pointer`}
        >
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className="mt-6 bg-gray-900 rounded-2xl shadow-xl p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">
          Recently Submitted Lead
        </h2>
        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-800 text-gray-200 uppercase text-sm tracking-wider">
              <th className="px-4 py-3 font-medium text-left">First Name</th>
              <th className="px-4 py-3 font-medium text-left">Last Name</th>
              <th className="px-4 py-3 font-medium text-left">Phone</th>
              <th className="px-4 py-3 font-medium text-left">Zip Code</th>
              <th className="px-4 py-3 font-medium text-left">Jornaya ID</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-center">DNC Status</th>
              <th className="px-4 py-3 font-medium text-center">TCP Consent</th>
              <th className="px-4 py-3 font-medium text-center">Playback</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-700 text-gray-100 hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <td className="px-4 py-3 border-t border-gray-600 font-medium">
                {lead.firstName || "-"}
              </td>
              <td className="px-4 py-3 border-t border-gray-600 font-medium">
                {lead.lastName || "-"}
              </td>
              <td className="px-4 py-3 border-t border-gray-600">
                {lead.phone || "-"}
              </td>
              <td className="px-4 py-3 border-t border-gray-600">
                {lead.zipCode || "-"}
              </td>
              <td className="px-4 py-3 border-t border-gray-600 font-mono text-sm text-blue-300 truncate max-w-[180px]">
                {lead.jornayaId || "-"}
              </td>
              <td className="px-4 py-3 border-t border-gray-600">
                <StatusBadge status={lead.status} type="status" />
              </td>
              <td className="px-4 py-3 border-t border-gray-600">
                <StatusBadge status={lead.dncStatus} type="dnc" />
              </td>
              <td className="px-4 py-3 border-t border-gray-600">
                <StatusBadge status={lead.tcpConsent} type="tcp" />
              </td>
              <td className="px-4 py-3 border-t border-gray-600">
                <StatusBadge status={lead.playbackUrl} type="playback" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedLeadTable;
