const express=require('express')
const userRoutes=require('./user')
const router=express.Router();
const accountRoutes=require("./accounts")
router.use("/user",userRoutes)
router.use("/account",accountRoutes)
module.exports=router