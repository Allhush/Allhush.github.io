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
let state = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  // this is dumb, check for right way later
  cellSize = height/grid.length;
  noStroke();
}

function keyPressed(){
  if(key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if(key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}

function draw() {
  background("red");
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
  if(v < GRID_SIZE && q < GRID_SIZE){
    toggleCell(v,q);
  }
  if(v - 1 < GRID_SIZE && v - 1 > 0 && q < GRID_SIZE){
    toggleCell(v,q);
  }
  if(v + 1 < GRID_SIZE && v + 1 > 0 && q < GRID_SIZE){
    toggleCell(v,q);
  }
  if(q + 1 < GRID_SIZE && q + 1 > 0 && v < GRID_SIZE){
    toggleCell(v,q);
  }
  if(q - 1 < GRID_SIZE && q - 1 > 0 && v < GRID_SIZE){
    toggleCell(v,q);
  }

}


function toggleCell(x, y){
  if(grid[x][y] === 1){
    grid[x][y] = 0;
  }
  else if(grid[x][y] === 0){
    grid[x][y] = 1;
  }
}