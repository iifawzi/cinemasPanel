// Rows Functions

  export function isThisRowCorridor(rowNumber) {
    return this.hallInfo.rowCorridors.includes(rowNumber);
  };





  
  
  export function moveClosedAndCorridorsBelow(rowNumber, realRowNumber, place) {
    let tempCorridors = [...this.hallInfo.rowCorridors];
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.

    tempCorridors = tempCorridors.map((corridorNumber) => {
      // move each corridor below
      const CorridorOperation =
        place === "above"
          ? corridorNumber >= rowNumber
          : corridorNumber > rowNumber;
      if (CorridorOperation) {
        corridorNumber++;
      }
      return corridorNumber;
    });

    tempLockedSeats = tempLockedSeats.map((locked) => {
      // move each lockedSeat Below
      const LockedSeatOperation =
        place === "above"
          ? locked.row >= realRowNumber
          : locked.row > realRowNumber;
      if (LockedSeatOperation) {
        locked.row++;
      }
      return locked;
    });

    this.hallInfo.lockedSeats = tempLockedSeats;
    this.hallInfo.rowCorridors = tempCorridors;
  };





  
  
  export function deleteRow(rowNumber, realRowNumber) {
    let tempCorridors = [...this.hallInfo.rowCorridors];
    let tempRowsNumber = this.hallInfo.rowsNumber;
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.
    let wrapNumber = 1; // this will be increased if we deleted more than one.
    // if after and before the row which will be deleted there are 'corridors', we have to delete one of them also. (no sense to have tow corridors beside each other)
    const afterMeIndex = tempCorridors.indexOf(rowNumber + 1);
    const BeforeMeIndex = tempCorridors.indexOf(rowNumber - 1);
    if (afterMeIndex != -1 && BeforeMeIndex != -1) {
      tempCorridors.splice(afterMeIndex, 1);
      tempRowsNumber--;
    }
    // if after delete, is there a corridor will be number 1 or last one. -not acceptable- (delete that corridor)
    if (rowNumber + 1 === 2 || rowNumber === this.hallInfo.rowsNumber) {
      const corridorNumber =
        rowNumber + 1 === 2
          ? tempCorridors.indexOf(rowNumber + 1)
          : tempCorridors.indexOf(rowNumber - 1);
      if (corridorNumber != -1) {
        tempCorridors.splice(corridorNumber, 1);
        wrapNumber++;
        tempRowsNumber--;
      }
    }
    // to delete all lockedSeats in the deleted Row:
    let newLockedSeats = tempLockedSeats.filter(
      (locked) => locked.row != realRowNumber
    );
    tempLockedSeats = newLockedSeats;

    // move the corridors:
    tempCorridors = tempCorridors.map((corridorNumber) => {
      if (corridorNumber > rowNumber) {
        corridorNumber -= wrapNumber; // move any corridor which exist after the one i want to delete, one step above (if i want to delete row number 5 and there's an corridor on number 7, so it will be 6 now :D)
      } else if (corridorNumber === rowNumber) {
        // if i'm deleting a corridor
        return null;
      }
      return corridorNumber;
    });

    // move the lockedSeats
    tempLockedSeats = tempLockedSeats.map((locked) => {
      if (locked.row > realRowNumber && realRowNumber != -1) {
        locked.row--;
      }
      return locked;
    });

    tempRowsNumber--;

    this.hallInfo.rowsNumber = tempRowsNumber;
    this.hallInfo.rowCorridors = tempCorridors;
    this.hallInfo.lockedSeats = tempLockedSeats;
    this.clicked = "";
  };





  
  
  export function convertRowToCorridor(rowNumber, realRowNumber) {
    let tempCorridors = [...this.hallInfo.rowCorridors];
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.
    tempCorridors.push(rowNumber);

    // to delete all lockedSeats in that row:
    let newLockedSeats = tempLockedSeats.filter(
      (locked) => locked.row != realRowNumber
    );
    tempLockedSeats = newLockedSeats;

    // move the lockedSeats
    tempLockedSeats = tempLockedSeats.map((locked) => {
      if (locked.row > realRowNumber) {
        locked.row--;
      }
      return locked;
    });

    this.hallInfo.rowCorridors = tempCorridors;
    this.hallInfo.lockedSeats = tempLockedSeats;
    this.clicked = "";
  };





  
  
  export function convertCorridorToRow(rowNumber) {
    let tempCorridors = [...this.hallInfo.rowCorridors];
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.
    const corridorIndex = tempCorridors.indexOf(rowNumber);
    if (corridorIndex > -1) {
      tempCorridors.splice(corridorIndex, 1);
    }

    // move the lockedSeats
    tempLockedSeats = tempLockedSeats.map((locked) => {
      if (locked.row >= rowNumber) {
        locked.row++;
      }
      return locked;
    });

    this.hallInfo.lockedSeats = tempLockedSeats;
    this.hallInfo.rowCorridors = tempCorridors;
    this.clicked = "";
  };





  
  
  export function addRow(rowNumber, realRowNumber, place) {
    let tempRowsNumber = this.hallInfo.rowsNumber;

    this.moveClosedAndCorridorsBelow(rowNumber, realRowNumber, place);
    tempRowsNumber++;

    this.hallInfo.rowsNumber = tempRowsNumber;
    this.clicked = "";
  };





  

  export function addCorridor(rowNumber, realRowNumber, place) {
    let tempCorridors = [...this.hallInfo.rowCorridors];
    let tempRowsNumber = this.hallInfo.rowsNumber;

    this.moveClosedAndCorridorsBelow(rowNumber, realRowNumber, place);
    tempRowsNumber++;
    if (place === "above") {
        tempCorridors.push(rowNumber);
    } else if (place === "below") {
        tempCorridors.push(rowNumber + 1);
    }

    this.hallInfo.rowsNumber = tempRowsNumber;
    this.hallInfo.rowCorridors = tempCorridors;
    this.clicked = "";
  };