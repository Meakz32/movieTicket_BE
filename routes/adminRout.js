import express from "express"
import { adminLogout, adminSignin } from "../controllers/admin.js"
import { getUsers } from "../controllers/user.js"
import authenticateAdmin from "../middlewares/adminAuth.js"
import { addMovie, changeMovieStatus, deleteMovie, getMovie } from "../controllers/movie.js"
import upload from "../middlewares/multer.js"
import { approveTheatre, getTheatres, getaTheatre } from "../controllers/theatre.js"

const adminRouter = express.Router()

adminRouter.get('/',(req, res)=>{
    console.log("admin router")
})

adminRouter.post('/signin', adminSignin)
adminRouter.patch('/approve-t/:id',authenticateAdmin,approveTheatre)
adminRouter.get('/user-list', authenticateAdmin, getUsers)
adminRouter.patch('/update-status/:id',authenticateAdmin,changeMovieStatus)
adminRouter.delete('/delete-mov/:id', authenticateAdmin,deleteMovie)
adminRouter.post('/add-mov', authenticateAdmin, upload.single("image"), addMovie)
adminRouter.post('/logout',adminLogout)
adminRouter.get('/t-list', authenticateAdmin,getTheatres)
adminRouter.get('/theatre/:id',authenticateAdmin,getaTheatre)
adminRouter.get('/movies', authenticateAdmin, getMovie)





export default adminRouter