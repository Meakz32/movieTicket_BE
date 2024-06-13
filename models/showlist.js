import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    date : {
        type : Date,
        required : true,
        default : Date.now
    },
    time : [{
        type : String,
        required : true
    }],
    seats : [{type : mongoose.Types.ObjectId, ref : "Seating"}]
},{ timestamps : true})

const Shows = mongoose.model("Shows", showSchema)
export default Shows