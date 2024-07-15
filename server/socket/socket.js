import express from 'express'
import {Server} from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin : "http://localhost:5173/",
        methods : ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log("user connected", socket.id)


    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id)
    })
})

export {app,server,io}