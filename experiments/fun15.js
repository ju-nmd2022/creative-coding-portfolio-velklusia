let grid;
let cols, rows;
let resolution = 10;
let colors = [];
let bgColor;
let interval;

function setup() {
  createCanvas(800, 800);
  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);

  for (let i = 0; i < 5; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
  bgColor = color(255);

  grid = Array.from({ length: rows }, () => Array(cols).fill(0).map(() => random() > 0.5 ? 1 : 0));

  interval = setInterval(refreshPattern, 1000);

  noLoop();
  drawPattern();
}

function draw() {
  background(bgColor);
  drawGrid();
}

function drawPattern() {
  let newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let state = grid[y][x];
      let neighbors = countNeighbors(x, y);

      // Cellular automata rules
      if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        newGrid[y][x] = 0;
      } else if (state === 0 && neighbors === 3) {
        newGrid[y][x] = 1;
      } else {
        newGrid[y][x] = state;
      }
    }
  }

  grid = newGrid;
}

function drawGrid() {
  noFill();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let currentColor = grid[y][x] === 1 ? colors[int(random(colors.length))] : bgColor;
      stroke(currentColor);
      strokeWeight(map(grid[y][x], 0, 1, 1, 5));
      point(x * resolution, y * resolution);
    }
  }
}

function countNeighbors(x, y) {
  let total = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      if (i === 0 && j === 0) continue;
      
      let ni = (x + i + cols) % cols;
      let nj = (y + j + rows) % rows;
      
      total += grid[nj][ni];
    }
  }
  return total;
}

function refreshPattern() {
  drawPattern();
  redraw();
}
