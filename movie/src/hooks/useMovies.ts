import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieResponse, Category } from "../types/Movie";

const headers = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU4YzE1M2Q4YWE3NTg3YTM2ZjZjNDEyYmYxYjJkYiIsIm5iZiI6MTc1OTMwMjQ2MC42NjMsInN1YiI6IjY4ZGNkMzNjMWRkM2FjMWMzNWJiMWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRrFaWC_OMP4AwW6aqBRmNUJdv4J1Ta-YulFGWBUwLQ",
};

export function useMovies(category: Category | undefined, page: number) {
  const [movies, setMovies] = useState<MovieResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          { headers }
        );
        setMovies({ ...data, total_pages: Math.min(data.total_pages, 100) });
      } catch (err) {
        console.error("영화 데이터를 불러오는 중 오류:", err);
        setError("영화 데이터를 불러오는 중 오류가 발생했습니다.");
        setMovies(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, [category, page]);

  return { movies, loading, error };
}