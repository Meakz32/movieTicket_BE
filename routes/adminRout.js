import express from "express"
import { adminSignin } from "../controllers/admin.js"
import { getUsers } from "../controllers/user.js"
import authenticateAdmin from "../middlewares/adminAuth.js"

const adminRouter = express.Router()

adminRouter.get('/',(req, res)=>{
    console.log("admin router")
})

adminRouter.post('/signin', adminSignin)
adminRouter.get('/user-list', authenticateAdmin, getUsers)

// incomplete routes 
adminRouter.get('/movies', authenticateAdmin)
adminRouter.post('/add-mov', authenticateAdmin)
adminRouter.delete('/delete-mov', authenticateAdmin)
adminRouter.get('/t-list', authenticateAdmin)


export default adminRouter