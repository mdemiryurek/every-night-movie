import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { Genre } from "../types/Genre";

interface GenreState {
    data: Genre[] | null;
    loading: boolean;
    error: string;
}

const initialState: GenreState = {
    data: null,
    loading: false,
    error: ''
};

export const fetchPopularGenres = createAsyncThunk('fetchPopularGenres', async() => {
    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list'
    }
    options.params = { 'api_key': process.env.REACT_APP_MOVIE_DB_API_KEY}

    const response = await axios.request(options);
    return response.data.genres;
})

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPopularGenres.pending, (state) => {
            state.loading = true;
            state.error = ''
        });
        builder.addCase(fetchPopularGenres.fulfilled, (state, action: PayloadAction<[]>) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPopularGenres.rejected, (state) => {
            state.loading = false;
            state.error = 'Error fetching genres data!';
        });
    }
})

export default genresSlice.reducer;