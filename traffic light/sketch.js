// Traffic Light Starter Code
// Alliam Hushagen
// 02/28-29/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis
let r = 0;
let y = 0;
let g = 0;
let q = 0;
let w;
let state = 0;

function setup() {
  createCanvas(100, 300);
  w = 2000;
}

function draw() {
  background(255);
  drawOutlineOfLights();
  if (millis() > q + w) {
    state += 1;
    q = millis();
  }
  lightSwitcher();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);

  //lights
  fill(r);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
  fill(y);
  ellipse(width / 2, height / 2, 50, 50); //middle
  fill(g);
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}

function lightSwitcher() {
  if (state === 1) {
    r = 255;
    y = 255;
    g = "green";
    w = 1500;
  }
  if (state === 2) {
    r = 255;
    y = "yellow";
    g = 255;
    w = 500;
  }
  if (state >= 3) {
    r = "red";
    y = 255;
    g = 255;
    state = 0;
    w = 2000;
  }
}