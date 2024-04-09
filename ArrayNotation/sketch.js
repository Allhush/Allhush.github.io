// Alliam Hushagen
// Arrays and object Notation
// CS30
// extra for experts Rotation which was demonstrated in class but was not mandatory to pay attention to
// had to figure out shooting with help from teacher
// made two arrays interact with one another

let object = [];
let projectiles = [];
// sets amount of asteroids and their speed
let condensedVariables = {
  speed: 1,
  amount: 10,
};

let state = "on";
// keeps track of important numbers
let numbers = {
  counter: 0, 
  score: 0,
};
let player;
let rotator = 0;
let rotatorState = 0;
// let movementState = "up";
// general state variable, was previously just for health but I used it for other stuff and didn't change the name
let healthState = "start screen";
let sideChoice;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
  // defines the player 
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
  // shows the start screen
  if(healthState === "start screen"){
    fill("red");
    textAlign(CENTER);
    textSize(50);
    text("Press R to start, press C for controls", width/2, height/2);
    revive();
    showControls();
  }
  // explains the controls
  else if(healthState === "controls"){
    fill("red");
    textAlign(CENTER);
    textSize(25);
    text("Standard wasd controls, use the mouse wheel to rotate, avoid the asteroids and shoot them all, press R to start", width/2, height/2);
    text("you only have one bullet at a time, but it turns when you do, see if you can get a trickshot!", width/2, 5*height/8);
    text("be careful around the edges, asteroids spawn more frequently there, Have Fun!", width/2, 3*height/4);
    revive();
    thescore();
  }
  // starts game
  else if(healthState === "alive"){
    showCreation();
    objectBoogey();
    test1();
    // player1();
    playerBoogey();
    playerRotate();
    // moveProjectiles();
    hittingProjectiles();
    collisionAndDeath();
    // console.log(rotate);
    thescore();
  }
  // ends game and preps for restart
  else if(healthState === "dead"){
    for(let z = object.length -1; z >= 0; z --){
      object.pop();
    }
    projectiles.pop();
    thescore();
    revive();
    deathScreen();
  }
  
}

// lets player see controls
function showControls(){
  if(keyIsDown(67)){
    healthState = "controls";
  }
}

// resets player
function deathScreen(){
  condensedVariables.amount = 10;
  numbers.counter = 0;
  condensedVariables.speed = 1; 
  rotator = 0;
  fill("red");
  textAlign(CENTER);
  textSize(50);
  text("You died, press R to restart.", width/2, height/2);
}

// shows the score
function thescore(){
  fill("red");
  textAlign(LEFT);
  textSize(50);
  text("your have " + numbers.score + " points", width/25, height/10);
}

// restarts the game
function revive(){
  if(keyIsDown(82)){
    player.xInnitial = width/2;
    player.yInnitial = height/2;
    healthState = "alive";
    numbers.score = 0;
  }
}

// fires projectiles
function mousePressed(){
  projectiles.pop();
  if(rotatorState === 1){
    spawnProjectiles(player.xInnitial, player.yInnitial);
  }
  
  // if((projectiles[0].x > width || projectiles[0].x < 0) && projectiles.length > 2){
  //   console.log(projectiles[v].y)
  //   projectiles.pop();
  // }
  // if((projectiles[0].y > height || projectiles[0].y < 0) && projectiles.length > 2){
  //   projectiles.pop();
  // }
  // for(let i = object.length - 1; i >= 0; i--){
  //   for(let ball of projectiles){
  //     if(clickedAsteroid(mouseX, mouseY, object[i])){
  //       object.splice(i, 1);
  //       numbers.score += 1;
  //     }
  //   }
  // }
}

// kills the player when they collide with the asteroids
function collisionAndDeath(){
  for(let c = object.length - 1; c >= 0; c--){
    let distanceAway = dist(player.xInnitial, player.yInnitial, object[c].x, object[c].y);
    let diameter = object[c].w + player.dimensions2;
    if (distanceAway < diameter){
      healthState = "dead";
    }
  }
}

// destroys asteroids when they are hit by projectile
function clickedAsteroid(x, y, theObject){
  console.log(projectiles[0].y)
  let distanceAway = dist(x, y, theObject.x, theObject.y);
  let diameter = theObject.w;
  // console.log(distanceAway, diameter);
  // console.log(x, y, theObject.x, theObject.y, "true");
  if(distanceAway < diameter){
    return true;
  }
  else{
    // console.log("false");
    return false;
  }
}

