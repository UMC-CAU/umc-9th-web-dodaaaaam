import { type JSX } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function GoogleLoginButton(): JSX.Element {
  const baseURL = axiosInstance.defaults.baseURL?.replace(/\/$/, "") ?? "";

  const handleClick = (): void => {
    window.location.href = `${baseURL}/auth/google/login`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full mt-2 py-3 rounded-lg bg-white flex items-center justify-center gap-2 
             text-gray-800 font-medium border border-gray-300 transition-all duration-200 
             hover:bg-gray-100 hover:border-gray-400 hover:shadow-md active:scale-[0.98]"
      >
      <GoogleGIcon />
    </button>
  );
}

// ───────── G 아이콘 ───────── /
function GoogleGIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.673 32.91 29.223 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 
        12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.6 6.053 29.6 4 24 4 12.955 
        4 4 12.955 4 24s8.955 20 20 20 20-8.955 
        20-20c0-1.341-.138-2.651-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.357 16.108 18.822 12 
        24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.6 
        6.053 29.6 4 24 4 15.316 4 7.988 8.996 
        6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.852-1.981 
        13.409-5.213l-6.191-5.238C29.174 35.091 
        26.681 36 24 36c-5.198 0-9.647-3.07-11.315-7.457l-6.539 
        5.036C7.794 39.02 15.246 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-1.353 
        3.91-5.803 7-11.303 7-5.198 0-9.647-3.07-11.315-7.457l-6.539 
        5.036C7.794 39.02 15.246 44 24 
        44c8.754 0 16.206-4.98 19.289-12.083 
        1.129-2.64 1.782-5.58 1.782-8.917 
        0-1.341-.138-2.651-.46-3.917z"
      />
    </svg>
  );
}