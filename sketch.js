let videoFrameCentre;
let car;
let palm_pos;
let food;
let enemy;
let obstackle;
let stop;
let blade;
let rAngle;
let initialise;

function setup() {
  var canvas = createCanvas(1340, 900);
  canvas.parent('mainparent');
  videoFrameCentre = createVector(-300, 290);
  car = new Car();
  food = new Food(20);
  palm_pos = new p5.Vector(-300, 290);
  obstackle = createVector(900, 200);
  enemy = [];
  stop = false;
  rAngle = 0;
  initialise = 0;
  blade = loadImage('images/blades1.png');
  for (let i = 0; i < 4; i++) {
    enemy[i] = new Enemy(createVector(600, 450));
  }
}

function draw() {
  if(!stop && window.status == 1){
    smooth();
    background(220);
    
    fill(0);
    ellipse(600, 450, 20, 20);
    
    palm_pos.x = -window.indexFingerX;
    palm_pos.y = window.indexFingerY;

    car.run(palm_pos);
    stroke(0);
    fill(255, 0, 0);
    rect(1280, 50, 30, 100);
    fill(0);
    textSize(32);
    text(car.score, 40, 60);
    if (car.dead(obstackle)) {
      fill(255, 102, 153);
      textSize(100);
      text('GAME OVER', 370, 450);
      stop = true;
    }
    fill(0, 255, 0);
    rect(1280, 50, 30, map(car.health, 0, 255, 0, 100));

    food.run();

    if (random(1) < 0.01) {
      enemy.push(new Enemy(createVector(600, 450)));
    }

    for (let i = enemy.length - 1; i >= 0; i--) {
      enemy[i].run(car);
      if (enemy[i].dead(obstackle)) {
        car.score += 100;
        enemy.splice(i, 1);
      }
    }
    
    rAngle+=0.1;
    push();
    translate(obstackle.x, obstackle.y);
    rotate(rAngle);
    image(blade, -50, -50, 100, 100);
    pop();
  }
}