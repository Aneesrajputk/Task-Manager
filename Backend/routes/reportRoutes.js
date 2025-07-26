const express = require('express');
const { adminOnly } = require('../middlewares/authMiddleware');
const {protect}=require('../middlewares/authMiddleware')
const {exportTasksReport, exportUsersReport} = require("../controllers/reportcontrollers");

const router = express.Router();
router.get("/export/tasks", protect, adminOnly, exportTasksReport); 
router.get("/export/users", protect, adminOnly, exportUsersReport);

module.exports = router;