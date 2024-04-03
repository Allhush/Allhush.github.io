// Alliam Hushagen
// Arrays and object Notation
// CS30

let object = [];
let projectiles = [];

let state = "on";
let numbers = {
  counter: 0, 
  score: 0,
};
let player;
let rotator = 0;
let rotatorState = 0;
let movementState = "up";


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
  player = {
    xInnitial: width/2,
    yInnitial: height/2,
    dimensions1: 20,
    dimensions2: 15,
    projectile: 5,
  };
}


function draw() {
  background(0);
  showCreation();
  objectBoogey();
  test1();
  // player1();
  playerBoogey();
  playerRotate();
  // moveProjectiles();
  // hittingProjectiles();
  console.log(rotate);
}

function mousePressed(){
  if(rotatorState === 1){
    spawnProjectiles(0, 0);
  } 
  for(let i = object.length - 1; i >= 0; i--){
    if(clickedAsteroid(mouseX, mouseY, onject[i])){
      object.splice(i,1)
    }
  }
}

function clickedAsteroid(x, y, object){
  let distanceAway = dist(x, y, object.x, object.y);
  let radius = object.w/2;
  if(distanceAway < radius){
    return true;
  }
  else{
    return false;
  }
}

function hittingProjectiles(){
  for(let i = object.length - 1; i >= 0; i--){

  }
}

// for(let v = projectiles.length - 1; v >= 0; v --){
//   if(clickedAsteroid(projectiles[v].x, projectiles[v].y, object[i])){
//     object.splice(i, 1);
//   }
// }
// for(let ball of projectiles){
//   if(clickedAsteroid(ball.x, ball.y, object[i])){
//     object.splice(i, 1);
//   }
// }

// if(clickedAsteroid(mouseX, mouseY, onject[i])){
//   object.splice(i,1)
// }

// function player1(){
//   fill(220, 100, 100);
//   rect(player.xInnitial, player.yInnitial + 10, player.dimensions1 + 5, player.dimensions2);
//   rect(player.xInnitial, player.yInnitial, player.dimensions2, player.dimensions1);
// }

function playerBoogey(){
  if (keyIsDown(87)){
    player.yInnitial -= 5;
  }
  if (keyIsDown (83)){
    player.yInnitial += 5;
  }
  if (keyIsDown(68)){
    player.xInnitial += 5;
  }
  if (keyIsDown(65)){
    player.xInnitial -= 5;
  }
}

function playerRotate(){
  push();
  rotatorState = 1;
  translate(player.xInnitial, player.yInnitial);
  rotate(rotator);
  fill(225, 0, 0);
  rect(0, 0 + 10, player.dimensions1 + 5, player.dimensions2);
  rect(0, 0, player.dimensions2, player.dimensions1);
  for(let ball of projectiles){
    fill(0, 0, 255);
    circle(ball.x, ball.y, ball.size);
    // if(keyIsDown(87) && movementState === "up"){
    //   ball.y -= 15;
    // }
    // else if(keyIsDown(87)){
    // }
    ball.y -= 10;
    ball.x += random(-2,2);
  }
  pop();
}

function mouseWheel(event){
  rotator += event.delta;
}



function test1(){
  if(numbers.counter < 25 && state === "on"){
    spawnObject(random(0, width), random(0, height));
    numbers.counter += 1;
  }
  else if(state === "off" && object.length === 0){
    state = "on";
    numbers.counter = 0;
  }
  else{
    state = "off";
  }
}

function spawnObject(innitialX, innitialY){
  let creation = {
    x: innitialX,
    y: innitialY,
    w: random(2, 4)*10,
    h: random(2, 4)*10,
    dx: random(-3, 3),
    dy: random(-3, 3),
  };
  object.push(creation);
}

function showCreation(){
  for(let creations of object){
    rectMode(CENTER);
    fill(255);
    rect(creations.x, creations.y, creations.w, creations.h);
  }
}

function objectBoogey(){
  for(let creations of object){
    creations.x += creations.dx;
    creations.y += creations.dy;
    if (creations.x >= width){
      creations.x = 0;
      creations.y = height - creations.y;
    }
    else if (creations.y >= height){
      creations.y = 0;
      creations.x = width - creations.x;
    }
    else if (creations.x <= 0){
      creations.x = width -1;
      creations.y = height - creations.y;
    }
    else if (creations.y <= 0){
      creations.y = height -1;
      creations.x = width - creations.x;
    }
  }
}

function spawnProjectiles(spawnX, spawnY){
  let littleProjectile ={
    x: spawnX,
    y: spawnY,
    size: player.projectile,
    speed: 10,
  };
  projectiles.push(littleProjectile);
}

function moveProjectiles(){
  for(let ball of projectiles){
    fill(0, 0, 255);
    circle(ball.x, ball.y, ball.size);
    ball.y -= 10;
    
  }
}