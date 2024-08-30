function setup() {
    createCanvas(600, 600);
    noFill();
    noStroke();
  }
  
  function draw() {
    background(30);
  
    let circles = [];
    
    for (let i = 0; i < 10; i++) {
      let x = noise(frameCount * 0.01 + i) * width;
      let y = noise(frameCount * 0.02 + i) * height;
      circles.push(createVector(x, y));
    }
  
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        let p1 = circles[i];
        let p2 = circles[j];
        let d = dist(p1.x, p1.y, p2.x, p2.y);
  
        if (d < 150) { 
          stroke(255, map(d, 0, 150, 255, 50));
          strokeWeight(map(d, 0, 150, 8, 1));
          line(p1.x, p1.y, p2.x, p2.y);
        }
      }
  
      noStroke();
      fill(255);
      ellipse(circles[i].x, circles[i].y, 20, 20);
    }
  }
  