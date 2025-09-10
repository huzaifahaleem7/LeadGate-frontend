// src/components/leads/LeadCard.jsx
import { useState } from "react";
import CheckLeadForm from "./CheckLeads.jsx";
import ParseMessageForm from "./ParseMessageForm.jsx";

const LeadCard = () => {
  const [mode, setMode] = useState("number"); // default tab
  const [tabKey, setTabKey] = useState(0); // key to force remount

  // Handle tab click and force remount
  const handleTabClick = (newMode) => {
    setMode(newMode);
    setTabKey((prev) => prev + 1); // increment key to remount form
  };

  return (
    <div className="bg-gray-800 text-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-3xl">
      <h2 className="text-3xl font-bold mb-3 text-indigo-400 text-center">
        Check New Lead
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Fill in the lead details below or parse a message.
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
            mode === "number"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => handleTabClick("number")}
        >
          Check by Number
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer ${
            mode === "message"
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => handleTabClick("message")}
        >
          Check by Message
        </button>
      </div>

      {/* Content */}
      <div>
        {mode === "number" ? (
          <CheckLeadForm key={`number-${tabKey}`} />
        ) : (
          <ParseMessageForm key={`message-${tabKey}`} />
        )}
      </div>
    </div>
  );
};

export default LeadCard;
