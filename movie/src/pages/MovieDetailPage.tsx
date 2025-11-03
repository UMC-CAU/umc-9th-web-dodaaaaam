import { CrewCard } from "../components/CrewCard";
import FullPageSpinner from "../components/FullPageSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useMovie } from "../hooks/useMovie";

const MovieDetailPage = () => {
  const { detail, credits, loading, error } = useMovie();  //API 호출 훅 

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <FullPageSpinner />;
  if (!detail || !credits) return null;

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