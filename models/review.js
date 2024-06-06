import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review : {
        type : String,
        required : true,
        minLength : 3,
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5,
    },
    user : [{type : mongoose.Types.ObjectId, ref : "User"}],
    movie : [{ type : mongoose.Types.ObjectId, ref : "Movie"}],
},{ timestamps : true })

const Review = mongoose.model('Review', reviewSchema)
export default Review