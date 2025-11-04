import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/authStore';
import { signout } from '../apis/auth'

const RootLayout = () => {
  const status = useAuthStore((s) => s.status)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();             // 서버 쿠키 삭제 + Zustand 초기화
    navigate("/");               // 홈으로 이동
  };

  return (
    <div className="bg-white text-white">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-zinc-900">
            <span className="text-emerald-500">WEB</span>TOON
          </Link>
          <nav className="text-zinc-400 hidden sm:flex gap-2 text-sm">
            <span>|</span>
            <span>웹소설</span>
            <span>|</span>
            <span>시리즈</span>
          </nav>
        </div>

        {status === "authenticated" ? (
          <div className="flex items-center gap-4">
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
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;