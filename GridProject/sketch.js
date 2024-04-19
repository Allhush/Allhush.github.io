// 2d grid project
// Alliam Hushagen
// May 16th 2024
// Pac-Man

// To Do
// make map // done
// make player movement // done
// Ai ghosts
// power pills
// regular pellets // done 
// death stuff
// actual sprites
// ??? to be determined

const GRID_SIZE = 21;
const POINTSPOT = 0;
const WALL = 1;
const PLAYER = 2;
const NOPOINT = 3;
const GHOST = 4;
const TELEPORT1 = 5;
const TELEPORT2 = 10;
const GHOSTPOINT = 6;
const POWERPILL = 7;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
let grid = [];
let cellSize;
let theMap1;
let moveState = "stopped";
let q;
let state = "start";
let score = 0;
let pacMan = {
  x: 10,
  y: 16,
};

function preload(){
  theMap1 = loadJSON("Map1.json");
}

function setup() {
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/21;
  noStroke();
}

function draw() {
  background(220);
  displayGrid();
  handleKeys();
  // movePacMan();
  makePac();

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

function handleKeys(){
  // if (key === "z"){
  //   grid = theMap1.one;
  //   state = "go";
  // }
  if(keyIsDown(KEY_S) && frameCount % 10 === 0){
    movePacMan(pacMan.x, pacMan.y + 1);
  }
  else if(keyIsDown(KEY_W) && frameCount % 10 === 0){
    movePacMan(pacMan.x, pacMan.y - 1);
  }
  else if(keyIsDown(KEY_A) && frameCount % 10 === 0){
    movePacMan(pacMan.x - 1, pacMan.y);
  }
  else if(keyIsDown(KEY_D) && frameCount % 10 === 0){
    movePacMan(pacMan.x + 1, pacMan.y);
  }
  // if(key === "s"){
  //   movePacMan(pacMan.x, pacMan.y + 1);
  // }
  // if(key === "a"){
  //   movePacMan(pacMan.x - 1, pacMan.y);
  // }
  // if(key === "d"){
  //   movePacMan(pacMan.x + 1, pacMan.y);
  // }
}

function movePacMan(x, y){
  if(x < GRID_SIZE && y < GRID_SIZE && x > 0 && y > 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT)){
    let oldX = pacMan.x;
    let oldY = pacMan.y;
    if (grid[y][x] === POINTSPOT){
      score ++;
    }

    pacMan.x = x;
    pacMan.y = y;
    grid[y][x] = PLAYER;
    grid[oldY][oldX] = NOPOINT; 
  }
  q = millis() + 240;
}

function keyPressed(){
  if (key === "z"){
    grid = theMap1.one;
    state = "go";
    q = millis();
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
      else if (grid[y][x] === NOPOINT){
        fill("white");
      }
      else if (grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2){
        fill("red");
      }
      else if(grid[y][x] === GHOSTPOINT){
        fill("blue");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}



function makePac(){
  if(state === "go"){
    q = millis();
    grid[pacMan.y][pacMan.x] = PLAYER;
  }
}