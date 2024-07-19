import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    name : 
    {
        type : String,
        required : true
    },
    owner : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    questions : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "question",
            required : true
        }]
    },
    leaderboard :
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "leaderboard"
    }

})

const QuizModel = mongoose.model("quiz",quizSchema)

export default QuizModel;