let useColor = true;
const primaryColor = '#ffb500';
const secondaryColor = '#000000';

function setup() {
    createCanvas(600, 600);
    strokeWeight(1);
    noFill();
}

function draw() {
    background(useColor ? secondaryColor : primaryColor);
    
    let cols = 15;
    let rows = 15;
    let gridSize = width / cols * 0.3;
    let time = frameCount * 0.07; 
    let hueOffset = frameCount % 360;
    
    for (let y = 0; y < rows; y++) {
        beginShape();
        for (let x = 0; x < cols; x++) {
            let xOffset = (x - cols / 2) * gridSize;
            let yOffset = (y - rows / 2) * gridSize;
            let dist = sqrt(xOffset * xOffset + yOffset * yOffset);
            
            let z = map(dist, 0, sqrt(sq(width / 2) + sq(height / 2)), 200, 0);
            
            let xDistort = xOffset + sin(radians(dist * 0.5) * 6 + time * 2) * (50 + z * 0.1);
            let yDistort = yOffset + cos(radians(dist * 0.5) * 6 + time * 2) * (50 + z * 0.1);
            
            stroke(useColor ? primaryColor : secondaryColor);
            
            vertex(width / 2 + xDistort, height / 2 + yDistort);
        }
        endShape(CLOSE); 
    }
    
    for (let x = 0; x < cols; x++) {
        beginShape();
        for (let y = 0; y < rows; y++) {
            let xOffset = (x - cols / 2) * gridSize;
            let yOffset = (y - rows / 2) * gridSize;
            let dist = sqrt(xOffset * xOffset + yOffset * yOffset);
            
            let z = map(dist, 0, 300, 4);
            
            let xDistort = xOffset + cos(radians(dist * 5) * 2 + time * 2) * (50 + z * 0.1);
            let yDistort = yOffset + sin(radians(dist * 5) * 2 + time * 2) * (50 + z * 0.1);
            
            stroke(useColor ? primaryColor : secondaryColor);
            
            vertex(width / 2 + xDistort, height / 2 + yDistort);
        }
        endShape(CLOSE);
    }
}

function mousePressed() {
    useColor = !useColor;
}
