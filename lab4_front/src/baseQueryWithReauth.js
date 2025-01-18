import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {logout, setAccessToken} from "./slice/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/lab4_back-1.0-SNAPSHOT/api",
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const createBaseQueryWithReauth = (refreshTokenFn) => {
    return async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error?.originalStatus === 401) {
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const refreshResult = await refreshTokenFn(refreshToken);

                    if (refreshResult?.accessToken) {
                        localStorage.setItem("accessToken", refreshResult.accessToken);

                        api.dispatch(setAccessToken(refreshResult.accessToken));

                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(logout());
                    }
                } catch (error) {
                    api.dispatch(logout());
                }
            } else {
                api.dispatch(logout());
            }
        }

        return result;
    };
};