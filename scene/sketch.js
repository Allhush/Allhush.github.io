let x;
let y;
let z;
let state = "spawning";
let lost = 0;
let state2 = "up";
let counter = 0;
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
let ax;
let bx;
let cx;
let dx;
let ex;
let fx;
let ay;
let by;
let cy;
let dy;
let ey;
let fy;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(220);
  clayPigeon();
  scorekeep();
  crossHair();
  healthBar();
  youDead();
  deadEnemies();
  // knifeTime();
}

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
  q = lost;
  if (state === "spawning"){ 
    y = windowHeight;
    x = random(windowWidth/4, 3*windowWidth/4);
    state = "not spawning";
  }
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
    if (mouseX > x - 10 && mouseX < x + 10 && mouseY > y - 10 && mouseY < y + 10 && mouseIsPressed){
      counter += 1;
      state = "spawning";
      state2 = "up";
    }
  }
  circle(x,y,20);
}

function healthBar(){
  if (lost < 11){
    for(let u = width/11; u <= width; u += width/12){
      fill(0);
      rect(u, 25, 35, 20);
    }
    fill(220);
    rect(width/11, 25, 35 + lost*width/12, 20);
  }
  else if (lost > 10 && lost < 20){
    state = "dead";
    varTwo = 1;
    p = millis();
    lost += 10;
  }
}

function youDead(){
  if (state === "dead"){
    fill(0);
    textAlign(CENTER);
    textSize(50);
    text("You died, hit as many falling circles as you can to get extra points!", width/2, height/2);
    varTwo = 0;
  }
  if (state === "dead" && millis()> p + 2000){
    state = "deademies";
  }
}

function deadEnemies(){
  if (state === "deademies"){
    ax = random(windowWidth/5, 4*windowWidth/5);
    bx = random(windowWidth/5, 4*windowWidth/5);
    cx = random(windowWidth/5, 4*windowWidth/5);
    dx = random(windowWidth/5, 4*windowWidth/5);
    ex = random(windowWidth/5, 4*windowWidth/5);
    fx = random(windowWidth/5, 4*windowWidth/5);
    ay = 0;
    by = 0;
    cy = 0;
    dy = 0;
    ey = 0;
    fy = 0;
    state = "deademies2";
  }
  else if(state === "deademies2"){
    ay -= random(2,5);
    by -= random(2,7);
    cy -= random(4,5);
    dy -= random(4,7);
    ey -= random(5,10);
    fy -= random(1,10);
  }
  fill(0);
  circle(ax, ay, 20);
  circle(bx, by, 20);
  circle(cx, cy, 20);
  circle(dx, dy, 20);
  circle(ex, ey, 20);
  circle(fx, fy, 20);
}

function scorekeep(){
  fill(0);
  textSize(50);
  text(counter, 10, 60);
}

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