import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Db connected succesfully")
    } catch (error) {
        console.log(error)
    }
}

export {connectDb}
    

