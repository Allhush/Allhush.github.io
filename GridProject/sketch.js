// 2d grid project
// Alliam Hushagen
// May 16th 2024
// Pac-Man

// To Do
// make map // done
// make player movement // done
// Ai ghosts // done
// regular pellets // done 
// power pills // done
// death stuff // done
// death screen + resetting game stuff // done 
// add more ghosts // done
// music?
// fix ghost moving stuff 
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
const GHOST2 = 8;
const GHOST3 = 9;
const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const GHOSTPOINT2 = 11;
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
let theGhost2 = {
  x:11,
  y:10,
};
let theGhost3 = {
  x:9,
  y:10,
};
// used to help ghosts move
let ghostmove;
// gets ghosts out of little tunnel thing
let ghostState = "in";
// checks if pills can spawn or not
let pillState = "sober";
// holds power pill variables
let powerPills = [];
// checks how many pills there are
let pillCounter = 0;
let ghost1Image;
let ghost2Image;
let ghost3Image;
let normalPelletImage;
let powerPelletImage;
let pacImg1;
let wallImg;
let noPointImg;
let scaredGhostImg;
let pacImg0;
let pacTravelState = "right";
let showState = "no";
// sees how close player is to winning
let winCounter = 0;

function preload(){
  // loads the map
  theMap1 = loadJSON("Map1.json");
  ghost1Image = loadImage("assets/ghost1.png");
  pointspot = loadImage("assets/normalPellet.png");
  ghost2Image = loadImage("assets/ghost2.png");
  ghost3Image = loadImage("assets/ghost3.png");
  powerPelletImage = loadImage("assets/powerPellet.png");
  pacImg1 = loadImage("assets/pacManRight.png");
  wallImg = loadImage("assets/wall.png");
  noPointImg = loadImage("assets/noPoint.png");
  pacImg2 = loadImage("assets/pacManDown.png");
  pacImg3 = loadImage("assets/pacManLeft.png");
  pacImg4= loadImage("assets/pacManUp.png");
  pacImg0 = loadImage("assets/closedPacMan.png")
  scaredGhostImg = loadImage("assets/scaredGhost.png");
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
  background(0);
  gameStart();
  if(gameState === "go"){
    displayGrid();
    handleKeys();
    makePac();
    makeGhosts(theGhost1, GHOST1);
    makeGhosts(theGhost2, GHOST2);
    makeGhosts(theGhost3, GHOST3);
    strength();
    pacGhostCollison();
    openClose();
    scoreKeep();
    checkForWin();
    showStateDecide();
  }
  youWon();
  deathScreen();
}


// opens and closes pacMans mouth
function showStateDecide(){
  if(frameCount%25 === 0 && frameCount%50 !== 0){
    showState = "yes";
  }
  else if(frameCount%50 === 0){
    showState = "no";
  }
}

function gameStart(){
  if(gameState === "start"){
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Press z to start", width/2, height/2);
  }
}

function youWon(){
  if(gameState === "won"){
    background(0);
    // gets rid of remaining powerpills
    for(let q = 0; q < powerPills.length; q ++){
      powerPills.pop();
    }
    // resets all coordinates
    pacMan.x = 10;
    pacMan.y = 16; 
    theGhost1.x = 10;
    theGhost1.y =8;
    theGhost2.x = 11;
    theGhost2.y =8;
    theGhost3.x = 9;
    theGhost3.y =8;
    // resets powerpill function
    pillCounter = 0;
    pillState = "sober";
    // resets map
    for(let y = 0; y < grid.length; y ++){
      for(let x = 0; x < grid[0].length; x ++){
        if(grid[y][x] === NOPOINT  || grid[y][x] === GHOST1 || grid[y][x] === GHOST2 || grid[y][x] === GHOST3 || grid[y][x] === PLAYER || grid[y][x] === POWERPILL){
          grid[y][x] = POINTSPOT;
        }
        
      }
    }
    grid[10][9] = GHOSTPOINT2;
    grid[10][10] = GHOSTPOINT2;
    grid[10][11] = GHOSTPOINT2;
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("red");
    text("you won!", width/2, height/2);
    text("your score was " + score, width/2, 5*height/8);
  }
}

// keeps score for the player
function scoreKeep(){
  fill("yellow");
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Score "+score, 0, 0, width, cellSize);
}

