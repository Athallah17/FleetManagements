import axiosInstance from "@/lib/axiosInstance";
import { API } from "@/lib/api-constants";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";

export const authService = {
  // Login user
  login: async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post(API.AUTH.LOGIN, { email, password });

      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, data.token);
        if (data.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        }
      }

      return data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  // Logout user
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  // Get current token
  getToken: (): string | null => {
    if (typeof window !== "undefined") return localStorage.getItem(TOKEN_KEY);
    return null;
  },

  // Refresh token
  refreshToken: async () => {
    try {
      if (typeof window === "undefined") return null;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) return null;

      const { data } = await axiosInstance.post("/auth/refresh", { token: refreshToken });

      localStorage.setItem(TOKEN_KEY, data.token);
      return data.token;
    } catch (err) {
      console.error("Refresh token failed", err);
      authService.logout();
      return null;
    }
  },
};
