const SubmittedLeadTable = ({ lead }) => {
  if (!lead) return null;

  const StatusBadge = ({ status, type }) => {
    const config = {
      status: {
        pending: { text: "Pending", color: "bg-yellow-500" },
        approved: { text: "Approved", color: "bg-green-600" },
        rejected: { text: "Rejected", color: "bg-red-600" },
        default: { text: "Unknown", color: "bg-gray-500" },
      },
      dnc: { true: { text: "DNC", color: "bg-red-600" }, false: { text: "Not DNC", color: "bg-green-600" } },
      tcp: { true: { text: "Submitted", color: "bg-green-600" }, false: { text: "Not Submitted", color: "bg-gray-500" } },
      playback: { true: { text: "Available", color: "bg-indigo-600" }, false: { text: "Not Available", color: "bg-gray-500" } },
    };

    let key = "false";
    if (type === "status") key = status ? status.toLowerCase() : "default";
    else if (type === "dnc") key = status && status !== "none" ? "true" : "false";
    else if (type === "playback") key = status ? "true" : "false";
    else key = status ? "true" : "false";

    const { text, color } = config[type][key] || { text: "Unknown", color: "bg-gray-500" };

    return (
      <div className="flex justify-center">
        <span className={`${color} text-white px-3 py-1.5 rounded-full text-xs font-semibold inline-block min-w-[100px] text-center`}>
          {text}
        </span>
      </div>
    );
  };

  return (
    <div className="mt-6 bg-gray-900 rounded-2xl shadow-xl p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Recently Submitted Lead</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-800 text-gray-200 uppercase text-sm tracking-wider">
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Zip Code</th>
              <th className="px-4 py-3 text-left">Jornaya ID</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">DNC Status</th>
              <th className="px-4 py-3 text-center">TCP Consent</th>
              <th className="px-4 py-3 text-center">Playback</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-700 text-gray-100 hover:bg-gray-600 transition-colors duration-200">
              <td className="px-4 py-3 border-t border-gray-600">{lead.firstName || "-"}</td>
              <td className="px-4 py-3 border-t border-gray-600">{lead.lastName || "-"}</td>
              <td className="px-4 py-3 border-t border-gray-600">{lead.phone || "-"}</td>
              <td className="px-4 py-3 border-t border-gray-600">{lead.zipCode || "-"}</td>
              <td className="px-4 py-3 border-t border-gray-600 font-mono text-sm truncate max-w-[180px]">{lead.jornayaId || "-"}</td>
              <td className="px-4 py-3 border-t border-gray-600"><StatusBadge status={lead.status} type="status" /></td>
              <td className="px-4 py-3 border-t border-gray-600"><StatusBadge status={lead.dncStatus} type="dnc" /></td>
              <td className="px-4 py-3 border-t border-gray-600"><StatusBadge status={lead.tcpConsent} type="tcp" /></td>
              <td className="px-4 py-3 border-t border-gray-600"><StatusBadge status={lead.playbackUrl} type="playback" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedLeadTable;
