require("dotenv").config();
const express =require("express");
const cors= require("cors");
const path=require("path");
const connectDB =require("./Config/db")
const authRoutes= require("./routes/authRoutes")
const app =express();
const userRoutes= require("./routes/userRoutes")
const tasksRoutes= require("./routes/taskRoutes")
// middleware to handle cors

app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],

    })
)
// connect database
connectDB();
//middleware
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
 app.use("/api/users",userRoutes);
app.use("/api/tasks",tasksRoutes);
// app.use("/api/reports",reportRoutes);
// Start server
const PORT=process.env.PORT||5000;

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});
app.listen(PORT,()=>
    console.log(`server running on port ${PORT}`)
);