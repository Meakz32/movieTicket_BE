import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function authenticateUser(req, res, next){
    const token = req.cookies.token

    jwt.verify(token, process.env.SE, (err, user)=>{
        console.log(err)

        if(err) return res.status(400).send("token missing or not found", err)
        
        req.user = user
        console.log(req.user.role)

        if(req.user.role !== "user") return res.send("You are not a Normal user")

        next()
    })
}

export default authenticateUser