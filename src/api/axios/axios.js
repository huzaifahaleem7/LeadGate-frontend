import axios from "axios";
import { API_BASE_URL } from "../../utils/constants.js";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // cookies bhi send hongi
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token call
        await api.post("/user/refreshAccessToken");

        // ✅ Retry original request with new access token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed, logging out...", refreshError);

        // ✅ Direct Logout
        // cookies clear karne ke liye backend logout call
        try {
          await api.post("/user/logout");
        } catch (e) {
          console.warn("Logout API failed, but forcing redirect anyway.");
        }

        // ✅ Force redirect to login
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
