import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/lib/tmdb";

export default async function Home() {
  let movies: Awaited<ReturnType<typeof getTrendingMovies>> | null = null;
  try {
    movies = await getTrendingMovies(1);
  } catch (e) {
    movies = null;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Trenddagi kinolar</h1>
      {movies?.results?.length ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {movies.results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </ul>
      ) : (
        <p className="opacity-70">Maʼlumot yoʻq. Iltimos TMDB tokenini sozlang.</p>
      )}
    </div>
  );
}
