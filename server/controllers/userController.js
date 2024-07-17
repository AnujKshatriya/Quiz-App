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
        console.log("Incoming request body:", req.body);

        // Validate required fields
        if (!username || !email || !password) {
            console.log("Missing required fields:", { username, email, password });
            return res.status(400).json({ success: false, message: "Please provide all required fields (username, email, password)." });
        }

        const check = await UserModel.findOne({ email });
        if (check) {
            console.log("User already exists for email:", email);
            return res.status(400).json({ success: false, message: "User Already Exists" });
        }

        if (!validator.isEmail(email)) {
            console.log("Invalid email format:", email);
            return res.status(400).json({ success: false, message: "Enter a Valid email" });
        }

        if (password.length < 8) {
            console.log("Weak password:", password);
            return res.status(400).json({ success: false, message: "Enter a Strong Password" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username: username,
            email: email,
            password: hash,
        });

        const user = await newUser.save();

        const token = createToken(user._id);
        
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error registering user:", error);
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
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { LoginUser, RegisterUser };
