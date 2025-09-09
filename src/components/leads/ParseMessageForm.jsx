// src/components/leads/ParseMessageForm.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";
import { addLead } from "../../api/leadApi/leadApi.js";
import { parseMessageApi } from "../../api/parseMessageApi/parseMessageApi.js";
import SubmittedLeadTable from "./SubmittedLeadTable.jsx";

// 🔹 Reusable InputField Component
const InputField = ({ label, name, value, onChange, error, type = "text", placeholder }) => (
  <div className="w-full">
    <label className="block mb-2 text-sm font-semibold text-gray-300 tracking-wide">
      {label} <span className="text-red-400">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl bg-gray-800 text-gray-100 border shadow-sm 
        transition duration-200 ease-in-out placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-900
        ${error ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:ring-indigo-500"}`}
    />
    {error && (
      <p className="text-red-400 text-sm mt-2 flex items-center animate-fadeIn">{error}</p>
    )}
  </div>
);

const ParseMessageForm = () => {
  const [message, setMessage] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [leadAdded, setLeadAdded] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleExtract = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await parseMessageApi(message.trim());
      console.log("Parsed message:", res);

      if (!res?.phone || !res?.jornayaId) throw new Error("No leads parsed");

      // Add a "status" field as pending
      setParsedData({ ...res, status: "Pending" });
      toast.success("✅ Lead extracted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "❌ Failed to extract lead");
      setParsedData(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async () => {
    if (!parsedData) return;
    setLoading(true);
    try {
      const res = await addLead(parsedData);
      setLeadAdded(res.data.lead);
      toast.success("✅ Lead added successfully!");
      setParsedData(null);
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "❌ Failed to add lead");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessage("");
    setParsedData(null);
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 rounded-2xl shadow-2xl space-y-10 animate-fadeIn">
      {!parsedData && (
        <form onSubmit={handleExtract} className="space-y-6">
          <InputField
            label="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste the message containing phone & Jornaya ID"
            error={errors.message}
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? "Extracting..." : "Extract Lead"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-700 hover:bg-gray-800 active:scale-95 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      )}

      {parsedData && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-100">Extract Lead</h3>
          <div className="bg-gray-800 p-6 rounded-xl space-y-2">
            <InputField
              label="Phone"
              name="phone"
              value={parsedData.phone}
              onChange={(e) =>
                setParsedData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
            <InputField
              label="Jornaya ID"
              name="jornayaId"
              value={parsedData.jornayaId}
              onChange={(e) =>
                setParsedData((prev) => ({ ...prev, jornayaId: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddLead}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md cursor-pointer"
            >
              Add Lead
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md cursor-pointer"
            >
              Extract Another Lead
            </button>
          </div>
        </div>
      )}

      {leadAdded && <SubmittedLeadTable lead={leadAdded} />}
    </div>
  );
};

export default ParseMessageForm;
