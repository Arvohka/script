import Image from "next/image";
import { getImageUrl, getMovieDetails } from "@/lib/tmdb";

type Props = { params: Promise<{ id: string }> };

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieDetails(id, true);
  const poster = getImageUrl(movie.poster_path, "w500");
  const backdrop = getImageUrl(movie.backdrop_path, "w780");
  return (
    <div>
      {backdrop && (
        <div className="mb-6 -mx-4 md:mx-0 overflow-hidden rounded-md border border-white/10">
          <Image src={backdrop} alt={movie.title} width={780} height={439} className="w-full h-auto" />
        </div>
      )}
      <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">
        {poster && (
          <Image src={poster} alt={movie.title} width={500} height={750} className="w-full h-auto rounded-md border border-white/10" />
        )}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{movie.title}</h1>
          <div className="text-sm opacity-80 mb-4">
            {movie.release_date} • {movie.runtime ? `${movie.runtime} min` : "Nomaʼlum"}
          </div>
          <p className="mb-4 opacity-90 leading-relaxed">{movie.overview}</p>
          {movie.genres?.length ? (
            <div className="mb-4 text-sm">Janrlar: {movie.genres.map((g) => g.name).join(", ")}</div>
          ) : null}
          {movie.videos?.results?.length ? (
            <div>
              <h2 className="text-lg font-medium mb-2">Treyler</h2>
              {movie.videos.results.filter(v => v.site === "YouTube" && v.type === "Trailer").slice(0, 1).map(v => (
                <div key={v.key} className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-md border border-white/10"
                    src={`https://www.youtube.com/embed/${v.key}`}
                    title={v.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

