let gridSize = 8;
let cellSize;
let spacing = 20;
let numPoints = 15;
let isWhite = false;
let flowField = [];
let cols, rows;
let noiseScale = 0.3;
let zOffset = 0;

function setup() {
  createCanvas(550, 550);
  cellSize = (width - (gridSize - 1) * spacing) / gridSize;
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  flowField = new Array(cols * rows);
  noLoop();
}

function draw() {
  background(isWhite ? 255 : 0);
  stroke(isWhite ? 0 : 255);
  strokeWeight(0.7);

  generateFlowField();
  
  let points = [];
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let xOffset = i * (cellSize + spacing);
      let yOffset = j * (cellSize + spacing);
      
      let lastPoint = createVector(random([0, cellSize]), random([0, cellSize]));
      points.push(createVector(xOffset + lastPoint.x, yOffset + lastPoint.y));
      
      for (let k = 0; k < numPoints - 1; k++) {
        let angle = getFlowFieldAngle(points[points.length - 1].x, points[points.length - 1].y);
        let newX = points[points.length - 1].x + cos(angle) * (cellSize / 4);
        let newY = points[points.length - 1].y + sin(angle) * (cellSize / 4);
        points.push(createVector(newX, newY));
      }
    }
  }
  
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  endShape();

  zOffset += 0.1;
}

function generateFlowField() {
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOff, yOff, zOffset) * TWO_PI * 4;
      flowField[index] = angle;
      xOff += noiseScale;
    }
    yOff += noiseScale;
  }
}

function getFlowFieldAngle(x, y) {
  let col = floor(x / spacing);
  let row = floor(y / spacing);
  let index = col + row * cols;
  return flowField[index];
}

function mouseClicked() {
  isWhite = !isWhite;
  redraw();
}
