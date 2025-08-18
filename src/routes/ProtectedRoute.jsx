import { useAuth } from "../context/AuthContext/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  // Loading state with animation
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex space-x-1">
          <div className="w-2 h-6 bg-blue-500 animate-pulse" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-6 bg-blue-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-6 bg-blue-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          <div className="w-2 h-6 bg-blue-500 animate-pulse" style={{ animationDelay: "0.6s" }}></div>
          <div className="w-2 h-6 bg-blue-500 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
        </div>
        <p className="mt-4 text-gray-500">Checking session...</p>
      </div>
    );

  // If no user → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Role-based access
  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    // Redirect to the correct dashboard if role not allowed
    switch (user.role) {
      case "agent":
        return <Navigate to="/agent-dashboard" replace />;
      case "teamLead":
        return <Navigate to="/teamlead-dashboard" replace />;
      case "admin":
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
