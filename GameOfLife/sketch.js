// 2D grid
// Alliam Hushagen
// April 9th 2024

// use below stuff for hard coding things

// let grid = [[1,0,0,1],
//             [0,1,0,1],
//             [0,0,0,1],
//             [1,1,0,0],
//             [1,0,1,1],
//             [0,0,0,1],
//             [0,0,1,1],
//             [0,1,1,1],];

// if randomizing generation do this
let grid;
const GRID_SIZE = 10;
let stateNS = "n";

let cellSize;
let state = 0;
let isAutoPlayOn = false;

function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  cellSize = height/grid.length;
  noStroke();
}



function draw() {
  background("red");
  if(isAutoPlayOn){
    grid = updateGrid;
  }
  displayGrid();
}

function keyPressed(){
  if(key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if(key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if(key === "n"){
    stateNS = "n";
  }
  if(key === "s"){
    stateNS = "s";
  }
  if(key === " "){
    grid = updateGrid();
  }
  if(key === "a"){
    isAutoPlayOn = ! isAutoPlayOn;
  }
}

function updateGrid(){
  // need second array so that og grid can't be messed up in counting
  let nextTurn= generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  // look at every cell
  for(let y = 0; y < GRID_SIZE; y ++){
    for(let x = 0; x < GRID_SIZE; x ++){
      let neighbors = 0;
      // look at neighbor cells
      for(let i = -1; i < 1; i++){
        for(let j = -1; j < 1; j++){
          // avoid off grids
          if(x + j >= 0 && x + j <= GRID_SIZE && y  + i >= 0 && y + i < GRID_SIZE){
            neighbors += grid[y+i][x+j];
          }
        }
      }

      // dont count self
      neighbors -+ grid[y][x];

      // apply rules
      if(grid[y][x] === 1){// alive
        if(neighbors === 2 || neighbors === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
      if(grid[y][x]===0){
        if(neighbors === 3){
          nextTurn[y][x] === 1;
        }
      }
    }
  }
  return nextTurn;
}
function windowResized() {
  if (windowHeight > windowWidth){
    resizeCanvas(windowWidth, windowWidth);
  }
  else{
    resizeCanvas(windowHeight, windowHeight);
  }
  cellSize = height/grid.length;
}

function displayGrid(){
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x ++){
      if(grid[y][x] === 1){
        fill(0);
      }
      else{
        fill(255);
      }
      square(x*cellSize, y*cellSize, cellSize);
    }
  }
}

function generateRandomGrid(columns, rows){
  let emptyArray = [];
  for(let y = 0; y < rows; y ++){
    emptyArray.push([]);
    for(let x = 0; x < columns; x ++){
      if(random(100) < 50){
        emptyArray[y].push(0);
      }
      else{
        emptyArray[y].push(1);
      }
    }
  }
  return emptyArray;
}

function generateEmptyGrid(columns, rows){
  let emptyArray = [];
  for(let y = 0; y < rows; y ++){
    emptyArray.push([]);
    for(let x = 0; x < columns; x ++){
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

function mousePressed(){
  let v = Math.floor(mouseX/cellSize);
  let q = Math.floor(mouseY/cellSize);
  if(stateNS === "n"){
    toggleCell(v,q);
    toggleCell(v + 1,q);
    toggleCell(v,q +1);
    toggleCell(v-1,q);
    toggleCell(v,q-1);
  }
  else if(stateNS === "s"){
    toggleCell(v,q);
  }

}

function toggleCell(x, y){
  if (x < GRID_SIZE && y < GRID_SIZE &&
    x >= 0 && y >= 0) {
    if(grid[y][x] === 0){
      grid[y][x] = 1;
    }
    else{
      grid[y][x] = 0;
    }
  }
}