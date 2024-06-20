import mongoose from "mongoose";
const seatShema = new mongoose.Schema({
    seat : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["available", "booked", "reserved"],
        default : "available"
    }
})

const showSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    time : {
        type : String,
        required : true
    },
    seats : [seatShema]
},{ timestamps : true})

const Shows = mongoose.model("Shows", showSchema)
export default Shows