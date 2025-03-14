const User = require("../Models/user_model.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv")
dotenv.config()
exports.signup = async(req,res)=>{
    try{
        const { email,userName,userId,userType,phone,password } = req.body;

        if(!email || !userName || !userType || !phone || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const userExists = await User.findOne({$or:[{email},{userId}]})
        if (userExists){
            return res.status(400).json({message:"User already exists,pleese login"})
        }

        // hass password
        const hashedpassword = await bcrypt.hash(password,10)

        const newUser = new User({email,userName,userId,userType,phone,password:hashedpassword})
        await newUser.save();


        const token = jwt.sign({userId:newUser.userId},process.env.JWT_KEY,{expiresIn:"4h"})
        
        
        res.status(201).json({message:"Signup sucessfully!",newUser,token})


    }catch(error){
        console.log("Signup error :",error)
        res.status(500).json({message:"Internal server error"})
    }
}

exports.login = async(req,res)=>{
    try{
        const {userId,password} = req.body;

        if(!userId || !password){
            return res.status(400).json({message:"All field required"})
        }

        const user = await User.findOne({userId}).exec()
        if(!user){
            return res.status(400).json({message:"user not found!"})
        }

        const isMach = await bcrypt.compare(password,user.password)

        if(!isMach){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_KEY, { expiresIn: "2h" })

        res.status(201).json({ message: "Login sucessfully!",user,token })

    }catch(error){
        console.log("Login error :",error)
        res.status(500).json({ message:"Internal server error"})
    }
}

exports.updateUser = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.status(400).json({ message: "session expired,please login" })
        }

        const decode = jwt.verify(token, process.env.JWT_KEY)
        if (!decode) {
            return res.status(400).json({ message: "Invalid token" })
        }

        const user = await User.findOne({ userId: decode.userId }).exec()
        if (!user) {
            return res.status(400).json({ message: "User not found!" })
        }

        const updatedUser = await User.findOneAndUpdate({ userId: decode.userId }, { $set: req.body },{ new: true })
        if (!updatedUser) {
            return res.status(400).json({ message: "User not updated" })
        }

        res.status(200).json({ message: "User updated successfully", updatedUser })

    }catch(error){
        console.log("Update error :",error)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteUser = async(req,res)=>{
    try{
        const user = await User.findOneAndDelete({userId:req.params.userId}).exec()
        if(!user){
            return res.status(400).json({message:"User not deleted"})
        }
        res.status(200).json({message:"User deleted successfully",user})
    }catch(error){
        console.log("Delete error :",error)
        res.status(500).json({ message: "Internal server error" })
    }
}


exports.profile = async(req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]

        if(!token){
            return res.status(400).json({message:"session expired,please login"})
        }

        const decode = jwt.verify(token,process.env.JWT_KEY)
        if (!decode){
            return res.status(400).json({message:"Invalid token"})
        }

        const user = await User.findOne({userId:decode.userId}).exec()
        if(!user){
            return res.status(400).json({message:"User not found!"})
        }

        res.status(200).json({user:{
            email:user.email,
            userName:user.userName,
            userId:user.userId,
            userType:user.userType,
            phone:user.phone
        }})

    }catch(error){
        // console.log("Profile error:",error)
        res.status(500).json({ message: "Internal server error" })

        
    }
}

exports.ForgetPassword = async(req,res)=>{
    try{
        const {userId,password} = req.body
        if (!userId || !password) {
            return res.status(400).json({ message:"userId is required"})
        }

        const hashedpassword = await bcrypt.hash(password, 10)
        
        const user = await User.findOneAndUpdate({ userId: userId }, { password: hashedpassword }, {new:true})
        if(!user){
            return res.status(400).json({ message: "User not found!" })
        }
        res.status(200).json({ message: "Password updated successfully", user })
    }catch(error){
        console.log("Forget password error :",error)
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.GetAlluserForAdmin = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Session expired, please login" });
        }

        const decode = jwt.verify(token, process.env.JWT_KEY);
        if (!decode) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const user = await User.findOne({ userId: decode.userId }).exec();
        if (!user || user.userType !== 'Admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const users = await User.find().exec();
        res.status(200).json({ users });

    } catch (error) {
        console.log("Get all users error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

