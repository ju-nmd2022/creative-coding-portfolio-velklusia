let gridSize = 6; 
let cellSize;
let spacing = 60; 
let numPoints = 6; 
let isWhite = false;
let points = [];
let animationSpeed = 0.02;
let colorChangeInterval = 3000; 
let lastColorChange = 0;

function setup() {
  createCanvas(550, 550);
  cellSize = (width - (gridSize - 1) * spacing) / gridSize;
  noFill();
  frameRate(30); 
  generatePoints();  
  lastColorChange = millis(); 
}

function draw() {
  if (millis() - lastColorChange > colorChangeInterval) {
    isWhite = !isWhite;
    lastColorChange = millis();
  }

  background(isWhite ? 255 : 0);
  stroke(isWhite ? 0 : 255);
  strokeWeight(0.9);

  for (let i = 0; i < points.length; i++) {
    points[i].x += sin(points[i].offset + frameCount * animationSpeed) * 2;
    points[i].y += cos(points[i].offset + frameCount * animationSpeed) * 2;
  }
  
  beginShape();
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);
}

function generatePoints() {
  points = []; 

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let xOffset = i * (cellSize + spacing);
      let yOffset = j * (cellSize + spacing);
      
      for (let k = 0; k < numPoints; k++) {
        let x = random([0, cellSize / 4, cellSize / 2, (3 * cellSize) / 4, cellSize]);
        let y = random([0, cellSize / 4, cellSize / 2, (3 * cellSize) / 4, cellSize]);
        points.push({ x: xOffset + x, y: yOffset + y, offset: random(TWO_PI) });
      }
    }
  }
}




