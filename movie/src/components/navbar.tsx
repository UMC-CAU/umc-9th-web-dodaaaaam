import { Link, useLocation } from 'react-router-dom';
import type { Category } from "../types/movie";

const cats: Category[] = ["popular", "now_playing", "top_rated", "upcoming"];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex justify-start gap-2 p-4">
      <Link
        to="/"
        className={`px-3 py-1 rounded transition ${
          pathname === "/"
            ? "text-black font-bold"
            : "text-black font-thin"
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
              ${active ? "text-black font-bold" : "text-black font-thin"}`}
          >
            {c.replace("_", " ")}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;