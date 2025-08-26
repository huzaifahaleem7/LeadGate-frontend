import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext.jsx";
import { LeadProvider } from "./context/LeadContext/LeadContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";

// pages
import { Login, Signup } from "./pages/auth/index.js";
import {
  AgentDashboard,
  AddLeadPage,
  MyLeadsPage,
  ReportsPage,
} from "./pages/agent";
import { TeamleadDashboard } from "./pages/teamlead";
import { AdminDashboard } from "./pages/admin";

// components
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Agent Dashboard with nested routes */}
          <Route
            path="/agent-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <DashboardLayout>
                  <LeadProvider>
                    <Routes>
                      <Route path="" element={<AgentDashboard />} />
                      <Route path="add-lead" element={<AddLeadPage />} />
                      <Route path="my-leads" element={<MyLeadsPage />} />
                      <Route path="reports" element={<ReportsPage />} />
                    </Routes>
                  </LeadProvider>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Team Lead Dashboard */}
          <Route
            path="/teamlead-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["teamlead"]}>
                <DashboardLayout>
                  <TeamleadDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
