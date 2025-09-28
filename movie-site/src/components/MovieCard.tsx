import Image from "next/image";
import Link from "next/link";
import { getImageUrl, type TmdbMovieSummary } from "@/lib/tmdb";

type Props = {
  movie: TmdbMovieSummary;
};

export default function MovieCard({ movie }: Props) {
  const poster = getImageUrl(movie.poster_path, "w342");
  return (
    <li className="rounded overflow-hidden bg-white/5 border border-white/10">
      <Link href={`/movie/${movie.id}`} className="block">
        {poster ? (
          <Image src={poster} alt={movie.title} width={342} height={513} className="w-full h-auto" />
        ) : (
          <div className="aspect-[2/3] flex items-center justify-center text-sm opacity-70">No image</div>
        )}
        <div className="p-2">
          <p className="text-sm line-clamp-2">{movie.title}</p>
        </div>
      </Link>
    </li>
  );
}

