// bubble movement demo
// object notation and arrays
// monday march 25th 2024

let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for(let i = 0; i < 5; i ++){
    spawnBubble();
  }

  // spawn a new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  // moveRandomBubbles();
  moveNoisyBubbles();
  displayBubbles();
}

function moveNoisyBubbles(){
  for(let theBubble of bubbles){
    // where to be
    let x = noise(theBubble.timex)*width;
    let y = noise(theBubble.timey)*height;
    
    // set location
    theBubble.x = x;
    theBubble.y = y;
    // increase time x and timey
    theBubble.timex += theBubble.deltatime;
    theBubble.timey += theBubble.deltatime;

  }
}

function moveRandomBubbles(){
  for(let theBubble of bubbles){
    let choice = random(100);
    if(choice < 25){
      theBubble.y -= theBubble.speed;
    }
    else if(choice < 50){
      theBubble.y += theBubble.speed;
    }
    else if(choice < 75){
      theBubble.x += theBubble.speed;
    }
    else if(choice < 100){
      theBubble.x -= theBubble.speed;
    }
  }
}

function displayBubbles(){
  for(let theBubble of bubbles){
    fill(theBubble.r, theBubble.g, theBubble.b, theBubble.alpha);
    circle(theBubble.x, theBubble.y, theBubble.size);
  }
}

function spawnBubble(){
  let someBubble = {
    size: random(10, 30),
    x: random(0, width),
    y: random(0, height),
    speed: 3,
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timex: random(3141592654),
    timey: random(3141592654),
    deltatime: 0.003141592654,
  };
  bubbles.push(someBubble);
}