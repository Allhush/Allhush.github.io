// Walker OOP
// Alliam Hushagen
// Tuesday April 30th 2024
//

class Walker {
  constructor(x,y, theColor){
    this.x = x;
    this.y = y;
    this.stepSize = 5;
    this.color = theColor;
    this.radius = 5;
  }

  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  move(){
    let choice = random(100);
    if(choice < 25){
      this.y -= this.stepSize;
    }
    else if(choice < 50){
      this.y += this.stepSize;
    }
    else if(choice < 75){
      this.x -= this.stepSize;
    }
    else{
      this.x += this.stepsize;
    }
  }
}

let maram;
let griffin;
let seth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  maram = new Walker(width/2, height/2, "red");
  griffin = new Walker(800, 400, "green");
  seth = new Walker(400, 800, "blue");
}

function draw() {
  maram.move();
  griffin.move();
  seth.move();
  
  maram.display();
  griffin.display();
  seth.display();
}
