class Food {

  constructor(num) {
    // Start with some food
    this.food = [];
    for (var i = 0; i < num; i++) {
      this.food.push(createVector(random(width), random(height)));
    }
  }

  // Add some food at a position
  add(l) {
    this.food.push(l.copy());
  }

  // Display the food
  run() {
    var f;
    for (let i=this.food.length-1; i>=0; i--) {
      let f = this.food[i];
      this.display(f);
    }

    // There's a small chance food will appear randomly
    if (random(1) < 0.05) {
      this.food.push(createVector(random(width), random(height)));
    }
  }

  display(f) {
    push();
    ellipseMode(CENTER);
    stroke(0);
    fill(102, 255, 102);
    translate(f.x, f.y);
    rotate(7*PI/4);
    ellipse(7, 7, 12, 4);
    rotate(6*PI/4);
    ellipse(0, 0, 12, 4);
    rotate(PI/4);
    ellipse(5, 5, 12, 4);
    pop();
  }

  // Return the list of food
  getFood() {
    return this.food;
  }
}