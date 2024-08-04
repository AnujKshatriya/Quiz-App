// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Check for a token in localStorage to initialize the isLogin state
const token = localStorage.getItem('token');

const userSlice = createSlice({
    name: "user",
    initialState: {
        authUser: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        }
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: !!token // Initialize based on the presence of a token
    },
    reducers: {
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        }
    }
});

export const { setAuthUser } = userSlice.actions;
export const { setIsLogin } = loginSlice.actions;

// Export each slice's reducer separately
export const userReducer = userSlice.reducer;
export const loginReducer = loginSlice.reducer;
