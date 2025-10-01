import { useEffect, useState } from "react";
import type { Movie, MovieResponse } from "../types/movie";

export type Category = "popular" | "now_playing" | "top_rated" | "upcoming";

export function useMovies(category: Category, page = 1) {
  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const url = new URL(`https://api.themoviedb.org/3/movie/${category}`);
    url.searchParams.set("language", "ko-KR");
    url.searchParams.set("region", "KR");
    url.searchParams.set("page", String(page));

    fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // .env.local에 저장
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json: MovieResponse) => setData(json?.results ?? []))
      .catch(() => {
        setData([]);
      });

    return () => controller.abort();
  }, [category, page]);

  return data; // Movie[]만 반환
}
