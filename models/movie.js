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
        maxLength : 100,
    },
    genre :{
        type : String,
        required : true,
        minLength : 3,
        maxLength : 100,
    },
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
        
    }
},{ timestamps : true})

const Movie = mongoose.model("Movie",movieSchema)
export default Movie