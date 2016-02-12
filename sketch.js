var fiboNumber = [0, 1];
var slider;
var particleSet = [];
var img;
var sound;
var auto = 0;
var down = false;

function preload() {
  sound = loadSound("Music/Galaxy_1.mp3");
}

function setup() {
  createCanvas(1500, 1000);
  // img = loadImage("Images/Galaxy.jpg", function(img) {
  //   image(img, 0, 0)
  // });
  // // image(img,0,0);

  background(0);
  slider = createSlider(0, 30, 2);
  slider.position(10, 10);

  // sound.setVolume(0.1);
  // sound.play();
  sound.loop(0, 3, 0.1);

  for (var i = 0; i < 100; i++) {
    var num1st = fiboNumber[fiboNumber.length - 2];
    var num2nd = fiboNumber[fiboNumber.length - 1];
    var newNum = num1st + num2nd;
    fiboNumber.push(newNum);
    var x = fiboNumber[i] * 0.05;
    var size = fiboNumber[i] * 0.1;
    var fiboSet = [];
    for (var ix = 0; ix < 190; ix++) {
      fiboSet.push(new Particle(x, 0, size / 2))
    }
    particleSet.push(fiboSet)
  }
  print(fiboNumber);
}


function draw() {
  background(0, 10);
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01);
  var val = slider.value();
  //var val = map(mouseX, 0, width, 0, 30);
  // put the value from serial communication
  // var val = map(senserValue, 0, 1023, 0, 30);
  
  if(down){
    auto--;
  }else{
    auto++;
  }
  
  if(auto>1000){
    down = true
  }else if(auto == 0){
    down = false
    
  }

  stroke(255);
  for (var i = 0; i < val; i++) {
    var angle = PI * map(mouseX, 0, width, 0.1, 0.4);
    rotate(angle);
    //rotate(PI/2); //90 degrees
    var xMod = map(mouseY, 0, height, 0.001, 0.010);
    var x = fiboNumber[i] * xMod;
    var size = fiboNumber[i] * 0.01;
    noFill();
    stroke(255);
    ellipse(x, 0, size, size);

    // rotating circle
    noStroke();
    fill(255);
    var y = sin(frameCount * 0.01) * size * 2;
    //ellipse(x, y, 10, 10);

    // rect(x,0,size,size);
    // line(x,0,size,size);

    // var pSet = particleSet[i];
    // for (var ip = 0; ip < pSet.length; ip++) {
    //   pSet[ip].show();
    //   pSet[ip].move();
    // } 
  }

  pop();
}

var Particle = function(centerX, centerY, radius) {
  this.sV = createVector(centerX, centerY);
  this.eV = createVector(centerX, centerY);
  this.moveV = createVector(random(-1, 1), random(-1, 1));
  this.radius = radius;
  this.show = function() {
    line(this.sV.x, this.sV.y, this.eV.x, this.eV.y);
  }
  this.move = function() {
    if (this.sV.dist(this.eV) < radius) {
      this.eV.add(this.moveV);
    }
  }
}