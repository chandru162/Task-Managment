const express = require("express")
const router = express.Router()

// import controllers

const { signup, login, profile, updateUser, deleteUser, ForgetPassword } = require ("../Controllers/auth_controllers.js")

router.post("/signup", signup)
router.post("/login", login)
router.get("/profile", profile)
router.put("/updateuser", updateUser)
router.delete("/deleteuser/:userId", deleteUser)
router.put("/forgetpassword", ForgetPassword)

module.exports = router