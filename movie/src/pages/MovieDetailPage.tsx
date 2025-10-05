import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetail } from "../types/MovieDetail";
import { mapCredits } from "../utils/mapCredits";
import type { CreditsResponse, PersonInfo } from "../types/MovieDetail";
import { CrewCard } from "../components/CrewCard";
import axios from "axios";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU4YzE1M2Q4YWE3NTg3YTM2ZjZjNDEyYmYxYjJkYiIsIm5iZiI6MTc1OTMwMjQ2MC42NjMsInN1YiI6IjY4ZGNkMzNjMWRkM2FjMWMzNWJiMWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRrFaWC_OMP4AwW6aqBRmNUJdv4J1Ta-YulFGWBUwLQ",
};

type CreditsVM = { cast: PersonInfo[]; directors: PersonInfo[] };

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState<CreditsVM>({ cast: [], directors: [] });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const detail = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,    // 영화 상세 정보 api
          { headers }
        );
        const crewData = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,   // 감독/출연진 정보 api 
          { headers }
        );
        setDetail(detail.data);
        setCredits(mapCredits(crewData.data));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />
      </div>
    );

  if (!detail) return null;
  if (!credits) return null;

  return (
    <section>
      <section className="relative h-96">
        <img
          className="w-full h-full object-cover"
          src={detail.poster_path ? `https://image.tmdb.org/t/p/w500${detail.poster_path}` : undefined}
          loading="lazy"
        />
        <section
          className="
            absolute inset-y-0 left-0
            w-[50%]
            bg-gradient-to-r from-black via-black/80 to-transparent
            flex items-center
          "
        >
          <div className="w-[90%] max-w-[50%] flex flex-col gap-2 p-6 text-white">
            <h1 className="text-3xl font-bold">{detail.title}</h1>
            <span className="text-sm text-zinc-100">
              개봉: {detail.release_date || "미정"}
            </span>
            <span className="text-sm text-zinc-100">
              평점: {detail.vote_average?.toFixed?.(1) ?? "-"}
            </span>
            <span className="text-sm text-zinc-100">
              러닝타임: {detail.runtime ? `${detail.runtime}분` : "-"}
            </span>
            <p className="mt-2 text-sm text-zinc-100/90 line-clamp-10">
              {detail.overview || "설명이 없습니다."}
            </p>
          </div>
        </section>
      </section>
      <section>
        <h1 className="p-4 text-lg font-bold">감독</h1>
        <ul className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-10 gap-4 m-4">
          {credits.directors.map(p => (
            <CrewCard key={`director-${p.id}`} personInfo={p} />
          ))}
        </ul>
        <h1 className="p-4 text-lg font-bold">출연</h1>
        <ul className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-10 gap-4 m-4">
          {credits.cast.map(p => (
            <CrewCard key={`cast-${p.id}`} personInfo={p} />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default MovieDetailPage;