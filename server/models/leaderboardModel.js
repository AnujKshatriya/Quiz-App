import mongoose from "mongoose";

const leaderboardSchema = mongoose.Schema({
    quizInfo : 
    {   
        type : mongoose.Schema.Types.ObjectId,
        ref : "quiz",
        required : true,
    },
    participants : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user",
                required : true 
            },
            score : {
                type : Number,
                required : true
            },
            time : {
                type : Number,
                required : true
            }
        }
    ]
})

const LeaderboardModel = mongoose.model("leaderboard", leaderboardSchema)

export default LeaderboardModel