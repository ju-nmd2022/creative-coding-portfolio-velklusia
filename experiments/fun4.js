function setup() {
    createCanvas(600, 600);
    stroke(255);
    noFill();
  }
  
  function draw() {
    background(0);
    
    let cols = 30;
    let rows = 30;
    let gridSize = width / cols;
    let time = frameCount * 0.05; // speed of animation
    
    for (let y = 0; y < rows; y++) {
      beginShape();
      for (let x = 0; x < cols; x++) {
        let xOffset = (x - cols / 2) * gridSize;
        let yOffset = (y - rows / 2) * gridSize;
        let dist = sqrt(xOffset * xOffset + yOffset * yOffset);
        
        let z = map(dist, 0, sqrt(sq(width / 2) + sq(height / 2)), 100, 0);
        
        let xDistort = xOffset + sin(radians(dist * 0.5) + time) * 50;
        let yDistort = yOffset + cos(radians(dist * 0.5) + time) * 50;
        
        vertex(width / 2 + xDistort, height / 2 + yDistort);
      }
      endShape();
    }
    
    for (let x = 0; x < cols; x++) {
      beginShape();
      for (let y = 0; y < rows; y++) {
        let xOffset = (x - cols / 2) * gridSize;
        let yOffset = (y - rows / 2) * gridSize;
        let dist = sqrt(xOffset * xOffset + yOffset * yOffset);
        
        let z = map(dist, 0, sqrt(sq(width / 2) + sq(height / 2)), 100, 0);
        
        let xDistort = xOffset + sin(radians(dist * 0.5) + time) * 50;
        let yDistort = yOffset + cos(radians(dist * 0.5) + time) * 50;
        
        vertex(width / 2 + xDistort, height / 2 + yDistort);
      }
      endShape();
    }
  }
  