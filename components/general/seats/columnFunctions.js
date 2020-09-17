// Columns Functions

export function isThisColumnCorridor(uniqueColumnNumber) {
    return this.hallInfo.columnCorridors.includes(uniqueColumnNumber);
  };




  


  
  export function deleteColumn(uniqueColumnNumber, realColumnNumber) {
    let tempCorridors = [...this.hallInfo.columnCorridors];
    let tempColumnsNumber = this.hallInfo.columnsNumber;
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.
    let wrapNumber = 1; // this will be increased if we deleted more than one.
    // if after and before the column which will be deleted there are 'corridors', we have to delete one of them also. (no sense to have tow corridors beside each other)
    const afterMeIndex = tempCorridors.indexOf(uniqueColumnNumber + 1);
    const BeforeMeIndex = tempCorridors.indexOf(uniqueColumnNumber - 1);
    if (afterMeIndex != -1 && BeforeMeIndex != -1) {
      tempCorridors.splice(afterMeIndex, 1);
      tempColumnsNumber--;
    }
    // if after delete, is there a corridor will be number 1 or last one. -not acceptable- (delete that corridor)
    if (uniqueColumnNumber + 1 === 2 || uniqueColumnNumber === this.hallInfo.columnsNumber) {
      const corridorNumber =
      uniqueColumnNumber + 1 === 2
          ? tempCorridors.indexOf(uniqueColumnNumber + 1)
          : tempCorridors.indexOf(uniqueColumnNumber - 1);
      if (corridorNumber != -1) {
        tempCorridors.splice(corridorNumber, 1);
        wrapNumber++;
        tempColumnsNumber--;
      }
    }
    // to delete all lockedSeats in the deleted column:
    let newLockedSeats = tempLockedSeats.filter(
      (locked) => locked.column != realColumnNumber
    );
    tempLockedSeats = newLockedSeats;

    // move the corridors:
    tempCorridors = tempCorridors.map((corridorNumber) => {
      if (corridorNumber > uniqueColumnNumber) {
        corridorNumber -= wrapNumber; // move any corridor which exist after the one i want to delete, one step above (if i want to delete column number 5 and there's an corridor on number 7, so it will be 6 now :D)
      } else if (corridorNumber === uniqueColumnNumber) {
        // if i'm deleting a corridor
        return null;
      }
      return corridorNumber;
    });

    // move the lockedSeats
    tempLockedSeats = tempLockedSeats.map((locked) => {
      if (locked.column > realColumnNumber && realColumnNumber != -1) {
        locked.column--;
      }
      return locked;
    });

    tempColumnsNumber--;

    this.hallInfo.columnsNumber = tempColumnsNumber;
    this.hallInfo.columnCorridors = tempCorridors;
    this.hallInfo.lockedSeats = tempLockedSeats;
    this.clicked = "";
  };





  
  
  export function convertColumnToCorridor(uniqueColumnNumber, realColumnNumber) {
    let tempCorridors = [...this.hallInfo.columnCorridors];
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.
    tempCorridors.push(uniqueColumnNumber);

    // to delete all lockedSeats in that column:
    let newLockedSeats = tempLockedSeats.filter(
      (locked) => locked.column != realColumnNumber
    );
    tempLockedSeats = newLockedSeats;

    // move the lockedSeats
    tempLockedSeats = tempLockedSeats.map((locked) => {
      if (locked.column > realColumnNumber) {
        locked.column--;
      }
      return locked;
    });

    this.hallInfo.columnCorridors = tempCorridors;
    this.hallInfo.lockedSeats = tempLockedSeats;
    this.clicked = "";
  };










  
  
  export function addColumn(uniqueColumnNumber, realColumnNumber, place) {
    let tempColumnsNumber = this.hallInfo.columnsNumber;
    let tempCorridors = [...this.hallInfo.columnCorridors];
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.

    
    tempCorridors = tempCorridors.map((corridorNumber) => {
      // move each corridor below
      const CorridorOperation =
        place === "before"
          ? corridorNumber >= uniqueColumnNumber
          : corridorNumber > uniqueColumnNumber;
      if (CorridorOperation) {
        corridorNumber++;
      }
      return corridorNumber;
    });

    tempLockedSeats = tempLockedSeats.map((locked) => {
      // move each lockedSeat Below
      const LockedSeatOperation =
        place === "before"
          ? locked.column >= realColumnNumber
          : locked.column > realColumnNumber;
      if (LockedSeatOperation) {
        locked.column++;
      }
      return locked;
    });


    tempColumnsNumber++;
    this.hallInfo.columnsNumber = tempColumnsNumber;
    this.hallInfo.lockedSeats = tempLockedSeats;
    this.hallInfo.columnCorridors = tempCorridors;
    this.clicked = "";
  };





  

  export function addColumnCorridor(uniqueColumnNumber, place) {
    let tempColumnsNumber = this.hallInfo.columnsNumber;
    let tempCorridors = [...this.hallInfo.columnCorridors];
    let tempLockedSeats = JSON.parse(
      JSON.stringify(this.hallInfo.lockedSeats)
    ); // DEEP COPY THE REAL ONE.

    
    tempCorridors = tempCorridors.map((corridorNumber) => {
      // move each corridor below
      const CorridorOperation =
        place === "before"
          ? corridorNumber >= uniqueColumnNumber
          : corridorNumber > uniqueColumnNumber;
      if (CorridorOperation) {
        corridorNumber++;
      }
      return corridorNumber;
    });


    tempColumnsNumber++;

    if (place === "before") {
        tempCorridors.push(uniqueColumnNumber);
    } else if (place === "after") {
        tempCorridors.push(uniqueColumnNumber + 1);
    }

    this.hallInfo.columnsNumber = tempColumnsNumber;
    this.hallInfo.lockedSeats = tempLockedSeats;
    this.hallInfo.columnCorridors = tempCorridors;
    this.clicked = "";
  };