import { createSlice, combineReducers } from "@reduxjs/toolkit";

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

const rootReducer = combineReducers({
    user: userSlice.reducer,
    login: loginSlice.reducer,
});

export default rootReducer;
