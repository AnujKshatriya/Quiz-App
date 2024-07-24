import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import quizSlice from './quizSlice.js';

const store = configureStore({
    reducer : {
        user : userSlice,
        quiz : quizSlice
    }
})

export default store