import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";

export function useExpiry() {
  const accessExp = useAuthStore(s => s.accessExp);     // 토큰 만료 시간 (서버가 내려준 exp)
  const logoutTimerRef = useRef<number | null>(null);   // 로그아웃용 타이머
  const refreshTimerRef = useRef<number | null>(null);  // 리프레시용 타이머
  const skewMs = 1000;                                  // 시계 오차 버퍼 (1초)
  const refreshBeforeMs = 5 * 1000;                     // 만료 5초 전


  // ----------------이전 타이머 clear 함수---------------- //
  const clearTimers = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  };

  // ----------------타이머 설정 함수---------------- //
  const schedule = () => {
    clearTimers();

    // 만료 시각이 없으면 (로그인 안 된 상태) 그냥 종료 
    if (!accessExp) return;

    // 남은 시간 계산
    const left = accessExp * 1000 - Date.now() - skewMs;

    // 이미 만료된 경우 즉시 로그아웃 
    if (left <= 0) {
      useAuthStore.getState().logout();
      return;
    }

    // 만료 10초 전 리프레시 호출 
    const refreshDelay = Math.max(left - refreshBeforeMs, 0);
    refreshTimerRef.current = window.setTimeout(async () => {

      if (logoutTimerRef.current) {
        clearTimeout(logoutTimerRef.current);
        logoutTimerRef.current = null;
      }

      try {
        await useAuthStore.getState().refresh(); 
      } catch (e) {
        console.log("refresh error:", e);
        useAuthStore.getState().logout();
      }
    }, refreshDelay);

    // 남은 시간 후에 로그아웃 예약
    logoutTimerRef.current = window.setTimeout(() => {
      useAuthStore.getState().logout(); 
    }, left);
  };

  // ----------------타이머 실행 및 정리---------------- //
  useEffect(() => {
    schedule();
    return () => clearTimers();
  }, [accessExp]);
}
