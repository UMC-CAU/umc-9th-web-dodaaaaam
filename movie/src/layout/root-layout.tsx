import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <div className="bg-black text-white">
      <header className="flex items-center justify-between px-6 py-4">
        <Navbar />
        <nav className="flex gap-6 p-4">
          <Link to="/login" className="hover:text-gray-300">
            로그인
          </Link>
          <Link to="/signUp" className="hover:text-gray-300">
            회원가입
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default RootLayout;