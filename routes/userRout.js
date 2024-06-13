import express from 'express'
import { userSignup, userSignin, userLogout } from '../controllers/user.js'
import authenticateUser from '../middlewares/userAuth.js'
import { getMovie, getSingleMovie } from '../controllers/movie.js'
import { addReview, deleteReview, editReview, showReviews } from '../controllers/review.js'

const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    console.log("user router")
})


userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)
userRouter.post('/logout', userLogout)

userRouter.get('/movies', getMovie)
userRouter.get('/movie/:id',getSingleMovie)
userRouter.get('/reviews/:id',showReviews)
userRouter.post('/add-review/:id', authenticateUser,addReview)
userRouter.patch('/edit-review/:id', authenticateUser,editReview)
userRouter.delete('/del-review/:id',authenticateUser,deleteReview)


// incomplete routes 

userRouter.get('/orders', authenticateUser)



export default userRouter