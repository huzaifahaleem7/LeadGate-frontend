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

// layout
import DashboardLayout from "./components/layout/DashBoardLayout.jsx";

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
            path="/agent-dashboard/*" // <- added /* here
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <LeadProvider>
                  <DashboardLayout />
                </LeadProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<AgentDashboard />} />
            <Route path="add-lead" element={<AddLeadPage />} />
            <Route path="my-leads" element={<MyLeadsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Team Lead Dashboard with nested routes */}
          <Route
            path="/teamlead-dashboard/*" // <- added /* here
            element={
              <ProtectedRoute allowedRoles={["teamlead"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TeamleadDashboard />} />
          </Route>

          {/* Admin Dashboard with nested routes */}
          <Route
            path="/admin-dashboard/*" // <- added /* here
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
