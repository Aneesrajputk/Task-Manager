const jwt =require("jsonwebtoken");
const User= require("../models/User");

// middleware for protected routes

const protect= async(req,res,next)=>{
    try{
        let token = req.headers.authorization;

        if(token&& token.startsWith("Bearer")){
            token =token.split(" ")[1]; //Extract token
            const decoded= jwt.verify(token,process.env.JWTSECRET);
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }else{
            res.status(401).json({
                message:"Not authorized, no token",
                
            });
        }
        
    }
    catch(error){
        res.status(401).json({
            message:"Token failed",
            error:error.message
        });
    }
    
};

// middleware for Admin only 
const adminOnly=(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next();
    }
    else{
        res.status(401).json({
            message:"Access denied, This route is Only for Admin"
        });
    }
};

module.exports={protect,adminOnly};