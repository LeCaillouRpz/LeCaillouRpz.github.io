const balls = [];
const walls = [];
const GRAVITY = .05;

const SCATTER = 20;
const NB_BALLS = 100;

const R_BALL_BALL = 0.1;
const R_BALL_WALL = 0.6;
const R_BALL_BORDER = 0.2;

const NB_LINES = 12;
const SPACING = 30;
const HEIGHT = 20;

function setup() {
    createCanvas(600, 600);

    let wy = 0;
    let wx = 0;
    for (let i=1; i < NB_LINES; i ++) {
        wy = HEIGHT + i*SPACING*Math.sqrt(3/4);
        for (let j=0; j<width/SPACING; j++) {
            wx = (i%2)*SPACING/2 + j*SPACING;
            walls.push(new pointWall(wx, wy));
        }
    }

    for (let i=1; i < 20; i++) {
        wx = i*width/20;
        walls.push(new wall(wx, height, wx, height - 100));
    }

    for (let i=0; i < NB_BALLS; i++) {
        balls.push(new ball());
    }


}

function draw() {
    background(51);
    for (let wall of walls) {
        wall.draw();
    }
    for (let ball of balls) {
        ball.collideBorders();
        ball.collideWalls();
        ball.update();
        ball.draw();
    }
}