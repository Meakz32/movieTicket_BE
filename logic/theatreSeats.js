import Seating from "../models/seats.js";

export const arrangement = async (rows, cols, tName) => {
    try {
        let character = "a"
        const seatArray = []
        function nextChar(c) {
            character = String.fromCharCode(c.charCodeAt(0) + 1);
        }

        for(let i = 1; i<=rows; i++){
            
            for(let j=1; j<=cols; j++){
                 const seat = character + j
                 const createNewSeat = new Seating({
                    seat : seat,
                    theatre : tName,
                })
                
                await createNewSeat.save()
                const seatId = createNewSeat._id.toHexString()
                seatArray.push(seatId)

            }
            nextChar(character)
        }


        // console.log("seating array : ", seatArray )
        console.log("seating saved")
        return seatArray

    } catch (error) {
        return console.log("error in arrangement", error)
    }
}