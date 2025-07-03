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

const User=mongoose.model('User',UserSchema)

module.exports={
    User
}