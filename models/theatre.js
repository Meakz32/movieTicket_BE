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
        min : 1,
        max : 15
    },
    seatColumn : {
        type : Number,
        required : true,
        min : 1,
        max : 20
    },
    status : {
        type : Boolean,
        required : true,
        default : false,
    },
    movie : [{type : mongoose.Types.ObjectId, ref : "Movie"}],
    seats : [{type : mongoose.Types.ObjectId, ref : "Seating"}],
    timing : [{type : mongoose.Types.ObjectId, ref : "Shows"}],
    owner : {type : mongoose.Types.ObjectId, ref : "User"}
},{ timestamps : true})

const Theatre = mongoose.model('Theatre', theatreSchema)
export default Theatre