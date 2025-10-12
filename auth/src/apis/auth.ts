import axiosInstance from "../lib/axiosInstance";
import { saveTokens } from "../lib/token";

type User = { id: number; email: string; name: string };
type AuthResponse = { user: User; accessToken: string; refreshToken?: string };

// 회원가입
export async function signup(body: { name: string; email: string; password: string }) {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/signup", body);
  saveTokens(data.accessToken, data.refreshToken);
  return data.user;
}

// 로그인
export async function login(body: { email: string; password: string }) {
  const { data } = await axiosInstance.post<AuthResponse>("/auth/signin", body);
  saveTokens(data.accessToken, data.refreshToken);
  return data.user;
}
