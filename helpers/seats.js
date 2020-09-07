// this helper will be used to generate the array which will be used to draw the seats structure

module.exports = (letters,rowsNumber,columnsNumber,rowCorridors,columnCorridors,lockedSeats,bookedSeats = [])=>{
    const seats = [];
    let rowNumber = 0; // this will be used, to increment manually, to be able to follow the real numbers of rows (without corridors) - zero because it will increase in the rows Lopp, for first time it should be 1, so going to columns loop with 1, if started with 1, it will be go to the columns loop with 2.. so in the rows Loop when row, we added 1 manually
    for(let i=1;i<=rowsNumber;i++){
        let columnNumber = 1; // this will be used, to increment manually, to be able to follow the real numbers of columns (without corridors)
        if (rowCorridors.includes(i)){
            seats.push({
                rowNumber: i, // we didn't use the variable declared above, because we want to be unique (will be used in control panel only)
                name: "RowCorridor",
                seats: [],
                realRowNumber: -1, // corridor.
            }); // this indicates that it's a row
            continue;
        }else {
            seats.push({rowNumber: i,name: letters[0], seats: [],realRowNumber: rowNumber+1}); // push an object with a row key which is a letter and empty array which will be used below to fill the seats
            rowNumber++;
        }
       for (let j=1;j<=columnsNumber;j++){
           if (columnCorridors.includes(j)){ // if seat's column is corridor
            seats[i-1]["seats"].push({
                uuid: (i+"-"+j),
                status: "columnCorridor",
                name: 'columnCorridor', 
                seatRow: -1, 
                seatColumn: -1,
            });
           }else if (lockedSeats.findIndex(locked=> locked.row === rowNumber && locked.column === columnNumber) !== -1){ // if the seat is locked 
            seats[i-1]["seats"].push({
                uuid: (i+"-"+j),
                status: "closed",
                name: letters[0]+columnNumber, 
                seatRow: rowNumber, 
                seatColumn: columnNumber,
            });
            columnNumber++
           }else if (bookedSeats.findIndex(booked=> booked.row === rowNumber && booked.column === columnNumber) !== -1){ // if the seat is booked 
            seats[i-1]["seats"].push({
                uuid: (i+"-"+j),
                status: "booked",
                name: letters[0]+columnNumber, 
                seatRow: rowNumber, 
                seatColumn: columnNumber,
            });
            columnNumber++
           }else { // so, it's available
            seats[i-1]["seats"].push({
                uuid: (i+"-"+j),
                status: "available",
                name: letters[0]+columnNumber, 
                seatRow: rowNumber, 
                seatColumn: columnNumber,
            }); 
            columnNumber++
        }
       }
       letters.shift();
    };
    return seats;
}



