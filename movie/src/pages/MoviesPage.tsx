import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import { MovieCard } from "../components/MovieCard";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzU4YzE1M2Q4YWE3NTg3YTM2ZjZjNDEyYmYxYjJkYiIsIm5iZiI6MTc1OTMwMjQ2MC42NjMsInN1YiI6IjY4ZGNkMzNjMWRkM2FjMWMzNWJiMWFiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YRrFaWC_OMP4AwW6aqBRmNUJdv4J1Ta-YulFGWBUwLQ`, 
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <section>
      <header>
        <h1 className="p-4 text-4xl text-center font-bold mb-1">Movie Page</h1>
      </header>
      <ul className="grid grid-cols-3 lg:grid-cols-5">
        {movies?.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesPage;