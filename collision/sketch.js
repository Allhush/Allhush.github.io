let hit = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  circle(200, 200, 100);
  point(mouseX, mouseY);

  hit = collidePointCircle(mouseX, mouseY, 200, 200, 100);

  // Use vectors as input:
  // const mouse  = createVector(mouseX, mouseY);
  // const circle = createVector(200, 200);
  // const diam   = 100;
  // hit = collidePointCircleVector(mouse, circle, diam);

  if(hit){
    stroke("red");
  }
  else{
    stroke("black");
  }
  console.log("colliding?", hit);
}