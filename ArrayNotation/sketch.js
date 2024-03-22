// Alliam Hushagen
// Arrays and object Notation
// CS30

let object = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  background(220);
  showCreation();
  objectBoogey();
  test1();
}

function mousePressed(){
}

function test1(){
  for(let jingleBell = 0; jingleBell< 10; jingleBell++){
    spawnObject(random(0, width/2), random(0, height));
  }
}

function spawnObject(innitialX, innitialY){
  let creation = {
    x: innitialX,
    y: innitialY,
    w: random(5, 10),
    h: random(5, 10),
    dx: random(-5, 5),
    dy: random(-5, 5),
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
  }
}
