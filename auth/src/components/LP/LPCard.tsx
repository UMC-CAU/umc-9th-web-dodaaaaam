import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { LP } from "../../types/LpDto";

type LPCardProps = {
  lp: LP;
};

const LPCard = ({ lp }: LPCardProps) => {
  return (
    <Link
      to={`/lps/${lp.id}`}
      className="group block w-full max-w-[200px] relative"
    >
      {/* 썸네일 */}
      <div
        className="
          relative overflow-hidden rounded-lg shadow-md aspect-square 
          transform transition-transform duration-300 ease-in-out
          group-hover:scale-105
        "
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />
        {/* 오버레이 (hover 시 표시) */}
        <div
          className="
            absolute inset-0
            bg-black/50 
            opacity-0 
            group-hover:opacity-100
            transition-opacity 
            duration-300
            flex flex-col justify-center items-center
            text-center text-white p-3
          "
        >
          <h3 className="text-sm font-semibold mb-1">{lp.title}</h3>
          <p className="text-xs mb-2">
            {lp.tags?.map((tag) => `#${tag.name}`).join(" ")}
          </p>
          <p className="flex items-center gap-1 text-rose-400 text-sm">
            <Heart size={14} fill="currentColor" />
            {lp.likes?.length ?? 0}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LPCard;