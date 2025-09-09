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
      navigate("/dashboard"); // ✅ single redirect (no role check)
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
          navigate("/dashboard"); // ✅ single redirect (no role check)
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
