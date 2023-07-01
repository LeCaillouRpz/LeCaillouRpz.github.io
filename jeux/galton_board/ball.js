class ball {
    constructor() {
        this.position = createVector(width/2 + SCATTER*(1 - Math.random()*2), 20);
        this.velocity = createVector();
        this.acceleration = createVector(0, GRAVITY);
        this.diameter = 4;
    }

    collideBalls() {
        for (let ball of balls) {
            let lim = ball.diameter;
            let d = p5.Vector.dist(this.position, ball.position);
            if (d <= lim) {
                let Pvec = p5.Vector.sub(this.position, ball.position);
                let Vvec = p5.Vector.sub(this.position, ball.position);
                let fac = R_BALL_BALL*p5.Vector.dot(Vvec, Pvec) / Pvec.mag()^2
                this.velocity.sub(p5.Vector.mult(Pvec, fac))
                ball.velocity.add(p5.Vector.mult(Pvec, fac))
            }
        }
    }

    collideWalls() {
        for (let wall of walls) {
            let col = wall.collide(this);
            if (col != false) {
                this.position.add(col[0]);
                this.velocity.add(col[1]);
                return;
            }
        }
    }

    collideBorders() {
        let r = this.diameter/2;
        let x = this.position.x;
        let y = this.position.y;
        if (x - r < 0) {
            this.position.x = r;
            this.velocity.x *= -R_BALL_BORDER;
        } else if (x + r > width) {
            this.position.x = width - r;
            this.velocity.x *= -R_BALL_BORDER;
        }
        if (y - r < 0) {
            this.position.y = r;
            this.velocity.y *= -R_BALL_BORDER;
        } else if (y + r > height) {
            this.position.y = height - r;
            this.velocity.y *= -R_BALL_BORDER;
        }
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    draw() {
        strokeWeight(this.diameter);
        stroke(255);
        point(this.position.x, this.position.y);
    }

}