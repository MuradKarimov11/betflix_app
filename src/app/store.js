import { configureStore } from "@reduxjs/toolkit";
import { currentQuerySlice } from "../features/currentQuerySlice";
import { kinopoiskApi } from "../services/kinopoiskApi";

export const store = configureStore({
    reducer: {
        [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
        currentQuery: currentQuerySlice
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(kinopoiskApi.middleware),
});