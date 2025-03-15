const API_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = process.env.VUE_APP_TMDB_KEY; // Отримуємо ключ з .env

const API_HEADERS = {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
};

async function fetchMovies(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}?language=en-US&page=1`, {
      method: 'GET',
      headers: API_HEADERS
    });
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Помилка при отриманні фільмів:', error);
    throw new Error('Не вдалося завантажити фільми');
  }
}

export function getPopularMovies() {
  return fetchMovies('popular');
}

export function getNowPlayingMovies() {
  return fetchMovies('now_playing');
}

export function getUpcomingMovies() {
  return fetchMovies('upcoming');
}
