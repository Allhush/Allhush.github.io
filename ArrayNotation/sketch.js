// Alliam Hushagen
// Arrays and object Notation
// CS30


let theCircles = [];
let time = 0;
let x = 0;
let y = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnCircles();
}


function draw() {
  displayBalls();
  moveCircles();
  times();
}

function spawnCircles(){
  let circles = {
    xValue: width/2,
    yValue: height/2,
    x: noise(time)*400,
    y: noise(time + 1000)*400,
    diameter: random(15,45),
  };
  theCircles.push(circles);
}

function times(){
  time+= 1/120;
}

function displayBalls(){
  for (let ball of theCircles){
    circle(ball.xValue, ball.yValue, ball.diameter);

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

function moveCircles(){
  for(let ball of theCircles){
    ball.xValue += ball.x;
    ball.yValue += ball.y;
  }
}