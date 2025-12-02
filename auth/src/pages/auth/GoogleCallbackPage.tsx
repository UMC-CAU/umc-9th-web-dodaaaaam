import { useEffect, type JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { parseJwtExp } from "../../utils/parseJwtExp";
import FullPageSpinner from "../../components/button/FullPageSpinner";

// 쿼리 파라미터 꺼내기
function getParamFromBoth(search: string, hash: string, key: string): string | null {
  const fromSearch = new URLSearchParams(search).get(key);
  if (fromSearch) return fromSearch;
  const cleanHash = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!cleanHash) return null;
  const fromHash = new URLSearchParams(cleanHash).get(key);
  return fromHash ?? null;
}

export default function GoogleCallbackPage(): JSX.Element {
  const navigate = useNavigate();
  const { search, hash } = useLocation();
  const setToken = useAuthStore((s) => s.setToken);

  useEffect(() => {
    (async () => {
      try {
        const accessToken =
          getParamFromBoth(search, hash, "accessToken") ??
          getParamFromBoth(search, hash, "access_token");

        const refreshToken =
          getParamFromBoth(search, hash, "refreshToken") ??
          getParamFromBoth(search, hash, "refresh_token");

        const accessExpStr =
          getParamFromBoth(search, hash, "accessExp") ??
          getParamFromBoth(search, hash, "access_expires_at");

        let accessExp: number | null = null;

        if (accessToken) {
          accessExp = accessExpStr ? Number(accessExpStr) : parseJwtExp(accessToken);
        }

        if (!accessToken || !refreshToken) {
          throw new Error("구글 로그인 처리 중 필요한 토큰이 누락되었습니다.");
        } else {
          setToken({ accessToken, refreshToken, accessExp });
        }

        navigate("/", { replace: true });
      } catch (e) {
        console.error("Google callback handling failed:", e);
        // 실패 시 로그인 페이지로
        navigate("/login", { replace: true });
      }
    })();
  }, [search, hash, setToken, navigate]);

  return (
    <div>
      <FullPageSpinner />
      <p className="p-6 text-sm text-gray-600">구글 계정으로 로그인 처리 중…</p>;
    </div>
  );
}
