import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    fullName : {
        required : true,
        type : String,
        minLength : 3,
        maxLength : 40,
    },
    
    email : {
        required : true,
        type : String,
        minLength : 5,
        unique : true,
    },
    phone : {
        type : Number,
        min : 10,
        unique : true,
    },
    hashPassword : {
        type : String,
        required : true,
        minLength : 6,
    },
    role : {
        type : String,
        required : true,
        enum : ["admin", "owner", "user"],
    }
},{ timestamps : true })


const User = mongoose.model('user', userSchema)
export default User