import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from "../store/authStore"
import FullpageSpinner from "./FullPageSpinner"
import { useEffect, useRef } from 'react'
import type { JSX } from 'react'

export function ProtectedRoute({ children }: { children: JSX.Element }){
  const status = useAuthStore((s) => s.status)   // 현재 상태 객체 s의 status 
  const location = useLocation();
  const prevStatus = useRef(status);

  useEffect(() => {
    if (prevStatus.current === "authenticated" && status === "unauthenticated") {
      window.location.reload();
    }
    prevStatus.current = status;
  }, [status]);

  if (status === 'loading') return <FullpageSpinner/>
  if (status === 'unauthenticated') return <Navigate to="/signin" replace state={{ from: location }} />
  return children
}