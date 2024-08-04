
import { combineReducers } from "@reduxjs/toolkit";
import { userReducer, loginReducer } from "./userSlice"; // Adjust the path as necessary
import quizReducer from "./quizSlice"; // Import other reducers if needed

// Combine reducers here
const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
    quiz: quizReducer,
});

export default rootReducer;
