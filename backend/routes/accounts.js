const express=require('express');
const { authMiddleware } = require('../midddleware');
const { Account ,User} = require('../db');
const mongoose=require("mongoose")
const router=express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found for this user" });
        }

        res.json({ balance: account.balance });

    } catch (err) {
        console.error("Error fetching balance:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});


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



router.post("/transfer", authMiddleware, async (req, res) => {
    console.log("Authenticated userId:", req.userId);

    const session = await mongoose.startSession();

    try {
        const { amount, to } = req.body;

        if (!amount || !to) {
            return res.status(400).json({ message: "Amount and recipient required" });
        }

        session.startTransaction();

        // Find sender account
        const sender = await Account.findOne({ userId: new mongoose.Types.ObjectId(req.userId) }).session(session);
        console.log(sender);
        
        if (!sender) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Sender account not found" });
        }

        if (sender.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Find recipient account
        const recipient = await User.findOne({ username:to }).session(session);
        if (!recipient) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Recipient account not found" });
        }
        if(recipient._id.toString()===req.userId){
            await session.abortTransaction();
      return res.status(400).json({ message: "Cannot transfer to yourself" });
        }

        const recipientID = await Account.findOne({ userId: recipient._id }).session(session);
        console.log(recipientID)
    if (!recipientID) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Recipient account not found" });
    }

        // Update balances
        // sender.balance -= amount;
        // recipientID.balance += amount;

        // await sender.save({ session });
        // await recipientID.save({ session });

        //BAD WAY 
        //GOOD WAY 

        await Account.updateOne({userId:sender.userId},{$inc:{balance:-amount}},{session})
        await Account.updateOne({userId:recipient._id},{$inc:{balance:amount}},{session})













        await session.commitTransaction();
        res.json({ message: "Transfer successful" });

    } catch (err) {
        await session.abortTransaction();
        console.error("Transfer error:", err);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});







module.exports=router