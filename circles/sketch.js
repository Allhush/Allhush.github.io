// array's and object notation
// circles demo

let ballArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBalls(width/2, height/2);
  noStroke();
}

function draw() {
  background(220);
  moveBalls();
  displayBalls();
}

function mousePressed(){
  spawnBalls(mouseX, mouseY);
}

function moveBalls(){
  for (let ball of ballArray){
    ball.x += ball.dx;
    ball.y += ball.dy;
  

    // teleport across screen if needed
    if (ball.x >= width){
      ball.x = 0;
      ball.y = height - ball.y;
    }
    else if (ball.y >= height){
      ball.y = 0;
      ball.x = width - ball.x;
    }
    else if (ball.x <= 0){
      ball.x = width -1;
      ball.y = height - ball.y;
    }
    else if (ball.y <= 0){
      ball.y = height -1;
      ball.x = width - ball.x;
    }
  }
  
}
function displayBalls(){
  for (let ball of ballArray){
    fill(ball.colors);
    circle(ball.x, ball.y, ball.rad*2);
  }
}

function spawnBalls(innitialX, innitlaY){
  let ball = {
    x: innitialX,
    y: innitlaY,
    dx: random(-5,5),
    dy: random(-5,5),
    rad: random(15,30),
    colors: color(random(255), random(255), random(255)),
  };
  ballArray.push(ball);
}
