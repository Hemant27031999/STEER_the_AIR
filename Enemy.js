class Enemy {

  constructor(l) {
    this.position = l.copy();
    this.health = 200;
    this.netDir = createVector(0, 0);
    this.acceleration = 1;
    this.xoff = random(1000);
    this.yoff = random(1000);
    this.theta = 0;
    this.rWalk = true;
    this.r = 20;
    this.maxspeed = 14;
    this.normalspeed = this.maxspeed / 1.4;
    this.velocity = this.normalspeed;
  }

  eat(prey) {
    this.netDir.normalize();
    // Are we touching any food objects?
    let walk = true;

    let d = this.position.dist(prey.location);
    if (d < this.r / 2 + prey.img.height / 20) {
      this.health +=50;
      if(this.health>255) this.health = 255;
      prey.health -= 10;
      prey.score -= 20;
      walk = false;
    } else if (d < 10 * this.r) {
      this.setPrey(prey);
      walk = false;
    }

    if (walk) this.randomWalk();
    else this.chase();
  }

  run(prey) {
    this.health -= 0.2;
    this.eat(prey);
    this.borders();
    this.display();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r + this.position.x;
    if (this.position.y < -this.r) this.position.y = height + this.r + this.position.y;
    if (this.position.x > width + this.r) this.position.x = -this.r + this.position.x - width;
    if (this.position.y > height + this.r) this.position.y = -this.r + this.position.y - height;
  }

  // Death
  dead(obs) {
    if (this.health < 0.0 || this.position.dist(obs)<55) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    stroke(0, this.health);
    fill(107, 155, 139, this.health);
    smooth();
    ellipseMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(atan2(this.netDir.y, this.netDir.x));
    rect(-this.r-7, this.r/9, 7, 5);
    rect(-this.r-7, -this.r/3, 7, 5);
    beginShape();
    vertex(this.r, 0);
    vertex(-this.r,this.r/2);
    vertex(-this.r,-this.r/2);
    endShape(CLOSE);
    rectMode(CENTER);
    pop();
  }

  randomWalk() {
    this.velocity = this.normalspeed;
    this.theta = map(noise(this.xoff), 0, 1, -2 * PI, 2 * PI);
    this.position.add(this.velocity * cos(this.theta), this.velocity * sin(this.theta));
    this.xoff += 0.01;
    this.netDir.x = cos(this.theta);
    this.netDir.y = sin(this.theta);
  }

  chase() {
    let angle = atan2(this.netDir.y, this.netDir.x);
    this.velocity += this.acceleration;
    if (this.velocity > this.maxspeed) this.velocity = this.maxspeed;
    this.position.add(this.velocity * cos(angle), this.velocity * sin(angle));
    this.xoff += 0.01;
  }

  setPrey(prey) {
    let dir = p5.Vector.sub(prey.location, this.position);
    let strength = dir.mag();
    strength = (10 * this.r - strength) * (10 * this.r - strength) * (10 * this.r - strength);
    dir.normalize();
    dir.mult(strength);
    this.netDir.add(dir);
  }
}