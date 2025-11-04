declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuth?: boolean;
  }
}

import axios, { AxiosError, AxiosHeaders, type AxiosResponse } from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/authStore";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/v1",
  //withCredentials: true, // refresh 쿠키용
});

function setAuthHeader(cfg: AxiosRequestConfig, token: string) {
  const headers = (cfg.headers ||= new AxiosHeaders()) as AxiosHeaders;
  headers.set("Authorization", `Bearer ${token}`);
  cfg.headers = headers;
}

// ───────────────── 요청 인터셉터 ─────────────────
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();

  // refresh 요청인 경우 헤더 삭제 
  if (config.skipAuth || config.url === "/auth/refresh") {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.delete("Authorization");
    } else if (config.headers && typeof config.headers === "object") {
      const headers = config.headers as Record<string, unknown>;
      if ("Authorization" in headers) {
        delete headers["Authorization" as keyof typeof headers];
      }
    }
    return config;
  }

  // 그 외 요청 
  if (accessToken) {
    const headers = (config.headers ||= new AxiosHeaders()) as AxiosHeaders;
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    config.headers = headers;
  }
  return config;
});

// ───────────────── 응답 인터셉터 ─────────────────
let isRefreshing = false;

type QueueResolve = (token: string) => void;
type QueueReject = (err: unknown) => void;

let waitList: QueueResolve[] = [];
let waitRejects: QueueReject[] = [];

function flushQueue(token: string | null, err?: unknown) {
  if (token) {
    waitList.forEach((cb) => cb(token));
  } else {
    waitRejects.forEach((cb) => cb(err));
  }
  waitList = [];
  waitRejects = [];
}

// 성공하면 (res) => res 실행, 실패하면 asyn 실패핸들러 실행 
axiosInstance.interceptors.response.use(
  (res) => res,        
  async (error: AxiosError): Promise<AxiosResponse<unknown, unknown>> => {
    const original = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
    const status = error.response?.status;
    const isSignout = original?.url?.trim() == "/auth/signout";
    const isSignin = original?.url?.trim() == "/auth/signin";
    const isRefresh = original?.url === "/auth/refresh";

    if (isSignout || isSignin || isRefresh) {
      return Promise.reject(error);
    }

    // 재시도 불가한 경우/401이 아니면 그대로 reject
    if (!original || status !== 401) {
      return Promise.reject(error);
    }

    // 무한 루프 방지
    if (original._retry) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }
    original._retry = true;

    // 이미 리프레시 중이면 큐 대기
    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        waitList.push((token) => {
          setAuthHeader(original, token);
          resolve(axiosInstance(original));
        });
        waitRejects.push(reject);
      });
    }

    // 리프레시 수행
    isRefreshing = true;
    try {
      const newToken = await useAuthStore.getState().refresh(); 
      flushQueue(newToken);
      setAuthHeader(original, newToken);
      return axiosInstance(original);
    } catch (e: unknown) {
      flushQueue(null, e);
      useAuthStore.getState().logout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
export default axiosInstance;