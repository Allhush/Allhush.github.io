// Top stuff isn't my code and is robbed from wmci CS30 class demos
// 2D Grid
// Dan Schellenberg
// Apr 9, 2024

// if you are hard-coding a level, I'd use something like this

// let grid = [[1, 0, 0, 1],
//             [0, 1, 0, 1],
//             [1, 1, 0, 0],
//             [1, 0, 1, 1],
//             [0, 0, 0, 1],
//             [0, 0, 1, 1],
//             [0, 1, 0, 1],
//             [0, 0, 0, 1]];

let grid;
let cellSize;
const GRID_SIZE = 30;
let toggleStyle = "self";
let isAutoPlayOn = false;

function setup() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }

  //if randomizing the grid, do this:
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  
  //this is dumb -- should check if this is the right size!
  cellSize = height/grid.length;
}

function windowResized() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }

  cellSize = height/grid.length;
}

function draw() {
  background(220);

  if (isAutoPlayOn && frameCount % 5 === 0) {
    grid = updateGrid();
  }

  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "n") {
    toggleStyle = "neighbours";
  }

  if (key === "s") {
    toggleStyle = "self";
  }

  if (key === " ") {
    grid = updateGrid();
  }

  if (key === "a") {
    isAutoPlayOn = !isAutoPlayOn;
  }
}

function updateGrid() {
  //need a second array, so I don't mess with the grid while counting neighbours
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  //look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let neighbours = 0;

      //look at every cell in a 3x3 grid around the cell
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //avoid going off the edge of the grid
          if (x+j >= 0 && x+j < GRID_SIZE && y+i >= 0 && y+i < GRID_SIZE) {
            neighbours += grid[y + i][x + j];
          }
        }
      }

      //don't count yourself in the neighbours
      neighbours -= grid[y][x];


      //apply the rules
      if (grid[y][x] === 1) { //currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) { //currently dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //toggle self
  toggleCell(x, y);

  // and NESW neighbours, if style is set to neighbours
  if (toggleStyle === "neighbours") {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);
  }
}

function toggleCell(x, y) {
  // make sure the cell you're toggling is in the grid...
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0) {
    //toggle the color of the cell
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      //half the time, be a 1. Other half, be a 0.
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function generateEmptyGrid(cols, rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

// // 2D grid
// // Alliam Hushagen
// // April 9th 2024

// // use below stuff for hard coding things

// // let grid = [[1,0,0,1],
// //             [0,1,0,1],
// //             [0,0,0,1],
// //             [1,1,0,0],
// //             [1,0,1,1],
// //             [0,0,0,1],
// //             [0,0,1,1],
// //             [0,1,1,1],];

// // if randomizing generation do this
// let grid;
// let cellSize;
// const GRID_SIZE = 30;
// let stateNS = "n";
// let isAutoPlayOn = false;

// function setup() {
//   if (windowHeight > windowWidth){
//     createCanvas(windowWidth, windowWidth);
//   }
//   else{
//     createCanvas(windowHeight, windowHeight);
//   }
//   grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
//   cellSize = height/grid.length;
// }

// function windowResized() {
//   if (windowHeight > windowWidth){
//     resizeCanvas(windowWidth, windowWidth);
//   }
//   else{
//     resizeCanvas(windowHeight, windowHeight);
//   }
//   cellSize = height/grid.length;
// }


// function draw() {
//   background(220);
//   if (isAutoPlayOn && frameCount % 5 === 0) {
//     grid = updateGrid();
//   }
//   displayGrid();
// }

// function keyPressed(){
//   if(key === "r"){
//     grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
//   }
//   if(key === "e"){
//     grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
//   }
//   if(key === "n"){
//     stateNS = "n";
//   }
//   if(key === "s"){
//     stateNS = "s";
//   }
//   if(key === " "){
//     grid = updateGrid();
//   }
//   if(key === "a"){
//     isAutoPlayOn = ! isAutoPlayOn;
//   }
// }

// function updateGrid(){
//   // need second array so that og grid can't be messed up in counting
//   let nextTurn= generateEmptyGrid(GRID_SIZE, GRID_SIZE);

//   // look at every cell
//   for(let y = 0; y < GRID_SIZE; y ++){
//     for(let x = 0; x < GRID_SIZE; x ++){
//       let neighbors = 0;


//       // look at neighbor cells
//       for(let i = -1; i < 1; i++){
//         for(let j = -1; j < 1; j++){
//           // avoid off grids
//           if(x + j >= 0 && x + j <= GRID_SIZE && y  + i >= 0 && y + i < GRID_SIZE){
//             neighbors += grid[y+i][x+j];
//           }
//         }
//       }

//       // dont count self
//       neighbors -= grid[y][x];

//       // apply rules
//       if(grid[y][x] === 1){// alive
//         if(neighbors === 2 || neighbors === 3){
//           nextTurn[y][x] = 1;
//         }
//         else{
//           nextTurn[y][x] = 0;
//         }
//       }
//       if(grid[y][x]===0){
//         if(neighbors === 3){
//           nextTurn[y][x] = 1;
//         }
//         else{
//           nextTurn[y][x] = 0;
//         }
//       }
//     }
//   }
//   return nextTurn;
// }


// function displayGrid(){
//   for(let y = 0; y < grid.length; y++){
//     for(let x = 0; x < grid[y].length; x ++){
//       if(grid[y][x] === 1){
//         fill(0);
//       }
//       else{
//         fill(255);
//       }
//       square(x*cellSize, y*cellSize, cellSize);
//     }
//   }
// }

// function generateRandomGrid(columns, rows){
//   let emptyArray = [];
//   for(let y = 0; y < rows; y ++){
//     emptyArray.push([]);
//     for(let x = 0; x < columns; x ++){
//       if(random(100) < 50){
//         emptyArray[y].push(0);
//       }
//       else{
//         emptyArray[y].push(1);
//       }
//     }
//   }
//   return emptyArray;
// }

// function generateEmptyGrid(columns, rows){
//   let emptyArray = [];
//   for(let y = 0; y < rows; y ++){
//     emptyArray.push([]);
//     for(let x = 0; x < columns; x ++){
//       emptyArray[y].push(0);
//     }
//   }
//   return emptyArray;
// }

// function mousePressed(){
//   let v = Math.floor(mouseX/cellSize);
//   let q = Math.floor(mouseY/cellSize);
//   if(stateNS === "n"){
//     toggleCell(v,q);
//     toggleCell(v + 1,q);
//     toggleCell(v,q +1);
//     toggleCell(v-1,q);
//     toggleCell(v,q-1);
//   }
//   else if(stateNS === "s"){
//     toggleCell(v,q);
//   }

// }

// function toggleCell(x, y){
//   if (x < GRID_SIZE && y < GRID_SIZE &&
//     x >= 0 && y >= 0) {
//     if(grid[y][x] === 0){
//       grid[y][x] = 1;
//     }
//     else{
//       grid[y][x] = 0;
//     }
//   }
// }