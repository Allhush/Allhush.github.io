let x;
let radius = 25;
let y;
let r = 255;
let g = 0;
let b = 0;
let dx;
let dy;
let state = "start screen";


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  circleColor();
  noStroke(); 
  dy = random(-10,10);
  dx = random(-10,10);
}

function draw() {
  if (state === "start screen"){
    background(0);
  }
  else if (state === "bouncing ball"){
    background(220);
    drawCircle();
    bounceWall();
    moveBalls();
  }
}

function drawCircle(){
  fill(r,g,b);
  circle(x,y,2*radius);
}
function bounceWall(){
  if (x + radius >= width || x - radius <=0){
    dx = -1 * dx;
    circleColor();
  }
  if (y + radius >= height || y - radius <= 0){
    dy = -1*dy;
    circleColor();
  }
}
function moveBalls(){
  y +=dy;
  x +=dx;
}
function circleColor(){
  r = random(255);
  g = random(255);
  b = random(255);
}
function keyTyped(){
  if (key === " "){
    let dy = random(-10,10);
    let dx = random(-10,10);
  }
  else if (key === "c"){
    circleColor();
  }
}

function mousePressed(){
  if (state === "start screen"){
    state = "bouncing ball";
  }
}

function showInstructions() {
  fill("white");
  textSize(42);
  textAlign(CENTER, CENTER);
  text("click mouse to start", width/2, height/2);
}