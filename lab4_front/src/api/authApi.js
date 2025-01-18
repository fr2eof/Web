import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";
import { useRefreshToken } from "../hook/useRefreshToken"; 

export const createAuthApi = (refreshTokenFn) => {
    const baseQueryWithReauth = createBaseQueryWithReauth(refreshTokenFn);

    return createApi({
        reducerPath: "authApi",
        baseQuery: baseQueryWithReauth,
        endpoints: (builder) => ({
            loginUser: builder.mutation({
                query: (user) => ({
                    url: `/auth/login`,
                    method: "POST",
                    body: user,
                }),
            }),
            signupUser: builder.mutation({
                query: (user) => ({
                    url: `/auth/signup`,
                    method: "POST",
                    body: user,
                }),
            }),
            logoutUser: builder.mutation({
                query: (user) => ({
                    url: `/auth/logout`,
                    method: "POST",
                    body: user,
                }),
                responseHandler: (response) => response.text(),
            }),
        }),
    });
};


export const authApi = createAuthApi(useRefreshToken);

export const { useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation } = authApi;