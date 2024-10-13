import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'

import { app, server } from './socket/socket.js'
import { connectDb } from './config/database.js'

import UserRouter from "./route/userRoute.js"
import QuizRouter from './route/quizRoute.js'
import LeaderboardRouter from './route/leaderboardRoute.js'

import cookieParser from 'cookie-parser'

configDotenv()

const port = process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))


//Api Routes
app.use("/api/user",UserRouter)
app.use("/api/quiz",QuizRouter)
app.use("/api/leaderboard",LeaderboardRouter)

server.listen(port,()=>{
    connectDb()
    console.log("server is listening on port ", port)
})