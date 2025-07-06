const express=require('express')
const router=express.Router();
const {z}=require('zod')
const {User,Account}=require("../db")
const jwt=require("jsonwebtoken")
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcryptjs');
const {authMiddleware}=require("../midddleware")

const signupBody = z.object({
    username: z.string().email(),
	firstname: z.string(),
	lastname: z.string(),
	password: z.string()
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
    
       const existingAccount = await Account.findOne({ userId });

       
if (!existingAccount) {
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
  });
}

    const token=jwt.sign({userId:user._id},JWT_SECRET);
    res.json({
        message:"User created successfully",
        token:token
    })

 

})



const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
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


const updateBody=z.object({
    password:z.string().optional(),
    firstname:z.string().optional(),
    lastname:z.string().optional()
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
    const filter=req.query.filter||"";

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

router.get("/me",authMiddleware,async(req,res)=>{
     const user = await User.findById(req.userId);
  const account = await Account.findOne({ userId: req.userId });
    if (!user || !account) {
    return res.status(404).json({ message: "User not found" });
  }
   res.json({
    firstname: user.firstname,
    username: user.username,
    accountId: account._id,
  });
})














module.exports=router