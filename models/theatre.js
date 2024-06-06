import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
    },
    state : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
    },
    city : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
    },
    area : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 50,
    },
    seatRow : {
        type : Number,
        required : true,
    },
    seatColumn : {
        type : Number,
        required : true,
    },
    status : {
        type : Boolean,
        required : true,
        default : false,
    },
    movie : [{type : mongoose.Types.ObjectId, ref : "Movie"}],
    owner : [{type : mongoose.Types.ObjectId, ref : "User"}]
},{ timestamps : true})

const Theatre = mongoose.model('Theatre', theatreSchema)
export default Theatre