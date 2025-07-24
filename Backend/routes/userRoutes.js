const express =require("express");
const {adminOnly,protect} =require("../middlewares/authMiddleware");
const {getUsers,getUserById,deleteUser}=require("../controllers/usercontrollers");

const router=express.Router();

router.get("/",protect,adminOnly,getUsers); // get all users(admin only)
router.get("/:id",protect,getUserById);
//router.delete("/:id",protect,adminOnly,deleteUser);


module.exports=router;


