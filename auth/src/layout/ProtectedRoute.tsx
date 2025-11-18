import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from "../store/authStore"
import FullpageSpinner from "../components/button/FullPageSpinner"
import { useEffect, useRef } from 'react'
import type { JSX } from 'react'

export function ProtectedRoute({ children }: { children: JSX.Element }){
  const status = useAuthStore((s) => s.status)   
  const location = useLocation();
  const prevStatus = useRef(status);

  useEffect(() => {
    if (prevStatus.current === "authenticated" && status === "unauthenticated") {
      window.location.reload();
    }
    prevStatus.current = status;
  }, [status]);

  if (status === 'loading') return <FullpageSpinner/>
  if (status === 'unauthenticated'){
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/signin" replace state={{ from: location }} />
  }
  return children
}