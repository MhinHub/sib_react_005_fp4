const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

async function getCategories() {
    const data = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getNowPlaying() {
    const data = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getPopular() {
    const data = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getTopRated() {
    const data = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getUpcoming() {
    const data = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getDetailMovie(idm: number) {
    const data = await fetch(`${BASE_URL}/movie/${idm}?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getVideoTrailer(idm: number) {
    const data = await fetch(`${BASE_URL}/movie/${idm}/videos?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getSimilarMovies(idm: number) {
    const data = await fetch(`${BASE_URL}/movie/${idm}/similar?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getCategoryMovies(idc: number, page = 1) {
    const data = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${idc}&page=${page}&sort_by=popularity.desc&include_adult=false`).then(res => res.json())
    return data
}

async function getTrendingMovies(param: string, page = 1) {
    const data = await fetch(`${BASE_URL}/trending/movie/${param}?api_key=${API_KEY}&page=${page}`).then(res => res.json())
    return data
}

async function getMovies(param: string, page = 1) {
    const data = await fetch(`${BASE_URL}/movie/${param}?api_key=${API_KEY}&page=${page}`).then(res => res.json())
    return data
}

async function getResultMovies(query: string) {
    const data = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`).then(res => res.json())
    return data
}

async function getCredits(idm: number) {
    const data = await fetch(`${BASE_URL}/movie/${idm}/credits?api_key=${API_KEY}`).then(res => res.json())
    return data
}

async function getReviews(idm: number) {
    const data = await fetch(`${BASE_URL}/movie/${idm}/reviews?api_key=${API_KEY}`).then(res => res.json())
    return data
}

export default {
    getCategories,
    getNowPlaying,
    getPopular,
    getTopRated,
    getUpcoming,
    getDetailMovie,
    getVideoTrailer,
    getSimilarMovies,
    getCategoryMovies,
    getTrendingMovies,
    getMovies,
    getResultMovies,
    getCredits,
    getReviews
}