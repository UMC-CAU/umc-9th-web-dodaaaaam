import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import type { Category } from '../types/movie';
import { MovieCard } from "../components/MovieCard";

const MoviesPage = () => {
  const { category } = useParams<{ category: Category }>();
  const [page, setPage] = useState(1);

  // 카테고리 변경 -> 페이지 1 초기화
  useEffect(() => {
    setPage(1);
  }, [category]);

  const { movies, loading, error } = useMovies(category, page);
  
  const totalPages = movies?.total_pages ?? 1;

  if (error){
    return (
      <div className="text-center text-red-600 font-semibold my-4">
          {error}
      </div>
    )

  }
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <section>
      <section className="flex items-center justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40 text-black"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          이전
        </button>

        <p className="font-semibold select-none">
          {page} / {totalPages}
        </p>

        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40 text-black"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          다음
        </button>
      </section>

      <ul className="grid grid-cols-3 lg:grid-cols-5 gap-4 m-4">
        {movies?.results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesPage;