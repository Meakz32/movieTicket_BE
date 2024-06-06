import express from 'express'
import { userSignup, userSignin } from '../controllers/user.js'
import authenticateUser from '../middlewares/userAuth.js'

const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    console.log("user router")
})


userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)

// incomplete routes 
userRouter.get('/movies',)
userRouter.get('/orders', authenticateUser)
userRouter.post('add-review', authenticateUser)


export default userRouter