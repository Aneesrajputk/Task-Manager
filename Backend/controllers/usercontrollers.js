const Task = require("../models/Task");
const User = require("../models/User"); 
const bcrypt = require("bcryptjs");

//@ desc getall users(ADMIN ONLY)
// @route GET /api/user/
//access Priavte (Admin)

const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "member" }).select("-password");

        // add task counts to each other
        const usersWithTaskCount = await Promise.all(
            users.map(async (user) => {
                const pendingTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Pending",
                });

                const inprogressTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "In progress",
                });

                const completedTasks = await Task.countDocuments({
                    assignedTo: user._id,
                    status: "Completed",
                });

                return {
                    ...user._doc, // include all existing user data
                    pendingTasks,
                    inprogressTasks,
                    completedTasks
                };
        })
     ); 
        res.json(usersWithTaskCount);
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

}; 

//@ desc het user by id
// @route GET /api/user/:/id
//access Priavte 
const getUserById = async (req, res) => {
    try {
        const user= await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({
            message:"User not found"
        });
        res.json(user);
        } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

//@ desc delete  users(ADMIN ONLY)
// @route Delete /api/user/:id
//access Priavte (Admin)
// const deleteUser = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({
//             message: "Server error",
//             error: error.message
//         });
//     }

// }

//module.exports = { getUsers, getUserById, deleteUser };
module.exports = { getUsers, getUserById};

