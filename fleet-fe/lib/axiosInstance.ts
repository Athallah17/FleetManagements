import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or any storage method
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors or token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Example: handle 401 errors, refresh token logic here
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // call refresh token endpoint if you have one
      // const refreshToken = localStorage.getItem("refreshToken");
      // const { data } = await axios.post("/auth/refresh", { token: refreshToken });
      // localStorage.setItem("token", data.token);
      // originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
      // return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
