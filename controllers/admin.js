import User from "../models/user.js"
import bcrypt from "bcrypt"
import { adminToken } from "../utils/token.js"

export const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body

        const adminExist = await User.findOne({email})
        if(!adminExist){
            console.log("Admin not found")
            return res.send("Admin not found")
        }

        const matchPassword = await bcrypt.compare(password, adminExist.hashPassword)
        if(!matchPassword) {
            console.log("Incorrect password")
            return res.send("Incorrect password")
        }

        if(adminExist.role != "admin") return res.send("not an admin")
        
        const token = adminToken(email)
        res.cookie("token", token)
        res.send("Logged In")
        console.log(token + " token created")

    } catch (error) {
        console.log("error in admin sign-in :", error)
        return res.send("error : ", error)
    }
}