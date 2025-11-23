import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStore } from '../store/authStore';
import { ProtectedRoute } from './ProtectedRoute';
import LpCreateModal from '../components/LPCreateModal';
import { useSignoutMutation } from '../hooks/useAuthMutation';

const RootLayout = () => {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const { mutate: signout } = useSignoutMutation();

  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLogout = async () => {
    signout(undefined, {
      onSuccess: () => {
        alert("로그아웃에 성공했습니다.");
        navigate("/");
      },
      onError: (error) => {
        console.log("[로그아웃 실패]: ", error);
        alert("로그아웃에 실패했습니다.");
      },
    })  
  };

  useEffect(() => {
    if (!open) return; // 열렸을 때만 감시
    
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      // 사이드바 안을 클릭 -> 무시
      if (drawerRef.current?.contains(target)) return;
      // 햄버거 버튼 클릭 -> 무시 (닫지 않음)
      if (toggleBtnRef.current?.contains(target)) return;

      // 그 외 아무 데나 클릭 -> 닫기
      setOpen(false);
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  return (
    <div className="bg-white mt-10 max-w-6xl mx-auto px-6 py-5 ">
      {/* 헤더 */}
      <header>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* 햄버거 버튼 */}
            <button
              type="button"
              ref={toggleBtnRef}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-zinc-100"
              aria-label="메뉴 열기/닫기"
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32"/></svg>
            </button>
            {/* 로고 */}
            <Link to="/" className="text-3xl font-extrabold tracking-tight text-zinc-900">
              <span className="text-emerald-500">DOLIGO</span>
            </Link>
          </div>

          {status === "authenticated" ? (
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-zinc-600">
                {user?.name}님 환영합니다!
              </p>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/signin"
                className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md px-3 py-1.5 transition-colors"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </header>
      
      {/* 본문: 좌측 사이드바 + 컨텐츠 */}
      <div className="flex">
        {/* 모바일 사이드바 */}
        {open && (
          <aside 
            id="mobile-drawer"
            ref={drawerRef}
            className="md:block w-50 shrink-0 h-[100dvh] sticky top-0"
          >
            <div className="pt-5">
              <Navbar />
            </div>
          </aside>
        )}

        {/* 데스크탑 사이드바 */}
        <aside className="hidden md:block w-50 shrink-0 h-[100dvh] sticky top-0">
          <div className="pt-5">
            <Navbar />
          </div>
        </aside>

        {/* 메인 영역 */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

        {/* 플로팅 + 버튼 */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
                    bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg 
                    flex items-center justify-center transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {isCreateModalOpen && (
        <ProtectedRoute>
          <LpCreateModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </ProtectedRoute>
      )}
    </div>
  );
};

export default RootLayout;