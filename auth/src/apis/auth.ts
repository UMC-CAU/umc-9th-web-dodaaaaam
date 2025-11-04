import axiosInstance from "../lib/axiosInstance";
import { useAuthStore } from "../store/authStore";
import type { AxiosError } from "axios";
import { parseJwtExp } from "../utils/parseJwtExp";

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
    const res = await axiosInstance.post("/auth/signup", body);
    const envelope = res.data;               
    const payload = envelope?.data;            
    const accessToken = payload?.accessToken as string;
    const refreshToken = payload?.refreshToken as string;

    // 토큰이 함께 오면 바로 저장, 없으면 refresh()로 획득
    const exp = parseJwtExp(accessToken);
    if (res) {
      useAuthStore.getState().setToken({ accessToken: accessToken, refreshToken: refreshToken, accessExp: exp ?? null });
    } else {
      await useAuthStore.getState().refresh();
    }
  } catch (e) {
    parseAxiosError(e, "회원가입 중 오류가 발생했습니다.");
  }
}

/* ---------------------------- 로그인 ---------------------------- */
export async function signin(body: { email: string; password: string }) {
  try {
    const res = await axiosInstance.post("/auth/signin", body);
    const envelope = res.data;               
    const payload = envelope?.data;            
    const accessToken = payload?.accessToken as string;
    const refreshToken = payload?.refreshToken as string;

    if (!accessToken) throw new Error("accessToken missing in response");
    const exp = parseJwtExp(accessToken);
    useAuthStore.getState().setToken({ accessToken: accessToken, refreshToken: refreshToken, accessExp: exp ?? null });

  } catch (e) {
    parseAxiosError(e, "로그인 요청 중 오류가 발생했습니다.");
  }
}

/* ---------------------------- 구글 로그인 ---------------------------- */


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