// creates death screen for player
function deathScreen(){
  // checks if player is alive
  if(gameState === "dead"){
    background(0);
    // gets rid of remaining powerpills
    for(let q = 0; q < powerPills.length; q ++){
      powerPills.pop();
    }
    // resets all coordinates
    pacMan.x = 10;
    pacMan.y = 16; 
    theGhost1.x = 10;
    theGhost1.y =8;
    theGhost2.x = 11;
    theGhost2.y =8;
    theGhost3.x = 9;
    theGhost3.y =8;
    // resets powerpill function
    pillCounter = 0;
    pillState = "sober";
    // resets map
    for(let y = 0; y < grid.length; y ++){
      for(let x = 0; x < grid[0].length; x ++){
        if(grid[y][x] === NOPOINT  || grid[y][x] === GHOST1 || grid[y][x] === GHOST2 || grid[y][x] === GHOST3 || grid[y][x] === PLAYER || grid[y][x] === POWERPILL){
          grid[y][x] = POINTSPOT;
        }
        
      }
    }
    grid[10][9] = GHOSTPOINT2;
    grid[10][10] = GHOSTPOINT2;
    grid[10][11] = GHOSTPOINT2;
    textAlign(CENTER, CENTER);
    textSize(20);
    fill("red");
    text("you died", width/2, height/2);
    text("your score was " + score, width/2, 5*height/8);
  }
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

// checks if the player has won
function checkForWin(){
  for(let y = 0; y < grid.length; y++){
    for(let x = 0; x < grid[y].length; x ++){
      if(grid[y][x] === POINTSPOT || grid[y][x] === POWERPILL){
        winCounter ++;
      }
    }
  }
  // console.log(winCounter)
  if(winCounter === 0){
    gameState = "won";
  }
  winCounter = 0;
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
    pacTravelState = "down";
    movePacMan(pacMan.x, pacMan.y + 1);
  }
  else if(keyIsDown(KEY_W) && frameCount % 10 === 0){
    pacTravelState = "up";
    movePacMan(pacMan.x, pacMan.y - 1);
  }
  else if(keyIsDown(KEY_A) && frameCount % 10 === 0){
    pacTravelState = "left";
    movePacMan(pacMan.x - 1, pacMan.y);
  }
  else if(keyIsDown(KEY_D) && frameCount % 10 === 0){
    pacTravelState = "right";
    movePacMan(pacMan.x + 1, pacMan.y);
  }
}

// draws ghost and starts its movement
function makeGhosts(ghosty, ghostNumber){
  if(gameState === "go"){
    grid[ghosty.y][ghosty.x] = ghostNumber;
    ghostly(ghosty, ghostNumber);
  }
}


