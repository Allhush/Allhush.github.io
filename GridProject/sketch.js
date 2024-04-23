// 2d grid project
// Alliam Hushagen
// May 16th 2024
// Pac-Man

// To Do
// make map // done
// make player movement // done
// Ai ghosts
// power pills // need ghosts to finish
// regular pellets // done 
// death stuff
// actual sprites
// ??? to be determined

const GRID_SIZE = 21;
const POINTSPOT = 0;
const WALL = 1;
const PLAYER = 2;
const NOPOINT = 3;
const GHOST1 = 4;
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
let gameState = "start";
let pacState = "weak";
let score = 0;
let pacMan = {
  x: 10,
  y: 16,
  pacPower: 0,
};
let theGhost1 = {
  x:10,
  y:10,
};
let ghostmove;
let ghostState = "in";

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
  makePac();
  makeGhost1();
  ghostly();
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
  //   gameState = "go";
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

function makeGhost1(){
  if(gameState === "go"){
    grid[theGhost1.y][theGhost1.x] = GHOST1;
  }
}

function moveGhosts(x, y, aGhost){
  if(x < GRID_SIZE && y < GRID_SIZE && x > 0 && y > 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT || grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2 || grid[y][x] === GHOSTPOINT || grid[y][x] === POWERPILL)){
    let oldX = aGhost.x;
    let oldY = aGhost.y;
    if (grid[y][x] === POINTSPOT){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOST1;
      grid[oldY][oldX] = POINTSPOT;
    }
    else if(grid[y][x] === NOPOINT){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOST1;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === POWERPILL){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOST1;
      grid[oldY][oldX] = POWERPILL;
    }
  }
}

function ghostly(ghost1){
  if(ghost1.x === 10 && ghost1.y === 10 && frameCount % 10 === 0 && frameCount >= 100 && gameState === "go"){
    ghostState = "out";
    ghost1.x = 10;
    ghost1.y = 8;
  }
  ghostmove = Math.round(random(1,2));
  if(ghostState === "out" && frameCount % 10 === 0 && ghostmove === 2){
    moveGhosts(ghost1.x + Math.round(random(-1,1)), ghost1.y + 0, ghost1);
  }
  else if(ghostState === "out" && frameCount % 10 === 0 && ghostmove === 1){
    moveGhosts(ghost1.x + 0, ghost1.y + Math.round(random(-1,1)), ghost1);
  }
}

function movePacMan(x, y){
  if(x < GRID_SIZE && y < GRID_SIZE && x > 0 && y > 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT || grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2 || grid[y][x] === POWERPILL)){
    let oldX = pacMan.x;
    let oldY = pacMan.y;
    if (grid[y][x] === POINTSPOT){
      score ++;
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === NOPOINT){
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === POWERPILL){
      score ++;
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
      pacState = "strong";
    }
    // else if(grid[y][x] === TELEPORT1){
    //   pacMan.x = x;
    //   pacMan.y = y;
    //   grid[y][x] = PLAYER;
    // }
    // else if(grid[y][x] === TELEPORT2){

    // }
     
  }
  q = millis() + 240;
}

function keyPressed(){
  if (key === "z"){
    grid = theMap1.one;
    gameState = "go";
    q = millis();
    powerPellet();
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
      else if(grid[y][x] === POWERPILL){
        fill("green");
      }
      else if(grid[y][x] === GHOST1){
        fill(170);
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}



function makePac(){
  if(gameState === "go"){
    q = millis();
    grid[pacMan.y][pacMan.x] = PLAYER;
  }
}

function powerPellet(){
  let pow1 = {
    x : Math.round(random(1, 19)),
    y : Math.round(random(1, 19)),
    x1:Math.round(random(1, 19)),
    y1:Math.round(random(1, 19)),
    x2:Math.round(random(1, 19)),
    y2:Math.round(random(1, 19)),
    x3:Math.round(random(1, 19)),
    y3:Math.round(random(1, 19)),
  };
  if(grid[pow1.y][pow1.x] !== WALL){
    grid[pow1.y][pow1.x] = POWERPILL;
  }
  if(grid[pow1.y1][pow1.x1] !== WALL){
    grid[pow1.y1][pow1.x1] = POWERPILL;
  }
  if(grid[pow1.y2][pow1.x2] !== WALL){
    grid[pow1.y2][pow1.x2] = POWERPILL;
  }
  if(grid[pow1.y3][pow1.x3] !== WALL){
    grid[pow1.y3][pow1.x3] = POWERPILL;
  }
}