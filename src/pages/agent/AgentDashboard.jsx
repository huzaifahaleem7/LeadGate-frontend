// src/pages/agent/Dashboard.jsx

const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Dashboard Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-bold text-blue-600">Agent Dashboard</h1>
        <p className="text-gray-600 mt-2">Your workspace overview</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Leads</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Tasks</h2>
          <p className="text-3xl font-bold text-green-600">34</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold text-purple-600">$12K</p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition">
          <h2 className="text-xl font-semibold mb-2">Clients</h2>
          <p className="text-3xl font-bold text-red-600">58</p>
        </div>
      </div>

      {/* Middle Section with Dashboard Name */}
      <div className="my-12 flex items-center justify-center">
        <div className="bg-blue-100 rounded-2xl shadow-xl p-16 w-full max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-blue-700">Agent Dashboard</h2>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Lead John Doe assigned</li>
          <li>Task “Follow up” completed</li>
          <li>Revenue updated for July</li>
          <li>New client added: Jane Smith</li>
        </ul>
      </div>
    </div>
  );
};

export default AgentDashboard;
