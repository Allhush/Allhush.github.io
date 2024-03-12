let x;
let y;
let z;
let state = "start screen";
let lost = 0;
let state2 = "up";
let counter = 0;
let bGroundS = "off";
let q;
let g;
let weapon = "bang bang";
let knifeFight = 0;
let nin;
let t;
let v;
let a;
let varTwo;
let p;
let dxa = 5;
let aw = 5000;
let rE;
let rE2 = 20000;
let hb;
let rex;
let rey;
let rS = "else";
let dya;
// let ax;
// let bx;
// let cx;
// let dx;
// let ex;
// let fx;
// let ay;
// let by;
// let cy;
// let dy;
// let ey;
// let fy;


function setup() {
  noCursor();
  varTwo = 1;
  rE = random(5000, 10000);
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  bGround();
  healthBar();
  startScreen();
  clayPigeon();
  scorekeep();
  speedUp();
  crossHair();
  youDead();
  // randomEvent();
  // deadEnemies();
  // knifeTime();
}

// makes crosshair to replace mouse
function crossHair(){
  if (weapon === "bang bang"){
    // fill(0);
    rect(mouseX, mouseY + 4, 1, 4);
    // fill(0);
    rect(mouseX, mouseY - 7, 1, 4);
    // fill(0);
    rect(mouseX + 4, mouseY, 4, 1);
    // fill(0);
    rect(mouseX - 7,mouseY, 4, 1);
  }
  else if(weapon === "cut cut"){
    fill(0);
    circle(mouseX, mouseY, 5);
  }
}

function clayPigeon(){
  // used for health bar
  q = lost;
  // creates spawning position for clay pigeon
  if (state === "spawning"){ 
    y = windowHeight;
    x = random(windowWidth/4, 3*windowWidth/4);
    state = "not spawning";
  }
  // movement for clay pigeon
  else if (state === "not spawning"){
    g = random(height/2, height/6);
    if(y >= g && state2 === "up"){
      y -= dxa;
    }
    else if(y <= g){
      state2 = "down";
    }
    else if(y > height){
      lost += 1;
    }
    if(state2 === "down"){
      y += dxa;
    }
    if (lost>q){
      state = "spawning";
      state2 = "up";
      q += 1;
    }
    // creates hitbox for clay pigeon 
    if (mouseX > x - 10 && mouseX < x + 10 && mouseY > y - 10 && mouseY < y + 10 && mouseIsPressed){
      counter += 1;
      state = "spawning";
      state2 = "up";
    }
  }
  // creates clay pigeon
  circle(x,y,20);
}


function healthBar(){
  // checks health
  if (lost < 11){
    // creates solid health bar
    for(let u = width/11; u <= width; u += width/12){
      fill(0);
      rect(u, 25, 35, 20);
    }
    fill(220);
    // fills health bar
    rect(width/11, 25, 35 + lost*width/12, 20);
    
  }
  // checks health
  else if (lost > 10 && lost < 20){
    // kills player
    state = "dead";
    varTwo = 1;
    p = millis();
    lost += 10;
  }
}

function youDead(){
  if (state === "dead"){
    // displays death message
    fill(0);
    textAlign(CENTER);
    textSize(50);
    text("You died", width/2, height/2);
    // textAlign(CENTER);
    // textSize(20);
    // text("press to play again", width/2, height/2 + height/10);
    // if(mouseIsPressed && mouseY > height/2 + height/10 && mouseY < height/2 + height/5 && mouseX > 3*width/4 && mouseX < width/4){
    //   state = "spawning";
    // }
  }
  // if (state === "dead" && millis()> p + 2000){
  //   state = "deademies";
  // }
}

// function deadEnemies(){
//   if (state === "deademies"){
//     ax = random(windowWidth/5, 4*windowWidth/5);
//     bx = random(windowWidth/5, 4*windowWidth/5);
//     cx = random(windowWidth/5, 4*windowWidth/5);
//     dx = random(windowWidth/5, 4*windowWidth/5);
//     ex = random(windowWidth/5, 4*windowWidth/5);
//     fx = random(windowWidth/5, 4*windowWidth/5);
//     ay = 0;
//     by = 0;
//     cy = 0;
//     dy = 0;
//     ey = 0;
//     fy = 0;
//     state = "deademies2";
//   }
//   else if(state === "deademies2"){
//     ay -= random(2,5);
//     by -= random(2,7);
//     cy -= random(4,5);
//     dy -= random(4,7);
//     ey -= random(5,10);
//     fy -= random(1,10);
//   }
//   fill(0);
//   circle(ax, ay, 20);
//   circle(bx, by, 20);
//   circle(cx, cy, 20);
//   circle(dx, dy, 20);
//   circle(ex, ey, 20);
//   circle(fx, fy, 20);
// }


// keeps score
function scorekeep(){
  fill(0);
  textSize(50);
  textAlign(LEFT, BOTTOM);
  text("You have " + counter + " points!", 10, height - 60);
}

// creates start screen
function startScreen(){
  if (state === !"start screen"){
    background(220);
  }
  if (state === "start screen" && varTwo === 1){
    // displays start screen
    background(0);
    fill(0);
    rect(width/11, 25, 35, 20);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Press the mouse to start", width/2, height/2);
    // starts game
    if (mouseIsPressed){
      background(220);
      state = "spawning";
      bGroundS = "on";
      varTwo = 0;
    }
  }
}

function speedUp(){
  // speeds up clay pigeon
  if (counter > 10 && millis() > aw + 20000){
    dxa += 1;
    aw = millis();
  }
}

function bGround(){
  if (bGroundS === "on")
  noStroke();
  fill("green");
  rect(0, 2*height/3, width, height/3);
  fill("skyblue");
  rect(0, 0, width, 2*height/3);
  stroke(0);
}

// function randomEvent(){
//   if (millis() > rE + rE2 && rS === "else"){
//     rS = "spawning";
//   }
//   if (rS === "spawning"){
//     rex = windowWidth - 10;
//     rey = random(height/4, 3*height/4);
//     rS = 1;
//     rE = millis();
//     rE2 = random(2000, 10000);
//   }
//   if (rS === 1){
//     rex -= 10;
//     rey += dya;
//     if (rex > width/2){
//       dya = -dya;
//     }
//   }
//   if (mouseX > rex - 10 && mouseX < rex + 10 && mouseY > rey - 10 && mouseY < rey + 10){
//     counter += 7;
//     rS = "else";
//     dya = -dya;
//   }
//   fill(0);
//   circle(rex, rey, 20);
// }

// function knifeTime(){
//   if (counter%10 === 0 && counter > 1){
//     state = "knifeTime";
//     if (knifeFight < 5){
//       fill(220);
//       if (millis > nin + 1500){
//         t = random(windowWidth/3, windowWidth*2/3);
//         v = random(windowHeight/3, windowHeight*2/3);
//         a = 30;
//         nin = millis();
//       }
//       if (mouseX > t - 15 && mouseX < t + 15 && mouseY > v - 15 && mouseY < v + 15){
//         knifeFight += 1;
//       }
//       circle(t, v, a);

//     }
//     state = " spawning";
//   }
// }