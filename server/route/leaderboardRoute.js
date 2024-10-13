import express from "express";
import { SettingUserAndQuiz } from "../controllers/leaderboardController.js";

const LeaderboardRouter = express.Router();

LeaderboardRouter.post("/set-userANDquiz",SettingUserAndQuiz)

export default LeaderboardRouter;