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
  AddLeadPage,
  MyLeadsPage,
  ReportsPage,
  HomePage
} from "./pages/teamlead/index.js"; // ✅ reuse existing lead pages

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

          {/* Single Dashboard with nested routes */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <LeadProvider>
                  <DashboardLayout />
                </LeadProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="add-lead" element={<AddLeadPage />} />
            <Route path="my-leads" element={<MyLeadsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
