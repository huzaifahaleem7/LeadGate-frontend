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
        await api.post("/user/refreshAccessToken", {}, { withCredentials: true });

        // ✅ Retry original request with updated cookies
        return api({
          ...originalRequest,
          withCredentials: true,
        });
      } catch (refreshError) {
        console.error("Refresh token failed, logging out...", refreshError);

        try {
          await api.post("/user/logout", {}, { withCredentials: true });
        } catch (e) {
          console.warn("Logout API failed, but forcing redirect anyway.");
        }

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
