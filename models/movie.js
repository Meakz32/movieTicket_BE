import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    movieName : {
        type : String,
        required : true,
        unique : true,
    },
    description :{
        type : String,
        required : true,
        minLength : 10,
        maxLength : 10000,
    },
    genre :[{
        type : String,
        required : true,
        minLength : 3,
        maxLength : 100,
    }],
    language : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 100,
    },
    playback :{
        type : Number,
        required : true,
        min : 60,
        
    },
    image : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["running", "upcoming", "Running", "Upcoming"],
        required : true,
        default : "running"
    },
    year :{
        type : Number,
        required : true,
    }
},{ timestamps : true})

const Movie = mongoose.model("Movie",movieSchema)
export default Movie