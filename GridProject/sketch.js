// 2d grid project
// Alliam Hushagen
// May 16th 2024
// Pac-Man

// To Do
// make map
// make movement
// Ai ghosts
// power pills
// regular pellets
// death stuff
// actual sprites
// ??? to be determined

const GRID_SIZE = 21;
let grid = [];
let cellSize = 20;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayGrid();
}

function emptyGrid(rows, columns){
  for(let y = 0; y < rows; y ++){
    grid.push([]);
    for(let x = 0; x < columns; x ++){
      grid[y].push(0);
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX /cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x,y);
}

function toggleCell(x, y) {
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else {
      grid[y][x] = 0;
    }
  }
}

function keyPressed(){
  if (key === "a"){
    emptyGrid(GRID_SIZE, GRID_SIZE);
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