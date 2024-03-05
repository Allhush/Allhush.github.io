let x;
let y;
let z;
let state = "spawning";
let lost = 0;
let state2 = "up";
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

function draw() {
  background(220);
  clayPigeon();
  crossHair();
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

function clayPigeon(){
  let q = lost;
  if (state === "spawning"){ 
    y = windowHeight;
    x = random(windowWidth/4, (3*windowWidth/4))
    state = "not spawning"
  }
  else if (state === "not spawning"){
    let g = random(height/2, (height/6));
    if(y >= g && state2 === "up"){
      y -= 5;
    }
    else if(y <= g){
      state2 = "down";
    }
    else if(y > windowWidth){
      lost += 1;
    }
    if(state2 === "down"){
      y += 5;
    }
    if (lost>q){
      state = "spawning";
      q += 1
    }
    if (mouseX > x - 10 && mouseX < x + 10 && mouseY > y - 10 && mouseY < y + 10 && mouseIsPressed){
      counter += 1;
      state = "spawning"
    }
  }
  circle(x,y,20)
}