import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import type { MovieResponse, Category } from '../types/movie';
import axios from 'axios';
import { MovieCard } from "../components/MovieCard";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU4YzE1M2Q4YWE3NTg3YTM2ZjZjNDEyYmYxYjJkYiIsIm5iZiI6MTc1OTMwMjQ2MC42NjMsInN1YiI6IjY4ZGNkMzNjMWRkM2FjMWMzNWJiMWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRrFaWC_OMP4AwW6aqBRmNUJdv4J1Ta-YulFGWBUwLQ",
};

const MoviesPage = () => {
  const { category } = useParams<{ category: Category }>();
  const [movies, setMovies] = useState<MovieResponse>();
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null); // 에러 상태 
  const [loading, setLoading] = useState(false);           // 로딩 상태 

  // 카테고리 변경 -> 페이지 1 초기화
  useEffect(() => {
    setPage(1);
  }, [category]);

  // 카테고리/페이지 변경할 때마다 재요청 
  useEffect(() => {
    if (!category) return;

    (async () => {
      setLoading(true);
      setError(null);     // 요청 시작시 에러 초기화 
      try{
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          { headers }
        );
        setMovies({ ...data, total_pages: Math.min(data.total_pages, 100) }); // 상한 100
        setError(null);  // 성공하면 에러 상태 초기화 
      } catch(err){
        console.error("영화 데이터를 불러오는 중 오류 발생:", err);
        setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
        setMovies(undefined); 
      } finally {
        setLoading(false);
      }
    })();
  }, [category, page]);

  const totalPages = movies?.total_pages ?? 1;

  return (
    <section>
      <header>
        <h1 className="p-4 text-4xl text-center font-bold mb-4">{category} Movies</h1>
      </header>

      {/* 에러 UI */}
      {error && (
        <div className="text-center text-red-600 font-semibold my-4">
          {error}
        </div>
      )}

      {/* 로딩 UI */}
      {loading && (
        <div className="text-center text-gray-500 my-4">로딩 중...</div>
      )}

      <section className="flex items-center justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          이전
        </button>

        <p className="font-semibold select-none">
          {page} / {totalPages}
        </p>

        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          다음
        </button>
      </section>

      <ul className="grid grid-cols-3 lg:grid-cols-5 gap-4">
        {movies?.results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesPage;