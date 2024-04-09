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

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  // this is dumb, check for right way later
  cellSize = height/grid.length;
}

function keyPressed(){
  if(key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
}

function draw() {
  background(220);
  displayGrid();
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

function mousePressed(){
  for(let y = 0; y < GRID_SIZE; y++){
    for(let x = 0; x < GRID_SIZE; x ++){
      if (mouseX > x*10 - 5 && mouseX < x*10 + 5 && mouseY > y*10 - 5 && mouseY < y*10 + 5){
        if(grid[y][x] === 0){
          grid[y][x] = 1;
        }
        else{
          grid[y][x];
        }
        
      }
    }
  }
}