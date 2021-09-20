//
//Things I'll need
//

//garden -- a 2d array/matrix, where each cell is a number representing the number of carrots

//new leveret function -- initializes the start point for the leveret AKA the middle cell.

//lunch count function -- a function that tallies up and returns all the carrots the leveret eats.

//find next move function -- a function that finds the next move 

//move and eat function -- function that calls the find next move, passes the number to lunch count total, and sets the carrot count in that cell to 0

//example garden for testing
garden = [
    [2, 3, 1, 4, 2, 2, 3],
    [2, 3, 0, 4, 0, 3, 0],
    [1, 7, 0, 2, 1, 2, 3],
    [9, 3, 0, 4, 2, 0, 3],
]

garden2 =[
    [3,6,8,4,2],
    [0,2,5,1,0],
    [4,4,4,4,4],
    [0,1,0,1,0],
]


function newBabyLeveret(garden){
    //returns the midpoint of the array as a tuple
    //4 possibilities
    let midpoints = [];
    //num rows and num columns are both even --> 4 midpoints
    //num rows is even num columns is odd --> 2 midpoints, arranged vertically
    let numRows = garden.length;
    let numCols = garden[0].length;

    if(numRows%2 == 0){
        if(numCols%2 == 0){
            //num rows and num columns are both even --> 4 midpoints
            midpoints.push([numRows/2, numCols/2])
            midpoints.push([numRows/2 -1, numCols/2])
            midpoints.push([numRows/2, numCols/2 -1])
            midpoints.push([numRows/2 -1, numCols/2 -1])

        }else{
            //num rows is even num columns is odd --> 2 midpoints, arranged vertically
            midpoints.push([numRows/2, Math.floor(numCols/2)])
            midpoints.push([numRows/2 - 1, Math.floor(numCols/2)])


        }
    }else{
        if(numCols%2 == 0){
            //num rows is odd num columns is even -- 2 midpoints, arranged horizontally
            midpoints.push([Math.floor(numRows/2), numCols/2])
            midpoints.push([Math.floor(numRows/2), numCols/2 -1])

        }else{
            //num rows and num columns are both odd --> 1 midpoint
            midpoints.push([Math.floor(numRows/2), Math.floor(numCols/2)])
        }
    }
    return mostCarrots(midpoints, garden);
}

//makes a new leveret at the mid point
//eats carrots
//finds next move
//continues eating carrots until there are no more carrots
//returns number of carrots eaten
function lunchCount(garden){
    let carrotsEaten = 0;
    let currentLocation = newBabyLeveret(garden);
    let stillEating = true;
    while(stillEating){
        carrotsEaten += eatCarrots(currentLocation, garden);
        //console.log(`I have eaten ${carrotsEaten} carrots so far.`)
        //console.log(`I am at ${currentLocation}`)
        //console.log(garden);
        currentLocation = findNextMove(currentLocation, garden);
        if(currentLocation.length ===0){
            stillEating = false;
        }
    }
    console.log(`Total Number of carrots eaten: ${carrotsEaten}`)
    return carrotsEaten;
}

//takes in an array of locations and returns has the most carrots
function mostCarrots(locArray, garden){
    let max = 0;
    let maxLocation = [];
    for(let location of locArray){
        let row = location[0];
        let column = location [1];
        if(garden[row][column] > max){
            max = garden[row][column];
            maxLocation = location;
        }
    }
    if(max = 0){
        return [];
    }
    return maxLocation;
}

//takes current location as array of indices
//finds the possible moves that are not equal to 0 carrots
//pushes them into an array, returns array of possible moves
function findPossibleMoves(currentLocation, garden){
    let possibleMoves = [];
    let currentRow = currentLocation[0];
    let currentColumn = currentLocation[1];
    //check the surrounding spots
    //add them in WNES order
    //W
    if(currentColumn > 0 && garden[currentRow][currentColumn-1] !== 0){
        possibleMoves.push([currentRow, currentColumn -1]);
    }
    //N
    if(currentRow > 0 && garden[currentRow-1][currentColumn] !== 0){
        possibleMoves.push([currentRow-1, currentColumn]);
    }
    //E
    if(currentColumn < garden[currentRow].length -1 && garden[currentRow][currentColumn + 1] !== 0){
        possibleMoves.push([currentRow, currentColumn + 1]);
    }
    //S
    if(currentRow < garden.length -1 && garden[currentRow + 1][currentColumn] !==0){
        possibleMoves.push([currentRow + 1, currentColumn])
    }
    return possibleMoves;
}

function findNextMove(currentLocation, garden){
    nextMove = mostCarrots(findPossibleMoves(currentLocation, garden), garden);
    return nextMove;
}

//takes a location as an array
function eatCarrots(location, garden){
    let eatenCarrots = garden[location[0]][location[1]];
    garden[location[0]][location[1]] = 0;
    return eatenCarrots;
}


//run for debugging
lunchCount(garden);
lunchCount(garden2);
