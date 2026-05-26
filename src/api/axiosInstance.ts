import { useAuthStore } from "@/stores/authStore";
import axios, { type InternalAxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponseDirect = { accessToken: string };
type RefreshResponseWrapped = {
  code: string;
  message: string;
  data: { accessToken: string };
  timestamp: string;
};
type RefreshResponse = RefreshResponseDirect | RefreshResponseWrapped;

function extractAccessToken(data: RefreshResponse): string | undefined {
  // 래퍼 형식: { code, message, data: { accessToken }, timestamp }
  if ("data" in data && typeof data.data === "object" && data.data !== null) {
    return (data.data as { accessToken?: string }).accessToken;
  }
  // 직접 형식: { accessToken }
  return (data as RefreshResponseDirect).accessToken;
}

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

    const { refreshToken, setAccessToken, setTokens, clearAuth } =
      useAuthStore.getState();

    if (!refreshToken) {
      clearAuth();
      return Promise.reject(error);
    }

    try {
      const response = await publicAxios.post<RefreshResponse>(
        "/api/v1/auth/refresh",
        { refreshToken },
      );

      const newAccessToken = extractAccessToken(response.data);

      // 토큰 추출에 실패한 경우 (응답 형식 불일치 등) 강제 로그아웃
      if (!newAccessToken) {
        console.error(
          "[Auth] 토큰 갱신 응답에서 accessToken 추출 실패:",
          response.data,
        );
        clearAuth();
        return Promise.reject(
          new Error("Token refresh failed: invalid response format"),
        );
      }

      // 서버가 새 refreshToken도 함께 반환하는 경우 같이 저장
      const newRefreshToken =
        "data" in response.data && typeof response.data.data === "object"
          ? (response.data.data as { refreshToken?: string }).refreshToken
          : (response.data as { refreshToken?: string }).refreshToken;

      if (newRefreshToken) {
        setTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      } else {
        setAccessToken(newAccessToken);
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return authAxios(originalRequest);
    } catch (refreshError) {
      clearAuth();
      return Promise.reject(refreshError);
    }
  },
);
