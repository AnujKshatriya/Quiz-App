import express from "express";
import { getQuizLeaderboard, SettingUserAndQuiz } from "../controllers/leaderboardController.js";

const LeaderboardRouter = express.Router();

LeaderboardRouter.post("/set-userANDquiz",SettingUserAndQuiz);
LeaderboardRouter.post("/get-quizLeaderboard", getQuizLeaderboard);

export default LeaderboardRouter;