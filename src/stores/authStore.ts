import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  phoneNumber: string;
  username: string;
  isRegistered: boolean;
  englishLevel: string;
  status: string;
  firstCallAt: string;
  registeredAt: string;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setTokens: ({ accessToken, refreshToken }) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
          isAuthenticated: true,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "molla-auth", // localStorage 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
