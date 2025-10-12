import { Link } from "react-router-dom";
import type { Movie } from "../types/Movie";
import { memo } from "react";
import noImage from "../assets/no-image.png";

type Props = { movie: Movie };

function MovieCardBase({ movie }: Props) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = movie.poster_path
      ? `${baseUrl}${movie.poster_path}`
      : noImage; // 대체 이미지

  return (
    // hover를 위해 그룹으로 묶기 
    <li className="group relative overflow-hidden rounded-xl bg-zinc-900 shadow transition hover:shadow-lg">
      <Link to={`/movie/${movie.id}`} className="block w-full h-full">
        {/** 포스터: 호버 시 블러 + 살짝 확대 */}
        <img
          className="w-full h-full object-cover transition duration-300 group-hover:blur-sm group-hover:scale-105"
          src={posterUrl}
          alt={movie.title}
          width={200}
          height={300}
          loading="lazy"
        />
        {/** 오버레이 : 기본은 투명, 호버시 나타남 */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            grid content-end
            bg-gradient-to-t from-black/70 via-black/30 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            p-3
          "
        >
          <h3 className="text-white text-lg font-bold leading-tight">
            {movie.title}
          </h3>
          <div className="mt-1 text-xs text-zinc-200/90 flex gap-3">
            <span>개봉: {movie.release_date || "미정"}</span>
            <span>평점: {movie.vote_average?.toFixed?.(1) ?? "-"}</span>
          </div>
          <p className="mt-2 text-sm text-zinc-100/90 line-clamp-3">
            {movie.overview || "설명이 없습니다."}
          </p>
        </div>
      </ Link>
    </li>
  );
}

// 같은 props면 재렌더 줄이기 (옵션)
export const MovieCard = memo(MovieCardBase);