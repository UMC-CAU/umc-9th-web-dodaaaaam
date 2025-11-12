import { create } from 'zustand' 
import type { User } from '../types/apiResponse';
import { refresh } from '../apis/auth';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

type AuthState = {
  status: AuthStatus;
  user: User|null;
  accessToken: string | null;
  refreshToken: string | null;
  accessExp: number | null;

  setToken: (p: {
    accessToken: string | null;
    refreshToken: string | null;
    accessExp: number | null;
    user?: User | null; 
  }) => void;

  logout: () => void;
  refresh: () => Promise<string>; 
};

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "loading",
  user: null,
  accessToken: null,
  refreshToken: null,
  accessExp: null,

  setToken: ({ accessToken, refreshToken, accessExp, user }) => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (user !== undefined) {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
      }

      set((prev) => ({
        ...prev,
        accessToken,
        refreshToken,
        accessExp: accessExp ?? null,
        user: user !== undefined ? user : prev.user,
        status: 'authenticated',
      }));

    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      set({
        accessToken: null,
        refreshToken: null,
        accessExp: null,
        user: null,
        status: 'unauthenticated',
      });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    set({
      accessToken: null,
      refreshToken: null,
      accessExp: null,
      user: null,
      status: 'unauthenticated',
    });
  },

  refresh: async () => {
    const { logout } = get();
    const savedRT = localStorage.getItem("refreshToken");

    if (!savedRT) {
      logout();
      throw new Error("No refresh token");
    }
    return refresh(savedRT);
  },
}));