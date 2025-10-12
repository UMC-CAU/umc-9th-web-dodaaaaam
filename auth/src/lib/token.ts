const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const saveTokens = (access: string, refresh?: string) => {
  localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};