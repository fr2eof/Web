import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth"; 
import { useRefreshToken } from "../hook/useRefreshToken"; 

const baseQueryWithReauth = createBaseQueryWithReauth(useRefreshToken);

export const pointsApi = createApi({
    reducerPath: "pointsApi",
    baseQuery: baseQueryWithReauth, 
    endpoints: (builder) => ({
        
        addUserPoint: builder.mutation({
            query: (point) => ({
                url: `/point/add`,
                method: "POST",
                body: point, 
            }),
        }),

        getAllUserPoints: builder.query({
            query: (userId) => ({
                url: `/point/all/${userId}`,
                method: "GET",
            }),
        }),

        
        deleteAllUserPoints: builder.mutation({
            query: (userId) => ({
                url: `/point/delete/${userId}`,
                method: "DELETE",
            }),
        }),

        
        getPartUserPoints: builder.query({
            query: ({ userId, page = 0, size = 10 }) => ({
                url: `/point/part/${userId}`,
                method: "GET",
                params: { page, size }, 
            }),
        }),
    }),
});

export const {
    useAddUserPointMutation,
    useGetAllUserPointsQuery,
    useDeleteAllUserPointsMutation,
    useGetPartUserPointsQuery,
} = pointsApi;