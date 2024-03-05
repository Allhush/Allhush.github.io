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

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(220);
  clayPigeon();
  crossHair();
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
      y -= 1;
    }
    else if(y <= g){
      state2 = "down";
    }
    else if(y > windowWidth){
      lost += 1;
    }
    if(state2 === "down"){
      y += 1;
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
  while (lost <= 10){
    
  }
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