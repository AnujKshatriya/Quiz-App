import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import UserModel from '../models/userModel.js'
import QuizModel from '../models/quizModel.js'
import LeaderboardModel from '../models/leaderboardModel.js'
import { addToLeaderboard, getLeaderboard } from '../redis/roomLeaderboard.js'

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin : "http://localhost:5173/",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{

    socket.on('joinRoom', async ({joinedQuizId,authUser})=>{
        socket.join(joinedQuizId)

        // get the username of the user who joined the room
        try {
            const user = await UserModel.findOne({_id : authUser})
            if(user){
                io.to(joinedQuizId).emit('message', `${user.username} has joined the quiz`)
            }
            else{
                socket.emit('error', 'An error occurred while fetching the USER data');
            }
        } catch (error) {
            socket.emit('error', 'An error occurred while fetching the USER data');
        }
        
        //fetch the data from database and send it to user
        try {
            const quizQuestions = await QuizModel.findById(joinedQuizId).populate('questions').exec();
            if(quizQuestions){
                socket.emit('getQuizQuestions', quizQuestions.questions)
            }
            else{
                socket.emit('error', 'An error occurred while fetching the QUIZ data');
            }
        } catch (error) {
            socket.emit('error', 'An error occurred while fetching the QUIZ data');
        }

    })

    socket.on('updateScore', async ({ joinedQuizId, authUser, score, time }) => {
        try {
          
          // Update MongoDB leaderboard
          const user  = await UserModel.findById(authUser);
          const username = user.username;

          const result = await LeaderboardModel.findOneAndUpdate(
            { quizInfo: joinedQuizId },
            { $push: { participants: { userId: authUser, username, score, time } } },
            { upsert: true, new: true }
          );
      
          // Continue with Redis and the rest of the process
          await addToLeaderboard(joinedQuizId, username, score, time);
      
          const leaderboard = await getLeaderboard(joinedQuizId);
      
          io.to(joinedQuizId).emit('updateRankings', leaderboard);
        } 
        catch (error) {
          console.log("Error updating leaderboard:", error);
          socket.emit('error', 'An error occurred while updating the leaderboard');
        }
      });
      
})

export {app,server,io}