import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import genresSlice from "../features/genresSlice";
import moviesSlice from "../features/moviesSlice";


export const store = configureStore({
    reducer: {
        genres: genresSlice,
        movies: moviesSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;