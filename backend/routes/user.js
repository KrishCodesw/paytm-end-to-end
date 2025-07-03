const express=require('express')
const router=express.Router();
const zod=require('zod')
const {User}=require("../db")
const jwt=require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcryptjs');
const authMiddleware=require("../midddleware")

const signupBody = zod.object({
    username: zod.string().email(),
	firstname: zod.string(),
	lastname: zod.string(),
	password: zod.string()
})





router.post("/signup",async(req,res)=>{
   const {success}=signupBody.safeParse(req.body)
   if(!success){
    return res.status(411).json({
        message:"Invalid request body",
    })
   }
     const existingUser = await User.findOne({
        username: req.body.username
    })
     if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user=await User.create({
        username:req.body.username ,
        password:hashedPassword,
        firstname:req.body.firstname ,
        lastname:req.body.lastname
    })
    const userId = user._id;

    const token=jwt.sign({userId},JWT_SECRET);
    res.json({
        message:"User created successfully",
        token:token
    })


})



const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin",async(req,res)=>{
    const { success } = signinBody.safeParse(req.body)
        if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user=await User.findOne({
        username:req.body.username,
  
    })
    if (!user) {
    return res.status(411).json({ message: "User not found" });
  }

  const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
   if (!isPasswordCorrect) {
    return res.status(411).json({ message: "Invalid password" });
  }


        const token=jwt.sign({userId:user._id},JWT_SECRET)
        res.json({token:token})
        return
    
     
})


const updateBody=zod.object({
    password:zod.string.optional(),
    firstname:zod.string.optional(),
    lastname:zod.string.optional()
})

router.put("/update-creds",authMiddleware,async(req,res)=>{
    const {success}=updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error updating"
        })
    }

    await User.updateOne({_id:req.userId},req.body)
    res.json({
        message:"Updated credentials! "
    })

})

router.get("/bulk",authMiddleware,async(req,res)=>{
    const filter=req.params.filter||"";

    const users=await User.find({
        $or:[{
            firstname:{
                "$regex":filter
            },
            lastname:{
                "$regex":filter
            },
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })

})










module.exports=router