// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y; 
let q;
let z;
let g;
let p;
let v;
let state1 = "spawning";
let count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(220);
  crossHair();
  if (count < 5){
    randCoord();
  }
  enemy1();
}

function crossHair(){
  // fill(0);
  rect(mouseX, mouseY + 4, 1, 4);
  // fill(0);
  rect(mouseX, mouseY - 7, 1, 4);
  // fill(0);
  rect(mouseX + 4, mouseY, 4, 1);
  // fill(0);
  rect(mouseX - 7,mouseY, 4, 1);
}

// function target(){
//   q = 255;
//   for (let z = width/5; z > 0; z -= (width/15) ){
//     fill(q)
//     circle(x,y,z)
//     if (q = 255){
      
//     }
//   }
    
  
// }
function randCoord(){
  x = random(0, width);
  y = random(0, height);
  z = random(10, 20);
}

function enemy1(){
  if (state1 === "spawning"){
    x = g;
    y = p;
    z = v;
  }
  circle(g, p, v);
}