// seirpinsky triangle

let initialTriangle = [
  {x: 650, y: 20},
  {x: 100, y: 750},
  {x: 1200, y: 750},
];

let theDepth = 0;
let theColours = ["green", "blue", "red", "lightblue", "yellow", "purple", "white",];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  seirpinsky(initialTriangle, theDepth);
}

function seirpinsky(points, depth){
  fill(theColours[theDepth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
 
  if(depth > 0){
    // draw lower left triangle
    seirpinsky([midpoint(points[0], points[1]), midpoint(points[1], points[2]), points[1]],  depth - 1);
    
    // upper triangle
    seirpinsky([midpoint(points[0], points[1]), midpoint(points[0], points[2]), points[0]],  depth - 1 );

    // lower right
    seirpinsky([midpoint(points[0], points[2]), midpoint(points[1], points[2]), points[2]], depth - 1);
  }


}


function midpoint(point1, point2){
  let nX = (point1.x + point2.x)/2;
  let nY = (point1.y + point2.y)/2;
  return{x: nX, y:nY};
}

function mousePressed(){
  if(theDepth < 6){
    theDepth ++;
  }
}