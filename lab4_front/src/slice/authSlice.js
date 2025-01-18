import {createSlice} from "@reduxjs/toolkit";

const loadInitialState = () => {
    return {
        userId: localStorage.getItem("userId") || null,
        accessToken: localStorage.getItem("accessToken") || null,
        refreshToken: localStorage.getItem("refreshToken") || null,
    };
};

const authSlice = createSlice({
    name: "auth",
    initialState: loadInitialState(),
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            localStorage.setItem("accessToken", action.payload);
        },
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.userId = null;
            localStorage.removeItem("username")
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userId");
        },
        loginSuccess: (state, action) => {
            const {userId, username, accessToken, refreshToken} = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.userId = userId;
            localStorage.setItem("username", username)
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userId", userId);
        },
    },
});

export const {
    setAccessToken,
    logout,
    loginSuccess,
} = authSlice.actions;

export default authSlice.reducer;