import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_key)
}

//Registering A User
const RegisterUser = async(req,res) =>{
    const {username,email,password} = req.body;

    try {
        check1 = UserModel.findOne({email})
        if(check1){
            return res.json({success:false, message:"User Already Exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a Valid email"})
        }

        if(password.length<8){
            return res.json({success:false, message:"Enter a Strong Password"})
        }

        //Hash Password
        const salt = await bcrypt.genSalt(2)
        const hash = await bcrypt.hash(password,salt)

        const newUser = new UserModel({
            name:username,
            email:email,
            password:hash
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

//Logging a Register
const LoginUser = async(req,res) =>{
    const {email,password} = req.body;

    try {
        check =await UserModel.findOne({email})
        if(!check){
            return res.json({success:false, message:"User Doesn't Exist"})
        }
        const checkpassword = await bcrypt.compare(password,user.password)
        if(!checkpassword){
            return res.json({success:false, message:"Invalid Credentials"})
            
        }
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {LoginUser, RegisterUser}
