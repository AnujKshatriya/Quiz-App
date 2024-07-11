import express from 'express'
import { configDotenv } from 'dotenv'

configDotenv()

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Quiz app")
})

app.listen(port,()=>{
    console.log("server is listening on port ", port)
})