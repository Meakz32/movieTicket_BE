import User from "../models/user.js"
import bcrypt from "bcrypt"
import { userToken } from "../utils/token.js"


// user Sign-Up 
export const userSignup = async (req, res) => {
    try {
        const { fullName, email, phone, password, role } = req.body

        const userExist = await User.findOne({ email })
        if(userExist){
            return res.send('user already exist')
        }

        if(role === "admin") return res.send("error")
        
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            fullName,
            email,
            phone,
            hashPassword,
            role
        })

        if(!newUser) {
            console.log("error in user creation, FAILED")
            return res.send("error in user creation")
        }

        const userToDb = await newUser.save()

        if(!userToDb) {
            console.log("error in saving user to DB")
            return res.send("error in saving user to DB")
        }

        console.log("new user created successfully")
       
        const userId = userToDb._id.toHexString()

        const token = userToken(email)
        res.cookie("token", token)
        res.cookie("userId", userId)
        res.send("token created successfully, Sign-up successful")
        console.log("sign-up successful ", token)
    } catch (error) {
        console.log("error in user sign-up ", error)
        return res.send("error in user sign-up")
    }
}



// user sign-In 
export const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await User.findOne({email})

        if(!userExist) {
            console.log("user not found")
            return res.send("user not found, please Sign-up first")
        }

        const matchPassword = await bcrypt.compare(password, userExist.hashPassword)
        if(!matchPassword){
            console.log("Incorrect password")
            return res.send("Incorrect password")
        }

        const userId = userExist._id.toHexString()
        const token = userToken(userExist)
        res.cookie("token", token)
        res.cookie("userId", userId)
        res.send("Logged In")
        console.log("token created successfully, logged-In")

    } catch (error) {
        console.log("error in user sign-In ", error)
        return res.send("error in user sign-In")
    }
}

// List of users(owners & normal users) 
export const getUsers = async (req, res) => {
    const users = await User.find()
    res.send(users)
}


// logout 
export const userLogout = async (req, res) => {
    res.clearCookie("token")
    res.clearCookie("userId")
    res.send("logged out")
}