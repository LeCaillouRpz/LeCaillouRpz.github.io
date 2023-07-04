const SCALING = 1e6;
const DT = .001;
const GRAVITY = 9.81/SCALING;
const KB = 1.38e-23;

const FREQUENCIES = [1, 160];
const surQ0 = [1e-7, 1e-1];
const T = [0, 1e-2];

const BALL_MASS =  5.6e-9;
const BALL_RADIUS = 50e-6*SCALING;

let BALL;
let freq_slider_x_label, freq_slider_y_label, surQ0_slider_label, T_slider_label;
let freq_slider_x, freq_slider_y, surQ0_slider, T_slider;

let bx;
let by;
let locked = false;

function setup() {
    createCanvas(700, 700);
    freq_slider_x_label = createP('Frequency x');
    freq_slider_x = createSlider(FREQUENCIES[0], FREQUENCIES[1], 20, .1);
    freq_slider_y_label = createP('Frequency y');
    freq_slider_y = createSlider(FREQUENCIES[0], FREQUENCIES[1], 41, .1);
    surQ0_slider_label = createP('1/Q0');
    surQ0_slider = createSlider(surQ0[0], surQ0[1], surQ0[0], 1e-8);
    T_slider_label = createP('Temperature');
    T_slider = createSlider(T[0], T[1], 0, 1e-6);
    BALL = new ball(BALL_RADIUS, BALL_MASS, width/2+100, height/2+100, 0, 0);
}

function draw() {
    background(51);
    if (locked) {
        BALL.position = createVector(mouseX, mouseY);
    } else {
        BALL.update();
    }
    BALL.show();
}

function mousePressed() {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0 ) {
        locked = true;
        BALL.velocity = createVector(0, 0);
    }
    xOffset = mouseX - bx;
    yOffset = mouseY - by;
  }
  
  function mouseDragged() {
    if (locked) {
      bx = mouseX - xOffset;
      by = mouseY - yOffset;
    }
  }
  
  function mouseReleased() {
    locked = false;
  }