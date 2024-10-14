import express from "express";
import { LoginUser, RegisterUser, LogoutUser, getAllQuizGiven } from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/register", RegisterUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/logout", LogoutUser);

UserRouter.post("/getAllQuizId", getAllQuizGiven);

export default UserRouter;
