// connected nodes demo
// Alliam Hushagen
// May 6th 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for(let point of points){
    point.update();
    point.connectTo(points);
  }
  for(let point of points){
    point.display();
  }
}

class MovingPoint{
  constructor(x,y, pointsArray){
    this.x = x;
    this.radius = 15;
    this.y = y;
    this.xTime = random(0, 1000);
    this.yTime = random(0,1000);
    this.deltaTime = 0.01;
    this.color = color(random(255), random(255), random(255));
    this.speed = 50;
    this.reach = 120;
    this. maxRad = 50;
    this.minRad = 15;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  update(){
    this.move();
    this.wrap();
    // this.mouseInflate();
  }

  connectTo(pointsArray){
    for(let otherPoint of pointsArray){
      if(this !== otherPoint){
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if(pointDistance < this.reach){
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
      }
    }
  }

  move(){
    // pick random direction of movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);
   
    // scale movement
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    this.x += this.dx;
    this.y += this.dy;
   
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrap(){
    // wrap around the screen
    if(this.x > width){
      this.x = 0;
    }
    else if(this.x < 0){
      this.x = width;
    }
    else if(this.y > height){
      this.y = 0;
    }
    else if(this.y < 0){
      this.y = height;
    }
  }

  mouseInflate(){
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if(mouseDistance < this.reach){
      let theSize = map(mouseDistance, 0, this.reach, this.maxRad, this.minRad);
      this.radius = theSize;
    }
    else{
      this.radius = this.minRad;
    }
  }
}
function mousePressed(){
  let somePoint = new MovingPoint(mouseX, mouseY);
  points.push(somePoint);
}