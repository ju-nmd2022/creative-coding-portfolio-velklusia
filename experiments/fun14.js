let gridSize = 8;
let cellSize;
let spacing = 10;
let grid = [];
let isWhite = false;
let numPoints = 50;

function setup() {
  createCanvas(550, 550);
  cellSize = (width - (gridSize - 1) * spacing) / gridSize; 
  noLoop();
  initializeGrid();
}

function draw() {
  background(isWhite ? 255 : 0);
  stroke(isWhite ? 0 : 255);
  strokeWeight(0.3);
  updateGrid();
  drawGrid();
}

function initializeGrid() {
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = generateLinePattern();
    }
  }
}

function generateLinePattern() {
  let points = [];
  let startPoint = { x: random([0, cellSize]), y: random([0, cellSize]) };
  points.push(startPoint);

  for (let i = 0; i < numPoints - 1; i++) {
    let prevX = points[points.length - 1].x;
    let prevY = points[points.length - 1].y;

    let newX = prevX + random([-cellSize / 4, 0, cellSize / 4]);
    let newY = prevY + random([-cellSize / 4, 0, cellSize / 4]);

    // Keep points within cells
    newX = constrain(newX, 0, cellSize);
    newY = constrain(newY, 0, cellSize);

    points.push({ x: newX, y: newY });
  }

  return points;
}

function drawGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let xOffset = i * (cellSize + spacing);
      let yOffset = j * (cellSize + spacing);
      drawLinePattern(xOffset, yOffset, grid[i][j]);
    }
  }
}

function updateGrid() {
  let newGrid = [];
  for (let i = 0; i < gridSize; i++) {
    newGrid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let neighbors = getNeighbors(i, j);
      let activeNeighbors = countActiveNeighbors(neighbors);
      
      if (activeNeighbors > 2) {
        // Slight mutation
        newGrid[i][j] = mutatePattern(grid[i][j]);
      } else if (activeNeighbors < 2) {
        // Make it simple again
        newGrid[i][j] = generateLinePattern();
      } else {
        // Keep it same
        newGrid[i][j] = grid[i][j];
      }
    }
  }
  grid = newGrid;
}

function getNeighbors(x, y) {
  let neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip
      let ni = x + i;
      let nj = y + j;
      if (ni >= 0 && ni < gridSize && nj >= 0 && nj < gridSize) {
        neighbors.push(grid[ni][nj]);
      }
    }
  }
  return neighbors;
}

function countActiveNeighbors(neighbors) {
  return neighbors.filter(neighbor => neighbor.length > numPoints / 2).length;
}

function mutatePattern(pattern) {
  let mutatedPattern = [];
  for (let i = 0; i < pattern.length; i++) {
    let mutatedPoint = {
      x: pattern[i].x + random([-cellSize / 8, 0, cellSize / 8]),
      y: pattern[i].y + random([-cellSize / 8, 0, cellSize / 8])
    };
    mutatedPoint.x = constrain(mutatedPoint.x, 0, cellSize);
    mutatedPoint.y = constrain(mutatedPoint.y, 0, cellSize);
    mutatedPattern.push(mutatedPoint);
  }
  return mutatedPattern;
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
  initializeGrid();
  redraw();
}
