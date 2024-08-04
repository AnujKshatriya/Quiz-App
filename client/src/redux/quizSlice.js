import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
    name : "quiz",
    initialState : {
        joinedQuizId : null,
        joinedQuizQuestions : null,
        quizError : null
    },
    reducers : {
        setJoinedQuizId : (state, action)=>{
            state.joinedQuizId = action.payload
        },
        
        setJoinedQuizQuestions : (state,action)=>{
            state.joinedQuizQuestions = action.payload
        },
        setQuizError : (state,action)=>{
            state.quizError = action.payload
        }
    }
})

export const {setJoinedQuizId, setJoinedQuizQuestions, setQuizError} = quizSlice.actions
export default quizSlice.reducer