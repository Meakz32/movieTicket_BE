import User from "../models/user.js";
import Theatre from "../models/theatre.js";
import { arrangement } from "../logic/theatreSeats.js";
import { timing } from "../logic/theatreTimes.js";
import Movie from "../models/movie.js";
import Shows from "../models/showlist.js";
import Seating from "../models/seats.js";


// for owner 
export const showTheatres = async (req, res) => {
    const userId = await req.cookies.userId

    const findTheatres = await Theatre.find({ owner : userId })
    if(findTheatres.length === 0) return res.send("No theatres to display")

    res.send(findTheatres)
}


export const createTheatre = async (req, res) => {
    try {
        console.log("hitted on theatre creation")
        const { name, state, city, area, seatRow, seatColumn, date, time } = req.body

        const userId = await req.cookies.userId
        console.log("owner id : ", userId) 
        if(!userId) return res.send("can't fetch user details")   
        

        const createNewTheatre = new Theatre({
            name,
            state,
            city,
            area,
            seatColumn,
            seatRow,
            owner : userId
        })
        

        const newTheatre = await createNewTheatre.save()
        if(!newTheatre) return res.send("new theatre creation failed")
        
        const tName = newTheatre._id
        const seatArr = await arrangement(seatR, seatC, tName)
        await timing(date, time, seatArr, tName)

        const addSeat = await Theatre.findOneAndUpdate(
            { _id : newTheatre._id },
            { 
                seats : seatArr
            }
        )
        if(!addSeat) return console.log("adding seat failed")

        return res.send("New theatre created successfully")
    } catch (error) {
        console.log("error in theatre creation ", error)
        return res.send("error")
    }
}


export const editTheatre = async (req, res) => {
    try {
        // theatre id 
        const {id} = req.params

        let { movieName, date, time } = req.body

        const findTheatre = await Theatre.findOne({ _id : id })

        if( findTheatre.status === false ) return res.send("Theatre must be approved by admin")




        if(movieName){
             // movie update 
            const findMovie = await Movie.findOne({ name : movieName })
            if(!findMovie) return res.send("can't find movie")
            const movieId = findMovie._id.toHexString()

            if(findMovie.status == "upcoming") return res.send("can't add this movie, movie has to be 'running'")

            const updatedTheatreMovie = await Theatre.findOneAndUpdate(
                {_id : id},
                    
                { movie : movieId }
            )
            if(!updatedTheatreMovie) return res.send("Theatre updation failed(movie)")
        }

            

        if(date && time){
            const seatArr = findTheatre.seats
            const tName = findTheatre._id

            await timing(date, time, seatArr, tName)

        }

        console.log("Theatre updated")
        return res.send("Theatre Updated")
    } catch (error) {
        console.log("error in theatre updation ", error)
        res.send("Error in Theatre updation")
    }
}


export const deleteTheatre = async (req, res) => {
    const { id } = req.params

    

    await Seating.deleteMany({ theatre : id })
    console.log("deleted all seats")

    const findTheatre = await Theatre.findOne({ _id : id })
    const timeArr = findTheatre.timing.length
    for(let i=0; i< timeArr; i++){
        await Shows.deleteOne({ _id : findTheatre.timing[i] })
    }
    console.log("deleted all show date & time")

    const TheatreDelete = await Theatre.deleteOne({_id : id})
    if(!TheatreDelete) return res.send("Error in theatre deletion")

    return res.send("Theatre deleted successfully").status(200)
}



// admin controls 

export const approveTheatre = async (req, res) => {
    try {
        const { id } = req.params

        const { status } = req.body

        const approveT = await Theatre.findByIdAndUpdate(
            { _id : id },
            { status }
        )

        if(!approveT) return res.send("failed, can't approve theatre")

        return res.send("theatre approved")
    } catch (error) {
        console.log("error in theatre approval", error)
        return res.send("error in theatre approval", error)
    }
}

// for admin 
export const getTheatres = async (req, res) => {
    const theatres = await Theatre.find()
    if(!theatres.length) return res.send("No theatres to list")
    res.send(theatres)
}

// get only one theatre info in detail (only admin) 
export const getaTheatre = async (req, res) => {
    try {
        // thetre id 
        const { id } = req.params

        const findTheatre = await Theatre.findOne({ _id : id })
        if(!findTheatre) return res.send("error, No theatre found")
        
        const ownerId = findTheatre.owner
        const showTimes = findTheatre.timing
        console.log(ownerId,showTimes)

        const findOwner = await User.findOne({ _id : ownerId })
        if(!findOwner) return res.send("error, can't find the owner")

        const findTiming = await Shows.findOne({ _id : showTimes })
        if(!findTiming) return res.send("error, unable to fetch theatre timings")


        res.send([findTheatre, findOwner.email, findTiming.date, findTiming.time])
    } catch (error) {
        console.log(error)
        return res.send("error in finding fetching one theatre")
    }
}



// for users 
// get theatres list according to movies played

export const theatreListofMovie = async (req, res) => {
    try {
        // movie id 
        const { id } = req.params

        const findTheatres = await Theatre.find({ movie : id })
        if(findTheatres.length === 0) return res.send("No theatres playing this movie")

        res.send(findTheatres)
    } catch (error) {
        console.log("error in showing theatre list of a movie", error)
        return res.send("error ", error)
    }
}

export const addMovie = async (req, res) => {
    try {
        // theatre id 
        const { id } = req.params

        const { movieName } = req.body
    
        const findTheatre = await Theatre.findOne({ _id : id })
        if(!findTheatre) return res.send("failed to fetch theatre details")
    
        if( findTheatre.status === false ) return res.send("Theatre must be approved by admin")
    
        const findMov = await Movie.findOne({ name : movieName })
        if(!findMov) return res.send("No movie found in this name")

        // movie running or not 
        if(findMov.status == "upcoming") return res.send("can't add this movie, movie has to be 'running'")
    
        const addingMov = await Theatre.findOneAndUpdate(
            { _id : id},
            { movie : findMov._id }
        )
        if(!addingMov) return res.send("failed to add movie")
        
        res.send("movie added to theatre successfully")

    } catch (error) {
        console.log("error in add moving to theatre", error)
        return res.send("error in moving adding, ", error)
    }
}