import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_key);
};

// Registering A User
const RegisterUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields (username, email, password)." });
        }

        const check = await UserModel.findOne({ email });
        if (check) {
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter a Valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Enter a Strong Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hash,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        // Setting the token in the cookie
        res.cookie("token", token, { maxAge: 5 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" });

        res.json({ success: true, message: "Account Created Successfully", userId: user._id });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error registering user" });
    }
};
// Logging a Register
const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = createToken(user._id);

        res.cookie("token", token, {maxAge:5*24*60*60*1000, httpOnly:true, sameSite:"strict"})

        res.json({ success: true, message: "Logged In Successfully", userId: user._id, token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const LogoutUser = (req,res)=>{
    try {
        res.status(200).cookie("token", "").json({success: true, message: "Logged Out Successfully"})
    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { LoginUser, RegisterUser , LogoutUser};
