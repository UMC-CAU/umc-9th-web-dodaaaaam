import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/", label: "홈" },
  { to: "/search", label: "검색" },
  { to: "/myPage", label: "마이페이지" },
];

const Navbar = () => {
  return (
    <nav className="max-w-6xl mx-auto py-5">
      <ul className="flex flex-col items-left gap-1 overflow-x-auto no-scrollbar">
        {tabs.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                [
                  "relative block px-4 py-3 rounded-md text-sm font-semibold transition-colors",
                  isActive
                    ? "text-white bg-emerald-500"
                    : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;