// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Dynamic dashboard link based on user role
  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "agent":
        return "/agent-dashboard";
      case "teamlead":
        return "/teamlead-dashboard";
      case "admin":
        return "/admin-dashboard";
      default:
        return "/dashboard";
    }
  };

  return (
    <nav className="bg-[#1E3A8A] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left: Logo */}
          <Link
            to={getDashboardLink()}
            className="text-2xl font-semibold hover:text-[#2563EB] transition-colors duration-200 cursor-pointer"
          >
            LeadGate
          </Link>

          {/* Right: Profile */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon */}
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#2563EB] transition-colors duration-200 cursor-pointer"
              >
                <FaUserCircle className="w-7 h-7 text-white" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1E3A8A] rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200">
                  <Link
                    to="/profile-settings"
                    className="block px-4 py-2 hover:bg-[#2563EB] font-medium transition-colors duration-200 cursor-pointer rounded-t-md"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-[#B91C1C] bg-[#EF4444] font-medium rounded-b-md transition-colors duration-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
