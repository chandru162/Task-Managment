const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const Database = async()=>{
    try{
       await mongoose.connect(process.env.DB_URL)
        console.log("mongodb connected sucessfully!")
    }catch(error){
        console.log("mongodb connection error!",error)
    }
}

module.exports = Database;