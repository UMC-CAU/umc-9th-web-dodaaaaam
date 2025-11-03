import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import type { Category } from '../types/Movie';
import { MovieCard } from "../components/MovieCard";
import ErrorMessage from '../components/ErrorMessage';
import FullPageSpinner from '../components/FullPageSpinner';

const MoviesPage = () => {
  const { category } = useParams<{ category: Category }>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);    // 카테고리 변경시 페이지 1로 초기화 

  const { movies, loading, error } = useMovies(category, page);  //API 호출 훅 
  const totalPages = movies?.total_pages ?? 1;

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <FullPageSpinner />;

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
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