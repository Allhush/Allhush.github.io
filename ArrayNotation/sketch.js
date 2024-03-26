// Alliam Hushagen
// Arrays and object Notation
// CS30

let object = [];

let state = "on";
let numbers = {
  counter: 0, 
  score: 0,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(0);
  showCreation();
  objectBoogey();
  test1();
}

function mousePressed(){
  for(let i = object.length - 1; i >= 0; i--){
    if(clickedAsteroid(mouseX, mouseY, object[i])){
      object.splice(i, 1);
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

function player(){
  let player = {
    xInnitial: width/2,
    yInnitial: height/2,


  };
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