// destroys asteroids when they are hit by projectile
function hittingProjectiles(){
  for(let i = object.length - 1; i >= 0; i--){
    for(let v = projectiles.length - 1; v >= 0; v --){
      if(clickedAsteroid(projectiles[v].x, projectiles[v].y, object[i])){
        object.splice(i, 1); 
        numbers.score ++;
      }
      // if(clickedAsteroid(projectiles[v].x, projectiles[v].y, object[i])){
      //   projectiles.splice(v, 1); 
      // }
    }
  //   for(let ball of projectiles){
  //       if(clickedAsteroid(ball.x, ball.y, object[i])){
  //         object.splice(i, 1);
  //         numbers.score += 1;
  //       }
  //     }
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

// moves player around
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
  if (player.xInnitial >= width){
    player.xInnitial = 0;
    player.yInnitial = height - player.yInnitial;
  }
  else if (player.yInnitial >= height){
    player.yInnitial = 0;
    player.xInnitial = width - player.xInnitial;
  }
  else if (player.xInnitial <= 0){
    player.xInnitial = width -1;
    player.yInnitial = height - player.yInnitial;
  }
  else if (player.yInnitial <= 0){
    player.yInnitial = height -1;
    player.xInnitial = width - player.xInnitial;
  }
}

// lets player rotate
function playerRotate(){
  push();
  rotatorState = 1;
  translate(player.xInnitial, player.yInnitial);
  rotate(rotator);
  fill(0, 255, 0);
  if (healthState === "alive"){
    rect(0, 0 + 10, player.dimensions1 + 5, player.dimensions2);
    rect(0, 0, player.dimensions2, player.dimensions1);
  }
  pop();
  for(let ball of projectiles){
    fill("yellow");
    circle(ball.x, ball.y, ball.size);
    // if(keyIsDown(87) && movementState === "up"){
    //   ball.y -= 15;
    // }
    // else if(keyIsDown(87)){
    // }
    if (rotator === 180 || rotator === -180){
      ball.y += 10;
      // ball.x += random(-2,2);
    }
    else if (rotator === 360 || rotator === 0){
      ball.y -= 10;
      // ball.x += random(-2,2);
    }
    else if(rotator === 90 || rotator === -270){
      ball.x += 10;
      // ball.y += random(-2,2);
    }
    else if(rotator === -90  || rotator === 270){
      ball.x -= 10;
      // ball.y += random(-2,2);
    }
    if(rotator > 360){
      rotator = 90;
    }
    if(rotator < -360){
      rotator = -90;
    }
    // else if (rotator % 90 === 0){
    //   ball.x -= 10;
    //   ball.y += random(-2,2);
    // }
  }
}

// uses mousewheel to rotate
function mouseWheel(event){
  rotator += 9*event.delta/10;
  console.log(rotator);
}


// controls the asteroid waves
function test1(){
  sideChoice = random(100);
  if(numbers.counter < condensedVariables.amount && state === "on" && sideChoice > 50){
    spawnObject(random(0, 3*width/8), random(0, height));
    numbers.counter += 1;
  }
  else if(state === "on" && numbers.counter < condensedVariables.amount && sideChoice <= 50){
    spawnObject(random(5*width/8, width), random(0, height));
    numbers.counter += 1;
  }
  else if(state === "off" && object.length === 0){
    state = "on";
    numbers.counter = 0;
    condensedVariables.speed++;
    condensedVariables.amount += 2;
  }
  else{
    state = "off";
  }
  // if(numbers.counter >= 10){
  //   g++;
  // }
}

// spawns the asteroids
function spawnObject(innitialX, innitialY){
  if (innitialX > player.xInnitial -60 || innitialX < player.xInnitial +60){
    innitialX + 100
  }
  if (innitialY > player.yInnitial -60 || innitialY < player.yInnitial +60){
    innitialY + 100
  }
  let creation = {
    x: innitialX,
    y: innitialY,
    w: random(4, 6)*10,
    h: random(4, 6)*10,
    dx: random(-condensedVariables.speed, condensedVariables.speed),
    dy: random(-condensedVariables.speed, condensedVariables.speed),
  };
  object.push(creation);
}

// shows asteroids
function showCreation(){
  for(let creations of object){
    rectMode(CENTER);
    fill(255);
    rect(creations.x, creations.y, creations.w, creations.h);
  }
}

// moves asteroids
function objectBoogey(){
  for(let creations of object){
    creations.x += creations.dx;
    creations.y += creations.dy;
    if (creations.x >= width){
      creations.x = 0;
      creations.y = height - creations.y + random(-5,5);
    }
    else if (creations.y >= height){
      creations.y = 0;
      creations.x = width - creations.x + random(-5,5);
    }
    else if (creations.x <= 0){
      creations.x = width -1;
      creations.y = height - creations.y + random(-5,5);
    }
    else if (creations.y <= 0){
      creations.y = height -1;
      creations.x = width - creations.x + random(-5,5);
    }
  }
}

// spawns the projectile
function spawnProjectiles(spawnX, spawnY){
  let littleProjectile ={
    x: spawnX,
    y: spawnY,
    size: player.projectile,
    speed: 1,
  };
  projectiles.push(littleProjectile);
}

// moves the projectile
function moveProjectiles(){
  for(let ball = projectiles.length - 1; ball > 0; ball--){
    fill("yellow");
    circle(projectiles[ball].x, projectiles[ball].y, projectiles[ball].size);
    // projectiles[ball].y -= 10;
    // for(let i = object.length - 1; i > 0; i--){
    //   let distanceAway = dist(projectiles[ball].x, projectiles[ball].y, object[i].x, object[i].y);
    //   let diameter = object[i].w;
    //   if(distanceAway < diameter){
    //     object.splice(i, 1)
    //   }
    // }
  }
}