import { response } from "express"
import Shows from "../models/showlist.js"
import Theatre from "../models/theatre.js"


// show available seats before booking 
export const showSeats = async (req, res) => {
    try {
        // show id
        const { id } = req.params

        const findShow = await Shows.findOne({ _id : id })
        if(!findShow) return res.send("error in fetching show details")

        
        const findTheatre = await Theatre.findOne({ _id : findShow.theatre})
        if(!findTheatre) return res.send("error in fetching theatre details")
        
        console.log(findTheatre)
        
        res.send(findShow.seats)
        


        // // will get exact date and that model details 
        // const timeLen = findTheatre.timing.length
        // let showId = []
        // for(let i=0; i<timeLen; i++){
        //     const findDate = await Shows.findOne({ _id : findTheatre.timing[i].toHexString() })
        //     console.log("findDate : ", findDate.date)
        //     if(findDate.date.getTime == newDate.getTime){
        //         console.log("date : true")
        //         showId = findDate
        //         break;
        //     }
        // }

        // // will get exact time
        // let exactTime = ""
        // let newTimeLen = showId.time.length
        // for(let i=0; i<newTimeLen; i++){
        //     if(showId.time[i] == time){
        //         exactTime = time
        //     }
        // }

        // console.log("date details : ", showId)
        // console.log("date : ", showId.date)
        // console.log("time : ", exactTime)
    } catch (error) {
        console.log(error)
    }
}






export const chooseSeat = async (req, res) => {
    try {

        // fetching theatre_id, date & time
        const { theatre, date, time } = req.body

        const findTheatre = await Theatre.findOne({ _id : theatre })

        let gotDayId = ""
        for(let i=0; i<=findTheatre.timing; i++){
            const showId = findTheatre.timing[i]
            console.log(showId)
            const findDate = await Shows.findOne({ _id : showId })
            if(findDate.date == date){
                gotDayId = findDate
                break;
            }
        }
        if(gotDayId === "") return res.send("error, can't fetch date & time")

            
        // const findDate 
    } catch (error) {
        
    }
}