import { create } from 'zustand'                // 전역상태 만드는 함수 
import axiosInstance from '../lib/axiosInstance';
import { parseJwtExp } from '../utils/parseJwtExp';
import axios from 'axios';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

type AuthState = {
  status: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
  accessExp: number | null;
  setToken: (p: { accessToken: string; refreshToken: string; accessExp: number | null}) => void;
  logout: () => void;
  refresh: () => Promise<string>; 
};

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "loading",
  accessToken: null,
  refreshToken: null,
  accessExp: null,

  setToken: ({ accessToken, refreshToken, accessExp }) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      set({ accessToken: accessToken, refreshToken: refreshToken, status: "authenticated", accessExp: accessExp });
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      set({ accessToken: null, status: "unauthenticated" });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    set({ accessToken: null, refreshToken: null, status: "unauthenticated", accessExp: null });
  },

  refresh: async () => {
    const { setToken, logout } = get();
    const savedRT = localStorage.getItem("refreshToken");
    console.log("refreshing token...");

    if (!savedRT) {
      logout();
      throw new Error("No refresh token");
    }

    try {
      console.log("using refresh token:", savedRT);
      // ---------api 호출----------// 
      const res = await axiosInstance.post(   //axionsInstance 인터셉터 덮어씀
        "/auth/refresh",
        { refresh: savedRT },    
        { skipAuth: true , headers: { "Content-Type": "application/json" } }
      );

      // ---------응답 파싱----------//
      console.log("refresh response:", res);
      const data = res?.data?.data ?? res?.data;
      const accessToken = data?.accessToken as string | null;
      const refreshToken = data?.refreshToken as string | null;

      if (!accessToken || !refreshToken) throw new Error("No accessToken in refresh response");

      // ---------exp 계산----------//
      const exp = parseJwtExp(accessToken);
      setToken({ accessToken, refreshToken: refreshToken, accessExp: exp ?? null });

      return accessToken;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("[refresh] status:", e.response?.status, "data:", e.response?.data);
      }
      logout();
      throw e;
    }
  },
}));