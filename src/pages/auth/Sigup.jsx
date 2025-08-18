import { useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { signup } = useAuth(); // get signup function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signup(
        formData.email,
        formData.username,
        formData.fullName,
        formData.password
      );

      setSuccess("Account created successfully! Please login.");
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
            Join LeadGate Today!
          </h1>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp">
            Securely manage leads and track approvals with ease.
          </p>
        </div>

        {/* Animated circles / shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full animate-pulseSlow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white opacity-10 rounded-full animate-pulseSlow delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white opacity-10 rounded-full animate-pulseSlow delay-1000"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Sign up to start managing leads efficiently
          </p>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex justify-center items-center"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="text-center mt-2">
              <a
                href="/login"
                className="text-blue-600 hover:underline text-sm"
              >
                Already have an account? Login
              </a>
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
