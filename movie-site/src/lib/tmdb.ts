export type TmdbMovieSummary = {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
};

export type TmdbPaginatedResponse<TItem> = {
  page: number;
  results: TItem[];
  total_pages: number;
  total_results: number;
};

export type TmdbMovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  homepage: string | null;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

const TMDB_API_BASE = "https://api.themoviedb.org/3";

function getApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("Missing TMDB_API_KEY in environment variables");
  }
  return apiKey;
}

export async function tmdbFetch<TResponse>(path: string, query?: Record<string, string | number | boolean>): Promise<TResponse> {
  const apiKey = getApiKey();
  const url = new URL(`${TMDB_API_BASE}${path}`);
  url.searchParams.set("language", "en-US");
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, String(value));
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    // Next.js fetch caching: revalidate trending every 10 minutes by default
    next: { revalidate: 600 },
  } as RequestInit);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText} - ${text}`);
  }

  return (await res.json()) as TResponse;
}

export async function getTrendingMovies(page: number = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieSummary>>(`/trending/movie/week`, { page });
}

export async function searchMovies(query: string, page: number = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieSummary>>(`/search/movie`, { query, page, include_adult: false });
}

export async function getMovieDetails(id: string | number, includeVideos: boolean = true) {
  return tmdbFetch<TmdbMovieDetails>(`/movie/${id}`, includeVideos ? { append_to_response: "videos" } : undefined);
}

export function getImageUrl(path: string | null, size: "w92"|"w154"|"w185"|"w342"|"w500"|"w780"|"original" = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

