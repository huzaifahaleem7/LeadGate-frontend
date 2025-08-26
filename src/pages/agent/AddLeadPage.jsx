// src/pages/agent/AddLeadPage.jsx
import AddLeadForm from "../../components/leads/AddLeadForm.jsx";

const AddLeadPage = () => {
  return (
    <div className="p-6">
      <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        {/* Card Header */}
        <h2 className="text-2xl font-bold mb-1 text-indigo-400">Add New Lead</h2>
        <p className="text-gray-400 mb-6">Fill in the lead details below.</p>

        {/* Form Component */}
        <AddLeadForm />
      </div>
    </div>
  );
};

export default AddLeadPage;
