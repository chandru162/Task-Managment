const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const cors = require('cors')



// database connection
const Database = require("./Database/db.js")
Database()
// ------------------------
// middleware
app.use(express.json())
app.use(cors({
    origin:"*",
    methods:"*",
    credentials:true
}))

// --
// import routes
const authRoutes = require("./Router/auth_router.js")
const taskRoutes = require("./Router/task_router.js")

// ------------------------

//routes 
app.get('/',(req,res)=>{
    res.status(200).send({message:"server home page"})
})
app.use("/api/auth", authRoutes)
app.use("/api/task",taskRoutes)



// -----------------------
//server listen
app.listen(process.env.PORT,()=>{
    console.log("server running on >> http://localhost:"+process.env.PORT)
})