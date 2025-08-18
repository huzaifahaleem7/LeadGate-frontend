import { createContext, useState, useEffect, useContext } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
} from "../../api/authApi/authApi.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ initialize as true

  // Helper: redirect based on role
  const redirectByRole = (role) => {
    switch (role) {
      case "agent":
        navigate("/agent-dashboard");
        break;
      case "teamLead":
        navigate("/teamlead-dashboard");
        break;
      case "admin":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  // signup
  const signup = async (email, username, fullName, password) => {
    try {
      const res = await registerUser(email, username, fullName, password);
      console.log("Signup success: ", res);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  // login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      setUser(res.data.user);
      redirectByRole(res.data.user.role); // ✅ redirect based on role
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  // refresh token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await refreshAccessToken();
        setUser(res.data.user);
        console.log("User loaded from refresh:", res.data.user);
        if (res.data.user) {
          redirectByRole(res.data.user.role); // ✅ redirect on refresh
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ signup, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
