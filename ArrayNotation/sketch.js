// Alliam Hushagen
// Arrays and object Notation
// CS30

let object = [];
let counter = 0;

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
}

function player(){
  let player = {

  };
}

function test1(){
  if(counter < 25){
    spawnObject(random(0, width), random(0, height));
    counter += 1;
  }
}

function spawnObject(innitialX, innitialY){
  let creation = {
    x: innitialX,
    y: innitialY,
    w: random(10, 40),
    h: random(10, 40),
    dx: random(-3, 3),
    dy: random(-3, 3),
  };
  object.push(creation);
}

function showCreation(){
  for(let creations of object){
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
