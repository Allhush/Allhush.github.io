// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x;
let y; 
let q;

function setup() {
  createCanvas(400, 400);
  noCursor();
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  target();
  crossHair();
}

function crossHair(){
  rect(mouseX, mouseY + 4, 1, 4)
  rect(mouseX, mouseY - 7, 1, 4)
  rect(mouseX + 4, mouseY, 4, 1)
  rect(mouseX - 7,mouseY, 4, 1)
}

function target(){
  q = 255;
  for (let z = width/5; z > 0; z -= (width/15) ){
    fill(q)
    circle(x,y,z)
    if (q = 255){
      
    }
  }
    
  
}
