const express = require("express");


const { registerUser, loginUser, getUserProfile, updateUserprofile } = require("../controllers/authcontrollers");

const {protect} = require("../middlewares/authMiddleware");
const upload =require("../middlewares/uploadMiddleware");

const router = express.Router();
router.post("/register", registerUser); // for register user
router.post("/login", loginUser); //login user
router.get("/profile", protect, getUserProfile); // get user profile
router.put("/profile", protect, updateUserprofile);// update profile

router.post("/upload-image",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({
            message:"NO file uplaoded"
        })
    }
    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
});


module.exports = router;

