import { Link, useLocation } from 'react-router-dom';
import type { Category } from "../types/movie";

const cats: Category[] = ["popular", "now_playing", "top_rated", "upcoming"];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-center gap-2 p-4">
      <Link
        to="/"
        className={`px-3 py-1 rounded transition ${
          pathname === "/"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Home
      </Link>
      {cats.map((c) => {
        const to = `/movies/${c}`;
        const active = pathname.startsWith(to); // 활성 탭 판단
        return (
          <Link
            key={c}
            to={to}
            className={`px-3 py-1 rounded capitalize transition
              ${active ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            {c.replace("_", " ")}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;