let gridSize = 8;
let cellSize;
let spacing = 20;
let lines = [];
let isWhite = false;
let numPoints = 15;

function setup() {
  createCanvas(550, 550);
  cellSize = (width - (gridSize - 1) * spacing) / gridSize; 
  noLoop();
  generateLines();
}

function draw() {
  background(isWhite ? 255 : 0);
  stroke(isWhite ? 0 : 255);
  strokeWeight(1.2);
//begin and end shape here instead
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let xOffset = i * (cellSize + spacing);
      let yOffset = j * (cellSize + spacing);
      drawLinePattern(xOffset, yOffset, lines[i][j]);
    }
  }
}

function generateLines() {
  let lastPoint = { x: random([0, cellSize]), y: random([0, cellSize]) };
  
  for (let i = 0; i < gridSize; i++) {
    lines[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let pattern = generateLinePattern(lastPoint);
      lines[i][j] = pattern;
      lastPoint = pattern[pattern.length - 1];
    }
  }
}

function generateLinePattern(startPoint) {
  let points = [];
  points.push(startPoint);

  for (let i = 0; i < numPoints - 1; i++) {
    let prevX = points[points.length - 1].x;
    let prevY = points[points.length - 1].y;

    let newX = random([0, cellSize / 4, cellSize / 2, (3 * cellSize) / 4, cellSize]);
    let newY = random([0, cellSize / 4, cellSize / 2, (3 * cellSize) / 4, cellSize]);

    points.push({ x: newX, y: newY });
  }

  return points;
}

function drawLinePattern(xOffset, yOffset, pattern) {
  beginShape();
  for (let i = 0; i < pattern.length; i++) {
    vertex(xOffset + pattern[i].x, yOffset + pattern[i].y);
  }
  endShape();
}

function mouseClicked() {
  isWhite = !isWhite;
  generateLines();
  redraw();
}
