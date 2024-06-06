import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true,
    },
    theatre : [{ type : mongoose.Types.ObjectId, ref : "Theatre"}],
    user : [{type : mongoose.Types.ObjectId, ref : "User"}],
    movie : [{ type : mongoose.Types.ObjectId, ref : "Movie"}],
},{ timestamps : true })

const Booking = mongoose.model('Booking', bookingSchema)
export default Booking