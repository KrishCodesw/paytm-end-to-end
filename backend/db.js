const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://devpalsw:BmOH7OTbT11eELFW@paytm.ylcbznq.mongodb.net/').then(()=>{console.log("Connected to MongoDB")}).catch((error)=>{ console.error('MongoDB connection error:', error);})

const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    firstname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const User=mongoose.model('User',UserSchema);



const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account=mongoose.model("Account",accountSchema)

module.exports={
    User,
    Account
}