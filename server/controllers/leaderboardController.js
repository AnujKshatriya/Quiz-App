import QuizModel from "../models/quizModel.js";
import UserModel from "../models/userModel.js";
import { getLeaderboard } from "../redis/roomLeaderboard.js";

const SettingUserAndQuiz = async (req, res) => {
    const { userId, quizId } = req.body;
    const session = await UserModel.startSession();

    try {
        session.startTransaction();
        // Add user to the quiz's participants array
        await QuizModel.findByIdAndUpdate(
            quizId,
            { $addToSet: { participants: userId } },
            { new: true, upsert: true, session }
        );

        // Add quiz to the user's joined quizzes array
        await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { quizJoined: quizId } },
            { new: true, upsert: true, session }
        );

        // Commit transaction if both operations are successful
        await session.commitTransaction();
        session.endSession();

        res.json({ success: true, message: "User and Quiz added successfully" });
    } catch (error) {
        // Rollback transaction if any operation fails
        await session.abortTransaction();
        session.endSession();

        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getQuizLeaderboard = async (req,res)=>{
    const {quizId} = req.body;
    try {
        const leaderboard = await getLeaderboard(quizId);
        if(!leaderboard){
            res.json({ success: false, message: "Failed to send leaderboard data" });
        }
        res.json({success: true, leaderboard})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export {SettingUserAndQuiz, getQuizLeaderboard}