import { useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx"; 
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Animated Illustration */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
        <div className="max-w-md text-center z-10">
          <h1 className="text-4xl font-bold mb-4 animate-fadeInDown">
            Welcome Back to LeadGate!
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp">
            Securely manage leads and track approvals with ease.
          </p>
        </div>

        {/* Animated circles */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full animate-pulseSlow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white opacity-10 rounded-full animate-pulseSlow delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white opacity-10 rounded-full animate-pulseSlow delay-1000"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Login to Your Account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Access your dashboard securely
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center mt-2">
              <Link
                to="/signup"
                className="text-blue-600 hover:underline text-sm"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Tailwind Animation Classes */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
        .animate-fadeInDown { animation: fadeInDown 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animate-pulseSlow { animation: pulseSlow 4s ease-in-out infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}
