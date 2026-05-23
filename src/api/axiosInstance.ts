import { useAuthStore } from "@/stores/authStore";
import axios, { type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const publicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const { refreshToken, setAccessToken, clearAuth } = useAuthStore.getState();

    if (!refreshToken) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      const response = await publicAxios.post<{ accessToken: string }>(
        "/api/v1/auth/refresh",
        {
          refreshToken,
        },
      );

      const newAccessToken = response.data.accessToken;

      setAccessToken(newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return authAxios(originalRequest);
    } catch (refreshError) {
      clearAuth();
      return Promise.reject(refreshError);
    }
  },
);
