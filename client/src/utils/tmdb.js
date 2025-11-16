const TMDB_API_KEY = "f339964017addc7d6b492a465c7bab63"; // <-- Replace with your TMDb API key

export async function getTmdbPosterUrl(tmdbId) {
  if (!tmdbId) return null;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    if (data.poster_path) {
      return `https://image.tmdb.org/t/p/w342${data.poster_path}`;
    }
  } catch {
    // do nothing
  }
  return null;
}
