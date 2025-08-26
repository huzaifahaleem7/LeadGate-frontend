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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-gray-100">
      {/* Left Side - Enhanced Animated Illustration */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="max-w-md text-center z-10">
          <h1 className="text-5xl font-bold mb-6 animate-fadeInDown bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Welcome Back to LeadGate!
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp text-gray-300">
            Securely manage leads and track approvals with ease.
          </p>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-animate opacity-20"></div>
          
          {/* Geometric patterns */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full translate-x-1/3 translate-y-1/3 animate-float delay-2000"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Animated lines */}
          <div className="absolute top-1/4 left-1/4 w-64 h-1 bg-blue-500/30 animate-line-sweep"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-1 bg-indigo-500/30 animate-line-sweep delay-2000"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">
            Login to Your Account
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Access your dashboard securely
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center bg-red-500/10 py-2 rounded-md">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex justify-center items-center shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : "Login"}
            </button>

            <div className="text-center mt-4">
              <Link
                to="/signup"
                className="text-blue-300 hover:text-blue-200 hover:underline text-sm cursor-pointer transition-colors"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Enhanced Animation Styles */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-3deg); }
        }
        @keyframes lineSweep {
          0% { transform: translateX(-100%) scaleX(0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateX(100%) scaleX(1); opacity: 0; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeInDown { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-line-sweep { animation: lineSweep 6s linear infinite; }
        .bg-gradient-animate {
          background: linear-gradient(-45deg, #3b82f6, #4f46e5, #60a5fa, #6366f1);
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}