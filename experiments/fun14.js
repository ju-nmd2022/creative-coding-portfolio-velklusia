let grid;
let cols, rows;
let resolution = 7;
let colors;
let bgColor;
let pointColor;
let currentColorIndex = 0;

function setup() {
  createCanvas(800, 800);
  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);

  colors = [
    [color(121, 35, 89), color(255, 255, 255)],
    [color(255, 255, 255), color(121, 35, 89)]
  ];

  grid = Array.from({ length: rows }, () => Array(cols).fill(0).map(() => random() > 0.5 ? 1 : 0));

  interval = setInterval(refreshPattern, 1000);

  noLoop();
  refreshColors();
  drawPattern();
}

function draw() {
  background(bgColor);
  drawGrid();
}

function refreshColors() {
  bgColor = colors[currentColorIndex][0];
  pointColor = colors[currentColorIndex][1];
  currentColorIndex = (currentColorIndex + 1) % colors.length; // Color switch
}

function drawPattern() {
  let newGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let state = grid[y][x];
      let neighbors = countNeighbors(x, y);

      // Cellular automata
      if (state === 1 && (neighbors < 1 || neighbors > 2)) {
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
  strokeWeight(3);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let currentColor = grid[y][x] === 1 ? pointColor : bgColor;
      stroke(currentColor);
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
  refreshColors();
  drawPattern();
  redraw();
}
