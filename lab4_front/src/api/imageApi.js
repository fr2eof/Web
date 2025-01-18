import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth"; 
import { useRefreshToken } from "../hook/useRefreshToken"; 

const baseQueryWithReauth = createBaseQueryWithReauth(useRefreshToken);


export const imagesApi = createApi({
    reducerPath: "imagesApi",
    baseQuery: baseQueryWithReauth, 
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (file) => {
                const formData = new FormData();
                formData.append("file", file);
                return {
                    url: `/upload`,
                    method: "POST",
                    body: formData,
                };
            },
        }),
        getImage: builder.query({
            query: (imagePath) => ({
                url: `/${imagePath}`,
                responseHandler: (response) => response.blob(),
            }),
        }),
        deleteImage: builder.mutation({
            query: (imagePath) => ({
                url: `/${imagePath}`,
                method: "DELETE",
            }),
        }),
    }),
});


export const { useUploadImageMutation, useGetImageQuery, useDeleteImageMutation } = imagesApi;