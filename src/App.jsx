import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext/AuthContext.jsx";
import { LeadProvider } from "./context/LeadContext/LeadContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";

// pages
import { Login, Signup } from "./pages/auth/index.js";
import {
  CheckLeadPage,
  MyLeadsPage,
  ReportsPage,
  HomePage,
} from "./pages/teamlead/index.js";

// layout
import DashboardLayout from "./components/layout/DashBoardLayout.jsx";

// ✅ Reusable loading animation
const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="flex space-x-1">
      <div
        className="w-2 h-6 bg-blue-500 animate-pulse"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-2 h-6 bg-blue-500 animate-pulse"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-6 bg-blue-500 animate-pulse"
        style={{ animationDelay: "0.4s" }}
      ></div>
      <div
        className="w-2 h-6 bg-blue-500 animate-pulse"
        style={{ animationDelay: "0.6s" }}
      ></div>
      <div
        className="w-2 h-6 bg-blue-500 animate-pulse"
        style={{ animationDelay: "0.8s" }}
      ></div>
    </div>
    <p className="mt-4 text-gray-500">Checking session...</p>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

const AppRoutes = () => {
  const { user, loading } = useAuth();

  // ✅ Show loading animation while checking session
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/dashboard" replace />}
      />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Dashboard + Nested Routes */}
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
        <Route path="check-leads" element={<CheckLeadPage />} />
        <Route path="my-leads" element={<MyLeadsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
