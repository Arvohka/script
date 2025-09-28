import MovieCard from "@/components/MovieCard";
import { searchMovies } from "@/lib/tmdb";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const data = query ? await searchMovies(query, 1) : null;
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Qidiruv</h1>
      {!query ? (
        <p className="opacity-70">Soʻrov kiriting va izlang.</p>
      ) : data?.results?.length ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {data.results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </ul>
      ) : (
        <p className="opacity-70">Natija topilmadi.</p>
      )}
    </div>
  );
}

