import axiosInstance from "../utils/axiosInstance";
import { useAuthStore } from "../store/authStore";
import type { AxiosError } from "axios";
import { parseJwtExp } from "../utils/parseJwtExp";
import type { ApiEnvelope, AuthPayload, User } from "../types/apiResponse";

type ServerError = { message?: string; code?: string };

/** 공통 에러 파서 */
function parseAxiosError(e: unknown, fallback = "요청 처리 중 오류가 발생했습니다."): never {
  const err = e as AxiosError<ServerError>;
  const msg = err.response?.data?.message ?? fallback;
  throw new Error(msg);
}

/* --------------------------- 회원가입 --------------------------- */
export async function signup(body: { name: string; email: string; password: string }) {
  try {
    await axiosInstance.post<ApiEnvelope<User>>("/auth/signup", body);
    signin({ email: body.email, password: body.password });  // 자동 로그인 시도
  } catch (e) {
    parseAxiosError(e, "회원가입 중 오류가 발생했습니다.");
  }
}

/* ---------------------------- 로그인 ---------------------------- */
export async function signin(body: { email: string; password: string }) {
  try {
    const res = await axiosInstance.post<ApiEnvelope<AuthPayload>>("/auth/signin", body);
    const { id, name, accessToken, refreshToken } = res.data.data;
    const user: User = { id, name };

    if (!accessToken || !refreshToken) {
      throw new Error("accessToken/refreshToken missing in response");
    }

    const exp = parseJwtExp(accessToken);
    useAuthStore.getState().setToken({
      accessToken,
      refreshToken,
      accessExp: exp ?? null,
      user, 
    });
  } catch (e) {
    parseAxiosError(e, "로그인 요청 중 오류가 발생했습니다.");
  }
}

/* ---------------------------- 로그아웃 --------------------------- */
export async function signout() {
  try {
    await axiosInstance.post("/auth/signout");
  } catch (_e) {
    console.log(_e);
  } finally {
    useAuthStore.getState().logout();
  }
}

/* ---------------------------- 리프레시 --------------------------- */
export async function refresh(savedRT: string) {
  try {
    const res = await axiosInstance.post<ApiEnvelope<AuthPayload>>(   
      "/auth/refresh",
      { refresh: savedRT },    
      { skipAuth: true , headers: { "Content-Type": "application/json" } }
    );

    const { id, name, accessToken, refreshToken } = res.data.data;
    const user: User = { id, name };

    if (!accessToken || !refreshToken) {
      throw new Error("accessToken/refreshToken missing in response");
    }

    const exp = parseJwtExp(accessToken);
    useAuthStore.getState().setToken({
      accessToken,
      refreshToken,
      accessExp: exp ?? null,
      user, 
    });
    return refreshToken;
  } catch (e) {
    console.log("[refresh] failed:", e);
    useAuthStore.getState().logout();
    throw e;
  } 
}