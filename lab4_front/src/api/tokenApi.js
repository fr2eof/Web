import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tokenApi = createApi({
    reducerPath: "tokenApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/lab4_back-1.0-SNAPSHOT/api/token",
    }),
    endpoints: (builder) => ({
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: "/refresh",
                method: "POST",
                body: { refreshToken },
            }),
        }),
        validateToken: builder.mutation({
            query: (token) => ({
                url: "/validate",
                method: "POST",
                body: { token },
            }),
        }),
    }),
});

export const { useRefreshTokenMutation, useValidateTokenMutation } = tokenApi;