const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


// step 1  Genrate jWt 
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWTSECRET,
        { expiresIn: "7d" }
    );
};


// - desc  -> register a new user
// - route -> /api/auth/register
// - access ->  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImgUrl, adminInviteToken } = req.body;
        // checl if user alerady exist
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        // determine user role: admin if correct token is provided therwise member 
        let role = "member";
        if (adminInviteToken && adminInviteToken == process.env.adminInviteToken) {
            role = "admin";
        }

        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // create a new User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImgUrl,
            role,
        });
        // return user data with jwt
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImgUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
// - desc  -> login a new user
// - route -> /api/auth/login
// - access ->  private(request jwt)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // campar password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: "User Not Found Invalid user "
            });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImgUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}
// - desc  -> Get user Profile
// - route -> /api/auth/profile
// - access ->  private(request jwt)

const getUserProfile = async (req, res) => {
    try {
        const user =await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User Not Found"});
            }
            res.json(user);  
    } catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
// - desc  -> update  user profile 
// - route -> /api/auth/profile
// - access ->  private(request jwt)

const updateUserprofile = async (req, res) => {
    try {
        const user=await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.name=req.body.name || user.name,
        user.email=req.body.email || user.email;


        if(req.body.password){
            const salt= await bcrypt.genSalt(10);
            user.password=await bcrypt.hash(req.body.password,salt);
        }
        const updatedUser=await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });

    } catch {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = { registerUser, loginUser, getUserProfile, updateUserprofile }