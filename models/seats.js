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
    },
    theatre : { type : mongoose.Types.ObjectId, ref : "Theatre" },
    timing : [{ type : mongoose.Types.ObjectId, ref : "Shows" }]
})

const Seating = mongoose.model("Seating", seatShema)
export default Seating