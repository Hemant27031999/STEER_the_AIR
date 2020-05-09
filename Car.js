class Car {

  constructor() {
    this.location = createVector(60, 60);
    this.velocity = createVector(0, 0);
    this.img = loadImage('images/car4.png');
    this.dir = createVector(0, 0);
    this.health = 255;
    this.score = 0;
  }

  run(palm_pos) {
    this.update(palm_pos);
    this.borders();
    this.eat(food);
    this.display();
  }

  display() {
    push();
    translate(this.location.x, this.location.y);
    rotate(PI + atan2(this.dir.y, this.dir.x));
    tint(255, this.health);
    image(this.img, -this.img.width / 24, -this.img.height / 24, this.img.width / 10, this.img.height / 10);
    pop();
  }

  eat(f) {
    let food = f.getFood();
    // Are we touching any food objects?
    for (let i = food.length - 1; i >= 0; i--) {
      let foodposition = food[i];
      let d = this.location.dist(foodposition);
      // If we are, juice up our strength!
      if (d < this.img.height / 20) {
        this.score += 10;
        this.health += 10;
        if(this.health>255) this.health = 255;
        food.splice(i, 1);
      }
    }
  }

  update(palm_pos) {
    this.health -= 0.2;
    let strength = videoFrameCentre.dist(palm_pos);
    if (strength < 30) strength = 0;
    if (strength > 160) strength = 160;
    strength = map(strength, 0, 160, 0, 20);
    this.velocity = p5.Vector.sub(palm_pos, videoFrameCentre);
    this.velocity.normalize();
    this.dir = this.velocity.copy();
    this.velocity.mult(strength);

    this.location.add(this.velocity);
  }

  dead(obs) {
    if (this.health < 0.0 || this.location.dist(obs) < 50) {
      return true;
    } else {
      return false;
    }
  }

  borders() {
    if (this.location.x < -this.img.width / 12) this.location.x = width + this.img.width / 12 + this.location.x;
    if (this.location.y < -this.img.width / 12) this.location.y = height + this.img.width / 12 + this.location.y;
    if (this.location.x > width + this.img.width / 12) this.location.x = -this.img.width / 12 + this.location.x - width;
    if (this.location.y > height + this.img.width / 12) this.location.y = -this.img.width / 12 + this.location.y - height;
  }

}