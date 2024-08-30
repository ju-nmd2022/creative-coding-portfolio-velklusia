function setup() {
    createCanvas(600, 600);
    noFill();
    noStroke();
  }
  
  function draw() {
    background(30);
  
    let circles = [];
    let noiseOffset = frameCount * 0.01;
  
    for (let i = 0; i < 15; i++) {
      let x = noise(noiseOffset + i * 0.1) * width;
      let y = noise(noiseOffset + i * 0.2) * height;
      circles.push(createVector(x, y));
    }
  
    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        let p1 = circles[i];
        let p2 = circles[j];
        let d = dist(p1.x, p1.y, p2.x, p2.y);
  
        if (d < 150) { 

            let alpha = map(d, 0, 150, 100, 0);
          let hue = map(d, 0, 150, 0, 255);
          stroke(hue, 255, 255, alpha);
          strokeWeight(map(d, 0, 150, 3, 1));
          line(p1.x, p1.y, p2.x, p2.y);
        }
      }
  
      let circleColor = color((frameCount * 2 + i * 30) % 255, 255, 255);
      fill(circleColor);
      noStroke();
      let circleSize = map(sin(frameCount * 0.02 + i), -1, 1, 10, 30);
      ellipse(circles[i].x, circles[i].y, circleSize, circleSize);
    }
  }
  