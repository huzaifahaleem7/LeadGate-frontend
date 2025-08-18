import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute";

// pages
import { Login, Signup } from "./pages/auth/index.js";
import { AgentDashboard } from "./pages/agent";
import { TeamleadDashboard } from "./pages/teamlead";
import { AdminDashboard } from "./pages/admin";

// components
import { Navbar } from "./components/layout";

// Layout wrapper for dashboards
function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Agent Dashboard */}
          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <DashboardLayout>
                  <AgentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Team Lead Dashboard */}
          <Route
            path="/teamlead-dashboard"
            element={
              <ProtectedRoute allowedRoles={["teamLead"]}>
                <DashboardLayout>
                  <TeamleadDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Optional: fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
