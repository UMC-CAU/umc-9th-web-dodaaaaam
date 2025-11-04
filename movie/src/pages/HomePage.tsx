import MovieSection from "../components/MovieSection";

const HomePage = () => {
  return (
    <section className="m-4">
      <MovieSection category="popular" title="Popular Movies" />
      <MovieSection category="now_playing" title="Now Playing Movies" />
      <MovieSection category="top_rated" title="Top-Rated Movies" />
      <MovieSection category="upcoming" title="Upcoming Movies" />
    </section>
  )
};

export default HomePage;