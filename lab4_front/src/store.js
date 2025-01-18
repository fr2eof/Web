import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./api/authApi";
import {tokenApi} from "./api/tokenApi";
import authReducer from "./slice/authSlice";
import {imagesApi} from "./api/imageApi.js";
import {pointsApi} from "./api/pointsApi.js";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [tokenApi.reducerPath]: tokenApi.reducer,
        [imagesApi.reducerPath]: imagesApi.reducer,
        [pointsApi.reducerPath]: pointsApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(tokenApi.middleware)
            .concat(imagesApi.middleware)
            .concat(pointsApi.middleware)
});

export default store;