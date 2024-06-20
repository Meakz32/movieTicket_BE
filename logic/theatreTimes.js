import Seating from "../models/seats.js"
import Shows from "../models/showlist.js"




export const timing = async (date, time, seatArr, tName) => {
    try {

        let seatDetailsArr = []
        let seatArrLen = seatArr.length
        for(let i=0; i<seatArrLen; i++){
            const findSeat = await Seating.findOne({ _id : seatArr[i] })

            seatDetailsArr[i] = findSeat
        }


        let arrLen = time.length
        for(let i=0; i<arrLen; i++){
            const newTiming = new Shows({
                date,
                time : time[i],
                theatre : tName,
                seats : seatDetailsArr
            })
    
            const saveTime = await newTiming.save()
            if(!saveTime) return res.send("error in saving time")
            
    
        }
        

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}