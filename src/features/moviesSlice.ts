import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { Movie } from "../types/Movie";

interface PayloadResult {
    responseData: [];
    category: string;
}

interface MovieState {
    comingSoonMovies: Movie[];
    topRatedMovies: Movie[];
    mostPopularMovies: Movie[];
    loading: boolean;
    error: string;
}

const initialState: MovieState = {
    comingSoonMovies: [],
    topRatedMovies: [],
    mostPopularMovies: [],
    loading: false,
    error: ''
}

export const fetchMovies = createAsyncThunk('fetchMovies', async(category: string) => {
    let apiURL = '';
    switch(category) {
        case 'COMING':
            apiURL = 'https://api.themoviedb.org/3/movie/upcoming';
            break;
        case 'RATED':
            apiURL = 'https://api.themoviedb.org/3/movie/top_rated';
            break;
        case 'POPULAR':
            apiURL = 'https://api.themoviedb.org/3/movie/popular';
            break;
        default:
            break;
    }
    const options: AxiosRequestConfig = {
        method: 'GET',
        url: apiURL
    }
    options.params = { 'api_key': process.env.REACT_APP_MOVIE_DB_API_KEY}

    const response = await axios.request(options);
    const result: PayloadResult = { category: category, responseData: response.data.results}
    return result;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true;
            state.error = ''
        });
        builder.addCase(fetchMovies.fulfilled, (state, action: PayloadAction<PayloadResult>) => {
            switch(action.payload.category) {
                case 'COMING':
                    state.comingSoonMovies = action.payload.responseData;
                    break;
                case 'RATED':
                    state.topRatedMovies = action.payload.responseData;
                    break;
                case 'POPULAR':
                    state.mostPopularMovies = action.payload.responseData;
                    break;
                default:
                    break;
            }
            state.loading = false;
        });
    }
})

export default moviesSlice.reducer;