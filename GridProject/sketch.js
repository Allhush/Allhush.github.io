// 2d grid project
// Alliam Hushagen
// May 16th 2024
// Pac-Man

// To Do
// make map // done
// make movement
// Ai ghosts
// power pills
// regular pellets
// death stuff
// actual sprites
// ??? to be determined

const GRID_SIZE = 21;
const POINTSPOT = 0;
const WALL = 1;
const PLAYER = 2;
const NOPOINT = 3;
const GHOST = 4;
let grid = [];
let cellSize = 20;
let theMap1;
let moveState = "stopped";
let q;
let pacMan = {
  x: 10,
  y: 16,
};

function preload(){
  theMap1 = loadJSON("Map1.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  displayGrid();
  movePacMan();
}

function emptyGrid(rows, columns){
  for(let y = POINTSPOT; y < rows; y ++){
    grid.push([]);
    for(let x = POINTSPOT; x < columns; x ++){
      grid[y].push(0);
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX /cellSize);
  let y = Math.floor(mouseY/cellSize);

  // toggleCell(x,y);
}

function toggleCell(x, y) {
  if (x < GRID_SIZE && y < GRID_SIZE &&
      x >= 0 && y >= 0) {
    if (grid[y][x] === POINTSPOT) {
      grid[y][x] = WALL;
    }
    else {
      grid[y][x] = POINTSPOT;
    }
  }
}

function keyPressed(){
  if (key === "z"){
    grid = theMap1.one;
    grid[pacMan.y][pacMan.x] = PLAYER;
  }
  if(key === "w"){
    moveState = "up";
  }
  if(key === "s"){
    moveState = "down";
  }
  if(key === "a"){
    moveState = "left";
    q = millis();
  }
  if(key === "d"){
    moveState = "right";
  }
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === WALL) {
        fill("blue");
      }
      else if (grid[y][x] === POINTSPOT){
        fill("black");
      }
      else if (grid[y][x] === PLAYER){
        fill("yellow");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function movePacMan(){
  if(moveState === "left" && (grid[pacMan.y][pacMan.x -1] === POINTSPOT || grid[pacMan.y][pacMan.x -1] === NOPOINT) && millis()> q){
    pacMan.x --;
  }
  q = millis() + 60;
}