import express from 'express'
import { connectDb } from '../config/db.js'
import adminRouter from '../routes/adminRout.js'
import userRouter from '../routes/userRout.js'
import cookieParser from 'cookie-parser'


const app = express()
const port = 4532

// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/user', userRouter)

// db connection 
connectDb()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})