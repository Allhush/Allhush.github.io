// Character in 2d grid
// Alliam Hushagen
// April 9th 2024


// if randomizing generation do this
let grid;
const GRID_SIZE = 100;
const PLAYER = 2;
const OPENTILE = 0;
const IMPASSIBLE = 1;
let player = {
  x: 0,
  y: 0,
};
let cellSize;
let grassIMG;
let wallIMG;

function preload(){
  grassIMG = loadImage("grass1.png");
  wallIMG = loadImage("stone wall 1.png");
}


function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  cellSize = height/grid.length;

  // add player to the grid
  grid[player.y][player.x] = PLAYER;
}



function draw() {
  displayGrid();
}

function keyPressed(){
  if(key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if(key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }

  if(key === "w"){
    movePlayer(player.x + 0, player.y - 1); // 0 on x axis, -1 on y axis
  }
  if(key === "s"){
    movePlayer(player.x + 0, player.y + 1);
  }
  if(key === "a"){
    movePlayer(player.x - 1, player.y + 0);
  }
  if(key === "d"){
    movePlayer(player.x + 1, player.y + 0);
  }
}

function movePlayer(x,y){
  if(x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0 && grid[y][x] === OPENTILE){ // don't move off the grid and don't go into closed tiles
    // previous player location
    let oldY = player.y;
    let oldX = player.x;

    // reset old location
    grid[oldY][oldX] = OPENTILE;

    // move the player
    player.x = x;
    player.y = y;
    grid[player.y][player.x] = PLAYER;
    
  }
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
      if(grid[y][x] === IMPASSIBLE){
        image(wallIMG,x*cellSize, y*cellSize, cellSize);
      }
      else if(grid[y][x] === OPENTILE){
        image(grassIMG,x*cellSize, y*cellSize, cellSize);
      }
      else if(grid[y][x] === PLAYER){
        fill("red");
        square(x*cellSize, y*cellSize, cellSize);
      }
      
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
  toggleCell(v,q);
}

function toggleCell(x, y){
  if(x < GRID_SIZE && y < GRID_SIZE &&
    x >= 0 && y >= 0){
    if(grid[y][x] === IMPASSIBLE){
      grid[y][x] = OPENTILE;
    }
    else if(grid[y][x] === OPENTILE){
      grid[y][x] = IMPASSIBLE;
    }
  }
}