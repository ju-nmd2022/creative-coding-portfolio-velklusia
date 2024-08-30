let gridSize = 8;
let cellSize;
let spacing = 20;
let numPoints = 15;
let isWhite = false;

function setup() {
  createCanvas(550, 550);
  cellSize = (width - (gridSize - 1) * spacing) / gridSize;
  noLoop();
}

function draw() {
  background(isWhite ? 255 : 0);
  stroke(isWhite ? 0 : 255);
  strokeWeight(1.1);
  
  let points = [];
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let xOffset = i * (cellSize + spacing);
      let yOffset = j * (cellSize + spacing);
      
      let lastPoint = { x: random([0, cellSize]), y: random([0, cellSize]) };
      points.push({ x: xOffset + lastPoint.x, y: yOffset + lastPoint.y });
      
      for (let k = 0; k < numPoints - 1; k++) {
        let newX = random([0, cellSize / 4, cellSize / 2, (3 * cellSize) / 4, cellSize]);
        let newY = random([0, cellSize / 4, cellSize / 2, (3 * cellSize) / 4, cellSize]);
        points.push({ x: xOffset + newX, y: yOffset + newY });
      }
    }
  }
  
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    curveVertex(points[i].x, points[i].y);
  }
  endShape();
}

function mouseClicked() {
  isWhite = !isWhite;
  redraw();
}

