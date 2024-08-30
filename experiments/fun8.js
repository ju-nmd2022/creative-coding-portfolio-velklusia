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

    let cols = int(random(5, 20));
    let rows = int(random(5, 20));
    let gridSize = width / cols * random(0.2, 0.5);
    let time = frameCount * 0.02; 
    frameRate(4);
    
    for (let y = 0; y < rows; y++) {
        beginShape();
        for (let x = 0; x < cols; x++) {
            let xOffset = (x - cols / 2) * gridSize;
            let yOffset = (y - rows / 2) * gridSize;
            let dist = sqrt(xOffset * xOffset + yOffset * yOffset);
            
            let z = map(dist, 0, sqrt(sq(width / 2) + sq(height / 2)), random(100, 200), 0);
            
            let xDistort = xOffset + sin(radians(dist * random(0.5, 1.0)) * random(3, 10) + time) * random(20, 70);
            let yDistort = yOffset + cos(radians(dist * random(0.5, 1.0)) * random(3, 10) + time) * random(20, 70);
            
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
            
            let z = map(dist, 0, sqrt(sq(width / 2) + sq(height / 2)), random(100, 200), 0);
            
            let xDistort = xOffset + cos(radians(dist * random(0.5, 1.0)) * random(3, 10) + time) * random(20, 70);
            let yDistort = yOffset + sin(radians(dist * random(0.5, 1.0)) * random(3, 10) + time) * random(20, 70);
            
            stroke(useColor ? primaryColor : secondaryColor);
            
            vertex(width / 2 + xDistort, height / 2 + yDistort);
        }
        endShape(CLOSE);
    }
}

function mousePressed() {
    useColor = !useColor;
}
