import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import { app, server } from './socket/socket.js'
import { connectDb } from './config/database.js'
configDotenv()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}))
app.get('/',(req,res)=>{
    res.send("Quiz app")
})

server.listen(port,()=>{
    connectDb()
    console.log("server is listening on port ", port)
})