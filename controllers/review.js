import Movie from "../models/movie.js"
import Review from "../models/review.js"
import User from "../models/user.js"


export const showReviews = async (req, res) => {
    // movie id 
    const { id } = req.params

    const findReview = await Review.find({ movie : id })
    if(findReview.length === 0) return res.send("No reviews to show")

    res.send(findReview)
}

export const addReview = async (req, res) => {
    try {
        
        // movie id 
        const { id } = req.params

        const { rating, review } = req.body

        const user = await req.cookies.userId

        const movieExist = await Movie.findOne({ _id : id })
        if(!movieExist) return res.send("Movie does not exist")
        
        const findUser = await User.findOne({ _id : user })
        if(findUser.role != "user") return res.send("You are not autherised to add review")
            
        const findReview = await Review.find({ movie : id } && { user : user })
        console.log(findReview)
        if(findReview.length != 0) return res.send("already added review")

        if(movieExist.status === "upcoming") return res.send("Movie has to be running")
        
        const newReview = new Review({
            rating,
            review,
            movie : id,
            user
        })

        const saveReview = await newReview.save()
        if(!saveReview) return res.send("Failed, error in adding review")

        return res.send("movie review added successfully")
    } catch (error) {
        console.log("error in adding review", error)
        return res.send("error in adding review", error)
    }
}

export const editReview = async (req, res) => {
    try {
        // review id 
        const { id } = req.params

        const { rating, review } = req.body

        const updateReview = await Review.findOneAndUpdate(
            { _id : id },
            { review, rating }
        )

        if(!updateReview) return res.send("failed to update review")

        res.send("review updated")
    } catch (error) {
        console.log("error in review updation", error)
        return res.send("error in review updation", error)
    }
}


export const deleteReview = async (req, res) => {
    try {
        // review id 
        const { id } = req.params

        const deleteReview = await Review.deleteOne({ _id : id })
        if(!deleteReview) return res.send("review deletion failed")

        res.send("review deleted")
    } catch (error) {
        console.log("error in review deletion", error)
        return res.send("error in review deletion", error)
    }
}