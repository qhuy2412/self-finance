import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:9999",
    withCredentials: true
});
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(`${process.env.BASE_URL || "http://localhost:9999"}/api/auth/refresh`, {}, { withCredentials: true });
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;