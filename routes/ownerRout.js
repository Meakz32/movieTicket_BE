import express from 'express'
import { addMovie, createTheatre, deleteTheatre, editTheatre, getTheatres, showTheatres } from '../controllers/theatre.js'
// import { getMovie } from '../controllers/movieControllers.js'
import authenticateOwner from '../middlewares/ownerAuth.js'
import { getMovie } from '../controllers/movie.js'


const ownerRouter = express.Router()

ownerRouter.get('/', (req, res)=>{
    console.log("Owner router")
})

ownerRouter.post('/t-add', authenticateOwner,createTheatre)
ownerRouter.patch('/add-Movie/:id',authenticateOwner,addMovie)
ownerRouter.patch('/t-edit/:id', authenticateOwner,editTheatre)
ownerRouter.delete('/t-del/:id', authenticateOwner,deleteTheatre)
ownerRouter.get('/t-list', authenticateOwner,showTheatres)
ownerRouter.get('/movie-list', getMovie)



 

export default ownerRouter