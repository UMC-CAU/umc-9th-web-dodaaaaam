import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-zinc-900 via-black to-zinc-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <header className="mb-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span>
              Home Page
            </span>
          </h1>
        </header>
        <main className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-stretch gap-4">
            <Link
              to="/login"
              className="group flex-1 rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:bg-white/20 transition-all px-5 py-4 flex items-center justify-center gap-2"
            >
              <LogIn className="size-5 opacity-80 group-hover:opacity-100" />
              <span className="font-semibold">로그인</span>
            </Link>

            <Link
              to="/signUp"
              className="group flex-1 rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:bg-white/20 transition-all px-5 py-4 flex items-center justify-center gap-2"
            >
              <UserPlus className="size-5 opacity-80 group-hover:opacity-100" />
              <span className="font-semibold">회원가입</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
