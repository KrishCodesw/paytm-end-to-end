const express=require('express');
const { authMiddleware } = require('../midddleware');
const { Account } = require('../db');
const mongoose=require("mongoose")
const router=express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
        const account=await Account.findOne({
            userId:req.userId
        })
        res.json({balance:account.balance})
})

// router.post("/transfer",authMiddleware,async(req,res)=>{
//         const {amount,to}=req.body;
//         const account=await Account.findOne({
//             userId:req.userId
//         })
//         if(account.balance<amount){
//             res.json({
//                 message:"Insufficient balance"
//             })
//         }
//         const toAccount=await Account.findOne({
//             userId:to
//         })
//             if (!toAccount) {
//         return res.status(400).json({
//             message: "Invalid account"
//         })
//     }

//     await account.updateOne({userId:req.userId},{$inc:{balance:-amount}})
//     await account.updateOne({userId:to},{$inc:{balance:amount}})

//     res.json({
//         massage:"Amount transferred to the respective account"
//     })
// })

// THIS IS A REALLY BAD APPROACH ---> IF BACKEND/DB GOES DOWN, THE TRANSACTION WILL BE LOST AND BALANCE WILL TURN NEGATIVE



router.post("/transfer",authMiddleware,async(req,res)=>{
        const session=await mongoose.startSession();


        session.startTransaction()

        const {amount,to}=req.body;
        const account=await Account.findOne({
            userId:req.userId
        }).session(session)



        if(!account||account.balance<amount){
             await session.abortTransaction();
         return   res.status(400).json({
                message:"Insufficient balance"
            })
        }


        const toAccount=await Account.findOne({
            userId:to
        }).session(session)
            if (!toAccount) {
                 await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await account.updateOne({userId:req.userId},{$inc:{balance:-amount}})
    await account.updateOne({userId:to},{$inc:{balance:amount}})
     await session.commitTransaction();

    res.json({
        massage:"Amount transferred to the respective account and the remaining balance can be seen"
    })
})




















module.exports=router