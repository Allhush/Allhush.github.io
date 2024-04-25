// 2d grid project
// Alliam Hushagen
// May 16th 2024
// Pac-Man

// To Do
// make map // done
// make player movement // done
// Ai ghosts // done
// power pills // need ghosts to finish // need to fix generation
// regular pellets // done 
// death stuff // need to finish movement first
// actual sprites // will do this eventually
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
// holds information for the grid
let grid = [];
// finds out how large the grid can be
let cellSize;
// will hold data for the map
let theMap1;
// currently useless
let q;
// will make start screen
let gameState = "start";
// used for if ghost are venerable or not
let pacState = "weak";
// records current score
let score = 0;
// coordinates for pacman
let pacMan = {
  x: 10,
  y: 16,
  pacPower: 0,
};
// tells much time ghosts are venerable for 
let pillTimer;
// first ghost coordinates
let theGhost1 = {
  x:10,
  y:10,
};
// used to help ghosts move
let ghostmove;
// gets ghosts out of little tunnel thing
let ghostState = "in";

function preload(){
  // loads the map
  theMap1 = loadJSON("Map1.json");
}

function setup() {
  // checks how to display the window
  if (windowHeight > windowWidth){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }
  // makes the grid as large as possible
  cellSize = height/21;
  // makes edges nice
  noStroke();
  // see above
  pillTimer = millis();
}

function draw() {
  background(220);
  displayGrid();
  handleKeys();
  makePac();
  makeGhost1();
  strength();
}

// generates grid to paste map onto
function emptyGrid(rows, columns){
  for(let y = POINTSPOT; y < rows; y ++){
    grid.push([]);
    for(let x = POINTSPOT; x < columns; x ++){
      grid[y].push(0);
    }
  }
}

// not in use
function mousePressed(){
  let x = Math.floor(mouseX /cellSize);
  let y = Math.floor(mouseY/cellSize);

  // toggleCell(x,y);
}

// not in use
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

// tells pacman what direction to move in depending on what key is pressed
function handleKeys(){
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
}

// draws ghost and starts its movement
function makeGhost1(){
  if(gameState === "go"){
    grid[theGhost1.y][theGhost1.x] = GHOST1;
    ghostly(theGhost1, GHOST1);
  }
}


// moves the ghost around
function moveGhosts(x, y, aGhost, GHOSTCOLOUR){
  // makes sure ghost is in bounds
  if(x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y > 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT || grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2 || grid[y][x] === GHOSTPOINT || grid[y][x] === POWERPILL || grid[y][x] === PLAYER)){
    // finds ghosts old position so that it can be replaced later
    let oldX = aGhost.x;
    let oldY = aGhost.y;
    // changes how ghost acts depending on square value
    if (grid[y][x] === POINTSPOT){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOSTCOLOUR;
      grid[oldY][oldX] = POINTSPOT;
    }
    else if(grid[y][x] === NOPOINT){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOSTCOLOUR;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === POWERPILL){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOSTCOLOUR;
      grid[oldY][oldX] = POWERPILL;
    }
    // transfers ghosts from one side of the grid to the other if they go onto the red teleport pads
    else if(grid[y][x] === TELEPORT1){
      aGhost.x = 19;
      aGhost.y = y;
      grid[y][19] = GHOST1;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === TELEPORT2){
      aGhost.x = 1;
      aGhost.y = y;
      grid[y][1] = GHOST1;
      grid[oldY][oldX] = NOPOINT;
    } 
    else if(grid[y][x] === PLAYER && pacState === "weak"){
      gameState = "dead";
    }
  }
}

// gets values to move ghost around
function ghostly(ghost1, GHOSTCOLOURS){
  // gets ghost out of its original position, rather than relying on chance, will change later
  if(ghost1.x === 10 && ghost1.y === 10 && frameCount % 10 === 0 && frameCount >= 100 && gameState === "go"){
    ghostState = "out";
    ghost1.x = 10;
    ghost1.y = 8;
  }
  // decides whether to move on x or y axis
  ghostmove = Math.round(random(1,2));
  // passes along values so that the ghost can move, might change later to make ghosts faster
  if(ghostState === "out" && frameCount % 8 === 0 && ghostmove === 2){
    moveGhosts(ghost1.x + Math.round(random(-1,1)), ghost1.y + 0, ghost1, GHOSTCOLOURS);
  }
  else if(ghostState === "out" && frameCount % 8 === 0 && ghostmove === 1){
    moveGhosts(ghost1.x + 0, ghost1.y + Math.round(random(-1,1)), ghost1, GHOSTCOLOURS);
  }
}

function movePacMan(x, y){
  // checks to see if player is in bounds
  if(x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT || grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2 || grid[y][x] === POWERPILL || grid[y][x] === GHOST1)){
    // used to replace previous square
    let oldX = pacMan.x;
    let oldY = pacMan.y;
    // moves player, adds to score, changes old position
    if (grid[y][x] === POINTSPOT){
      score ++;
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      if(oldX === 0){
        grid[oldY][oldX] = TELEPORT1;
      }
      else if(oldX === GRID_SIZE - 1){
        grid[oldY][oldX] = TELEPORT2;
      }
      else{
        grid[oldY][oldX] = NOPOINT;
      }
    }
    else if(grid[y][x] === NOPOINT){
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      if(oldX === 0){
        grid[oldY][oldX] = TELEPORT1;
      }
      else if(oldX === GRID_SIZE - 1){
        grid[oldY][oldX] = TELEPORT2;
      }
      else{
        grid[oldY][oldX] = NOPOINT;
      }
    }
    else if(grid[y][x] === POWERPILL){
      score ++;
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
      // makes ghost venerable for 5 seconds
      pillTimer = millis() + 5000;
    }
    // transfers player from one side of the grid to the other if they go onto the red teleport pads
    else if(grid[y][x] === TELEPORT1){
      pacMan.x = 19;
      pacMan.y = y;
      grid[y][19] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === TELEPORT2){
      pacMan.x = 1;
      pacMan.y = y;
      grid[y][1] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
    } 
  }
  // q = millis() + 240;
}

// starts the game
function keyPressed(){
  if (key === "z"){
    grid = theMap1.one;
    gameState = "go";
    q = millis();
    powerPellet();
  }
}

// used to decide who kills who
function pacGhostCollison(){
  if(theGhost1.y === pacMan.y && theGhost1.x === pacMan.x){
    if(pacState === "strong"){
      // filler text for now
    }
    else{
      gameState = "dead";
    }
  }
}

// checks whether or not ghost are venerable
function strength(){
  if(pillTimer >= millis()){
    pacState = "strong";
  }
  else{
    pacState = "weak";
  }
  // if(frameCount% 10 === 0){
  //   console.log(pacState);
  // }
}

// displays the grid
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


// makes pacman at his coordinates
function makePac(){
  if(gameState === "go"){
    q = millis();
    grid[pacMan.y][pacMan.x] = PLAYER;
  }
}

// makes coordinates for power pellets
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
  // ensures that power pellets can be there
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