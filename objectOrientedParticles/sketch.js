// FireWorks
// Alliam Hushagen
// may 2nd 2024

const FIRE_WORKS_PER_CLICK = 500;
const SPEED = 5;

class Particle{
  constructor(x,y,dx,dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = 5;
    this.r = 255;
    this.g = 205;
    this.b = 30;
    this.opacity = 255;
  }
  display(){
    noStroke();
    fill(this.r,this.g,this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }
  update(){
    // move the particle
    this.x += this.dx;
    this.y += this.dy;

    //apply basic gravity
    this.y +=2.5;

    // kill stuff
    this.opacity -= 2;
  }
  isDead(){
    return this.opacity <= 0;
  }
}

let theFireWorks = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode = DEGREES;
}

function draw() {
  background(0);
  for(let firework of theFireWorks){
    if(firework.isDead()){
      //delete it
      let index = theFireWorks.indexOf(firework);
      theFireWorks.splice(index,1);
    }
    else{
      // move firework
      firework.display();
      firework.update();
    }
  }
}

function mousePressed(){
  let angle = 0;
  let speed = random(1,5);
  for(let i = 0; i < FIRE_WORKS_PER_CLICK; i++){
    let dx = cos(angle) * random(1,5);
    let dy = sin(angle) * random(1,5);
    let someFirework = new Particle(mouseX, mouseY, dx, dy);
    theFireWorks.push(someFirework);
    angle += 360/ FIRE_WORKS_PER_CLICK;
  }
}