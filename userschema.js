const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    userEmail:{
        type:String,
        unique:true,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        default:"",
    },
    VerificationNumber:{
        type:Array
    },
    VerificationStatus:{
        type:String,
        default:"not_verified"
    }
},{timestamps:true}
);

module.exports = mongoose.model("user",userSchema)