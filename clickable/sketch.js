// Clickable Demo
// Alliam Hushagen
// may 23rd 2024

let startButton;
let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = new Clickable();
  startButton.locate(width/2, height/2);
  startButton.onPress = startWasPressed;
}

function draw() {
  if(state === "start"){
    background(220);
  }
  else{
    background(100);
  }
  background(220);
  startButton.draw();
}

function startWasPressed(){
  state = "grey";
}