const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getTasks, 
    getTasksById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskCheklist,
    getDashboardData,
    getUserDashboardData } = require("../controllers/taskcontrollers");
const router = express.Router();


// Task mangement Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // get all tasks (Admin: all,User:assigned);
router.get("/:id", protect, getTasksById); // get task by Is
router.post("/", protect, adminOnly, createTask); // task only created by admin
router.put("/:id", protect, updateTask); // update task details
router.delete("/:id", protect, adminOnly, deleteTask); // delete task  only by admin
router.put("/:id/status", protect, updateTaskStatus); //update task status
router.put("/:id/todo", protect, updateTaskCheklist); // update task checklist

module.exports = router;
