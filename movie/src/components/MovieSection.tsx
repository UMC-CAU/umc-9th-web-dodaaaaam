import { Link } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { MovieCard } from "./MovieCard";
import type { Category } from "../types/Movie";
import FullPageSpinner from "./FullPageSpinner";
import ErrorMessage from "./ErrorMessage";

type Props = {
  category: Category;
  title: string;
};

export default function MovieSection({ category, title }: Props) {
  const { movies, loading, error } = useMovies(category, 1);
  let description = "";

  switch (category) {
    case "popular":
      description = "현재 인기있는 영화입니다. ";
      break;
    case "now_playing":
      description = "현재 상영 중인 영화입니다. ";
      break;
    case "top_rated":
      description = "평점이 높은 영화입니다.";
      break;
    case "upcoming":
      description = "개봉 예정인 영화입니다. ";
      break;
    default: 
      description = "";
  }

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <FullPageSpinner />;

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <header className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-gray-300">{description}</p>
        </div>
        <Link
          to={`/movies/${category}`}
          className="rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-100 active:scale-[.98] dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          더보기
        </Link>
      </header>
      <ul className="flex gap-4"> 
        {movies?.results.slice(0, 5).map((m) => ( 
          <MovieCard key={m.id} movie={m} /> ))} 
      </ul>
    </section>
  );
}
