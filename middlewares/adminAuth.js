import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

function authenticateAdmin(req, res, next){
    const token = req.cookies.adtoken

    jwt.verify(token, process.env.SE, (err, user)=>{
        // console.log(err)

        if(err) return res.status(400).send(err)

        req.user = user
        // console.log(req.user)

        if(req.user.data.role !== "admin") return res.send("You are not an admin")

        next()
    })
}

export default authenticateAdmin