import axios from 'axios'
import { API_BASE_URL } from '../../utils/constants.js'

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/user/refreshAccessToken"); // refresh token
        return api(originalRequest); // retry original request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Instead of window.location.href, just update state
        // You can trigger logout through a function from AuthContext
      }
    }

    return Promise.reject(error);
  }
);

export default api