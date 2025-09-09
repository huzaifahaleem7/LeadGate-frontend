import { useState } from "react";
import { useLeads } from "../../context/LeadContext/LeadContext.jsx";
import { toast } from "react-hot-toast";
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
      <p className="text-red-400 text-sm mt-2 flex items-center animate-fadeIn">
        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-9-4a1 1 0 10-2 0 1 1 0zm0 2a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
        {error}
      </p>
    )}
  </div>
);

const AddLeadForm = () => {
  const { createdLead } = useLeads();

  const initialState = { phone: "", jornayaId: "" };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastLead, setLastLead] = useState(null);
  const [showForm, setShowForm] = useState(true);

  // 🔹 Validation rules
  const rules = {
    phone: (val) => (!/^\d{10,15}$/.test(val.trim()) ? "Phone must be 10–15 digits" : ""),
    jornayaId: (val) => (!val.trim() ? "Jornaya ID is required" : "")
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(rules).forEach(([field, rule]) => {
      const error = rule(formData[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: rules[name](value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      document.querySelector(`[name="${Object.keys(validationErrors)[0]}"]`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const payload = Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, v.trim()]));
      const res = await createdLead(payload);

      if (!res?.data?.lead) throw new Error("Invalid API response");

      toast.success("✅ Lead saved successfully!");
      setLastLead(res.data.lead);
      setShowForm(false);
      setFormData(initialState);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "❌ Failed to save lead.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-900 rounded-2xl shadow-2xl space-y-10 animate-fadeIn">
      {showForm && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <h2 className="text-2xl font-bold text-gray-100">➕ Submit New Lead</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 🔹 Only Phone + Jornaya ID */}
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number (10–15 digits)"
              error={errors.phone}
            />

            <InputField
              label="Jornaya ID"
              name="jornayaId"
              value={formData.jornayaId}
              onChange={handleChange}
              placeholder="Enter Jornaya ID"
              error={errors.jornayaId}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Saving Lead...
                  </>
                ) : "Submit Lead"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-700 hover:bg-gray-800 active:scale-95 text-white px-6 py-3.5 rounded-xl font-semibold shadow-md transition duration-200 cursor-pointer"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      )}

      {lastLead && <SubmittedLeadTable lead={lastLead} />}
    </div>
  );
};

export default AddLeadForm;
