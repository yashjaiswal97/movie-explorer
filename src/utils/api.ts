import axios from "axios";

const API_KEY = "5941163f63c495835215f3402295dc9f";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
    baseURL : BASE_URL,
    params:{
        api_key: API_KEY,
        language:"en-US"
    },
});

export const fetchPopularMovies = () => api.get("/movie/top_rated");
export const searchMovies = (query: string) =>
    api.get("/search/movie", { params: { query } });

export const getMovieDetails = (id: number) =>
    api.get(`/movie/${id}`, { params: { append_to_response: "videos,credits" } });