// moves the ghost around
function moveGhosts(x, y, aGhost, GHOSTCOLOUR){
  // makes sure ghost is in bounds
  if(x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y > 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT || grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2 || grid[y][x] === GHOSTPOINT || grid[y][x] === POWERPILL || grid[y][x] === PLAYER || grid[y][x] === GHOST1 || grid[y][x] === GHOST2 || grid[y][x] === GHOST3)){
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
      grid[y][19] = GHOSTCOLOUR;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === TELEPORT2){
      aGhost.x = 1;
      aGhost.y = y;
      grid[y][1] = GHOSTCOLOUR;
      grid[oldY][oldX] = NOPOINT;
    } 
    else if(grid[y][x] === GHOST1 && GHOSTCOLOUR !== GHOST1){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOSTCOLOUR;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === GHOST2 && GHOSTCOLOUR !== GHOST2){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOSTCOLOUR;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === GHOST3 && GHOSTCOLOUR !== GHOST3){
      aGhost.x = x;
      aGhost.y = y;
      grid[y][x] = GHOSTCOLOUR;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === PLAYER && pacState === "weak"){
      gameState = "dead";
      // aGhost.x = x;
      // aGhost.y = y;
      // grid[y][x] = PLAYER;
      // grid[oldY][oldX] = NOPOINT;
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
  if(x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0 && (grid[y][x] === POINTSPOT || grid[y][x] === NOPOINT || grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2 || grid[y][x] === POWERPILL || grid[y][x] === GHOST1 || grid[y][x] === GHOST2 || grid[y][x] === GHOST3)){
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
    else if(grid[y][x] === GHOST1){
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === GHOST2){
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
      grid[oldY][oldX] = NOPOINT;
    }
    else if(grid[y][x] === GHOST3){
      pacMan.x = x;
      pacMan.y = y;
      grid[y][x] = PLAYER;
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
    q = millis() + 100000;
    score = 0;
    for(let q = 0; q < 8; q ++){
      generatePowerPellet();
      displayPowerPellet();
    }
  }
}

// animates pacMan
function openClose(){
  if(millis() > q){
    q += 100000;
  }
}

// used to decide who kills who
function pacGhostCollison(){
  if(theGhost1.y === pacMan.y && theGhost1.x === pacMan.x){
    if(pacState === "strong"){
      theGhost1.x = 10;
      theGhost1.y = 8;
      score += 100;
    }
    else{
      gameState = "dead";
    }
  }
  if(theGhost2.y === pacMan.y && theGhost2.x === pacMan.x){
    if(pacState === "strong"){
      theGhost2.x = 10;
      theGhost2.y = 8;
      score += 100;
    }
    else{
      gameState = "dead";
    }
  }
  if(theGhost3.y === pacMan.y && theGhost3.x === pacMan.x){
    if(pacState === "strong"){
      theGhost3.x = 10;
      theGhost3.y = 8;
      score += 100;
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
  // if(frameCount%10 === 0){
  //   console.log(pacState);
  // }
}

// displays the grid
function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === WALL) {
        image(wallImg, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === POINTSPOT){
        fill(0);
        image(pointspot, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === PLAYER){
        // closes pacmans mouth
        if(showState === "yes"){
          image(pacImg0, x*cellSize, y*cellSize, cellSize);
        }
        // opens pacmans mouth
        else if(showState === "no"){
          // makes sure pacman is facing the right direction
          if(pacTravelState === "right"){
            image(pacImg1, x * cellSize, y * cellSize, cellSize);
          }
          else if(pacTravelState === "down"){
            image(pacImg2, x * cellSize, y * cellSize, cellSize);
          }
          else if(pacTravelState === "up"){
            image(pacImg4, x * cellSize, y * cellSize, cellSize);
          }
          else if(pacTravelState === "left"){
            image(pacImg3, x * cellSize, y * cellSize, cellSize);
          }
        }
      }
      else if (grid[y][x] === NOPOINT){
        image(noPointImg, x * cellSize, y * cellSize, cellSize);
      }
      else if (grid[y][x] === TELEPORT1 || grid[y][x] === TELEPORT2){
        image(noPointImg, x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === GHOSTPOINT){
        image(wallImg, x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === POWERPILL){
        image(powerPelletImage, x * cellSize, y * cellSize, cellSize);
      }
      else if(grid[y][x] === GHOST1){
        if(pacState === "weak"){
          image(ghost1Image, x * cellSize, y * cellSize, cellSize);
        }
        else{
          image(scaredGhostImg,x*cellSize, y * cellSize, cellSize);
        }
      }
      else if(grid[y][x] === GHOST2){
        if(pacState === "weak"){
          image(ghost2Image, x * cellSize, y * cellSize, cellSize);
        }
        else{
          image(scaredGhostImg, x * cellSize, y * cellSize, cellSize);
        }
      }
      else if(grid[y][x] === GHOST3){
        if(pacState === "weak"){
          image(ghost3Image, x * cellSize, y * cellSize, cellSize);
        }
        else{
          image(scaredGhostImg, x * cellSize, y * cellSize, cellSize);
        }
      }
      else if(grid[y][x] === GHOSTPOINT2){
        image(noPointImg, x * cellSize, y * cellSize, cellSize);
      }
      // square(x * cellSize, y * cellSize, cellSize);
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
function generatePowerPellet(){
// generates coordinates for power pellet
  let pow1 = {
    x : Math.round(random(1, 19)),
    y : Math.round(random(1, 19)),
  };
  // checks to see if it's allowed to spawn a PowerP
  if(pillState === "sober"){
    powerPills.push(pow1);
    pillCounter ++;
  }
  // checks amount of powerP's
  if (pillCounter >= 4){
    pillState = "intoxicated";
  }
}

// shows powerP's
function displayPowerPellet(){
  for(let i = powerPills.length - 1; i >= 0; i --){
    // makes sure spawning coordinates are valid
    if(grid[powerPills[i].y][powerPills[i].x] !== WALL && grid[powerPills[i].y][powerPills[i].x] !== GHOSTPOINT && grid[powerPills[i].y][powerPills[i].x] !== PLAYER && grid[powerPills[i].y][powerPills[i].x] !== GHOST1){
      grid[powerPills[i].y][powerPills[i].x] = POWERPILL;
    }
    // gets rid of invald coordinates to spawn powerP's and requests another PowerP to be spawned
    else{
      powerPills.splice(i, 1);
      pillState = "sober";
      pillCounter --;
    }
  }
}