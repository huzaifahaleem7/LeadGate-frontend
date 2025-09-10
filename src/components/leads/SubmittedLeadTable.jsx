const SubmittedLeadTable = ({ lead }) => {
  if (!lead) return null;

  const StatusBadge = ({ status, type }) => {
    const config = {
      dnc: { 
        true: { text: "DNC", color: "text-whote" }, 
        false: { text: "Not DNC", color: "text-white" } 
      },
      playback: { 
        true: { text: "Available", color: "text-white" }, 
        false: { text: "Not Available", color: "text-gray-400" } 
      },
      tcp: { 
        true: { text: "Submitted", color: "text-white" }, 
        false: { text: "Not Submitted", color: "text-gray-400" } 
      },
    };

    let key = status ? "true" : "false";
    const { text, color } = config[type][key] || { text: "Unknown", color: "text-gray-400" };

    return (
      <span className={`${color} font-semibold`}>
        {text}
      </span>
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
              <td className="px-4 py-3 border-t border-gray-600 text-center"><StatusBadge status={lead.dncStatus} type="dnc" /></td>
              <td className="px-4 py-3 border-t border-gray-600 text-center"><StatusBadge status={lead.tcpConsent} type="tcp" /></td>
              <td className="px-4 py-3 border-t border-gray-600 text-center"><StatusBadge status={lead.playbackUrl} type="playback" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedLeadTable;
