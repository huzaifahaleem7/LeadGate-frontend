// src/components/Auth/SignupForm.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext/AuthContext.jsx";

const SignupForm = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();

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
    <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-indigo-400 mb-2 text-center">
        Create Your Account
      </h2>
      <p className="text-gray-300 text-center mb-6">
        Sign up to start managing leads efficiently
      </p>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center bg-red-500/10 py-2 rounded-md">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 text-sm mb-4 text-center bg-green-500/10 py-2 rounded-md">
          {success}
        </p>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-indigo-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-700 rounded-md bg-gray-800 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-indigo-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-md hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 flex justify-center items-center shadow-lg hover:shadow-xl cursor-pointer"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="text-center mt-4">
          <a
            href="/login"
            className="text-indigo-300 hover:text-indigo-200 hover:underline text-sm"
          >
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
