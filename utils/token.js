import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const userToken = (email)=>{
    return jwt.sign({data : email}, process.env.SE, {expiresIn : "1d"})
}

export const adminToken = (email)=> {
    return jwt.sign({data : email}, process.env.SE, {expiresIn : "1h"})
}