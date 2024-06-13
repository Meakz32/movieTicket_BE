import { cloudinaryInstance } from "../config/cloudinary.js";
import Movie from "../models/movie.js";
import Theatre from "../models/theatre.js";



export const getMovie = async (req, res) => {
    const movies = await Movie.find()
    if(!movies.length) return res.send("No movies to list")
    return res.send(movies)
}

export const getSingleMovie = async (req, res) =>{
    try {
        // movie id 
        const {id} = req.params

        const findMovie = await Movie.findOne({ _id : id })
        if(!findMovie) return res.send("Can't fetch movie")

        return res.send(findMovie)
    } catch (error) {
        console.log("error in fetching movie details", error)
        return res.send("error in movie fetching", error)
    }
}

export const addMovie = async (req, res) => {
    try {
        if (!req.file) {
            console.log("no file uploaded")
            return res.status(400).json({ success: false, message: "No file uploaded" })
        }
        // console.log("File upload successful, moving to cloudinary")

        cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
            if(err){
                console.log("error", err)
                return res.status(400).json({success : false, message: "Error"})
            }

            const imageUrl = result.url

            const { movieName, description, genre, language, playback, status, year } = req.body

            const createNewMovie = new Movie({
                movieName,
                description,
                genre,
                language,
                playback,
                status,
                year,
                image : imageUrl
            })

            const newMovie = await createNewMovie.save()
            if(!newMovie) return res.send("new movie not created")

            return res.send("New movie created")
        })

    } catch (error) {
        console.log("error in movie creation", error)
        res.send("error in movie creation")
    }
}

export const deleteMovie = async (req, res) => {
    const {id} = req.params
    const deletedMovie = await Movie.deleteOne({_id: id})
    if(!deletedMovie) return res.send("Movie deletion failed")
    
    res.send("Movie deleted successfully")
}


// for admin 
export const changeMovieStatus = async (req, res) => {
    console.log("hitted on change status")
    // movie id 
    const { id } = req.params

    const { status } = req.body

    const findMovie = await Movie.findOne({ _id : id })
    if(!findMovie) return res.send("error in finding the movie")

    const changeStatus = await Movie.findOneAndUpdate(
        { _id : id },
        { status }
    )
    res.send("movie status updated")
}

// movie-theatre combos 

// add or replace movie to theatre
// export const addMovie = async (req, res) => {
//     try {
//         // theatre id 
//         const { id } = req.params

//         const { movieName } = req.body
    
//         const findTheatre = await Theatre.findOne({ _id : id })
//         if(!findTheatre) return res.send("failed to fetch theatre details")
    
//         if( findTheatre.status === false ) return res.send("Theatre must be approved by admin")
    
//         const findMov = await Movie.findOne({ name : movieName })
//         if(!findMov) return res.send("No movie found in this name")

//         // movie running or not 
//         if(findMov.status == "upcoming") return res.send("can't add this movie, movie has to be 'running'")
    
//         const addingMov = await Theatre.findOneAndUpdate(
//             { _id : id},
//             { movie : findMov._id }
//         )
//         if(!addingMov) return res.send("failed to add movie")
        
//         res.send("movie added to theatre successfully")

//     } catch (error) {
//         console.log("error in add moving to theatre", error)
//         return res.send("error in moving adding, ", error)
//     }
// }