import express from 'express'
import { createTheatre, deleteTheatre, editTheatre, getTheatres } from '../controllers/theatreControllers.js'
import { getMovie } from '../controllers/movieControllers.js'
import authenticateOwner from '../middlewares/ownerAuth.js'


const ownerRouter = express.Router()

ownerRouter.get('/', (req, res)=>{
    console.log("Owner router")
})

// incomplete routes 
ownerRouter.get('/t-list', authenticateOwner)
ownerRouter.post('/t-add', authenticateOwner)
ownerRouter.delete('/t-rem', authenticateOwner)
ownerRouter.put('/t-edit', authenticateOwner)
ownerRouter.get('/movie-list',)


export default ownerRouter