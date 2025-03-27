const API_URL_MOVIES_LISTS = 'https://api.themoviedb.org/3/movie';
const API_URL_MOVIES_GENRE = 'https://api.themoviedb.org/3/genre';
const API_URL_TRENDING = 'https://api.themoviedb.org/3/trending';
const API_URL_DISCOVER = 'https://api.themoviedb.org/3/discover';
const API_KEY = process.env.VUE_APP_TMDB_KEY; // Отримуємо ключ з .env

const API_HEADERS = {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`
};

async function fetchMovies(endpoint) {
  try {
    const response = await fetch(`${API_URL_MOVIES_LISTS}/${endpoint}?language=en-US&page=1`, {
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

async function fetchTrending(endpoint) {
  try {
    const response = await fetch(`${API_URL_TRENDING}/${endpoint}/day?language=en-US`, {
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

async function fetchGenreMovies(endpoint) {
  try {
    const response = await fetch(`${API_URL_MOVIES_GENRE}/${endpoint}/list?language=en`, {
      method: 'GET',
      headers: API_HEADERS
    });
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Помилка при отриманні фільмів:', error);
    throw new Error('Не вдалося завантажити фільми');
  }
}

async function fetchDiscoverMovies(endpoint, genresList) {
  console.log('test', genresList);
  
  try {
    const response = await fetch(`${API_URL_DISCOVER}/${endpoint}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`, {
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

export function getNowPlayingMovies() {
  return fetchMovies('now_playing');
}

export function getPopularMovies() {
  return fetchMovies('popular');
}

export function getTopRated() {
  return fetchMovies('top_rated');
}

export function getUpcomingMovies() {
  return fetchMovies('upcoming');
}

export function getTrendingMovies() {
  return fetchTrending('movie')
}

export function getGenreMovies() {
  return fetchGenreMovies('movie')
}

export function getDiscoverMovies(genresList) {
  return fetchDiscoverMovies('movie', genresList)
}