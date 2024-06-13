import Shows from "../models/showlist.js"


export const timing = async (date, time, seatArr) => {
    try {

        const newTiming = new Shows({
            date,
            time,
            seats : seatArr
        })

        const saveTime = await newTiming.save()
        if(!saveTime) return res.send("error in saving time")

        return saveTime._id
    } catch (error) {
        console.log(error)
    }
}