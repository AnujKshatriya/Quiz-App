import jwt from 'jsonwebtoken';

const AuthMiddleWare = async(req,res,next) =>{
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ success: false, message: "Please Login First" });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_key)
        req.body.userId = decode.id;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); 

        //Additional details about Error..if...
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ success: false, message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ success: false, message: "Invalid token" });
        } else {
          return res.status(500).json({ success: false, message: "Internal server error" });
        }
  
    }
}

export default AuthMiddleWare;