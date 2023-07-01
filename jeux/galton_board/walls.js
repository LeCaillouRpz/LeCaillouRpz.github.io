class pointWall {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.thickness = 10;
    }

    collide(ball) {
        let lim = ball.diameter/2 + this.thickness/2;
        let d = p5.Vector.dist(this.position, ball.position);
        if (d > lim) {
            return false;
        }
        let vec = p5.Vector.sub(ball.position, this.position);
        vec.div(vec.mag());
        return [p5.Vector.mult(vec, lim - d), p5.Vector.mult(vec, -2*R_BALL_WALL*p5.Vector.dot(ball.velocity, vec))];
    }

    draw() {
        strokeWeight(this.thickness);
        stroke(120);
        point(this.position.x, this.position.y);
    }
}

class wall {
    constructor(x1, y1, x2, y2) {
        this.startPoint = createVector(x1, y1);
        this.endPoint = createVector(x2, y2);
        this.direction = p5.Vector.sub(this.endPoint, this.startPoint);
        this.thickness = 10;
    }

    orthogonalProjection2(p) {
        // find nearest point alont a SEGMENT 
        let d1 = p5.Vector.sub(this.endPoint, this.startPoint);
        let d2 = p5.Vector.sub(p, this.startPoint);
        let l1 = d1.mag();
        let dotp = constrain(d2.dot(d1.normalize()), 0, l1);
        return p5.Vector.add(this.startPoint, d1.mult(dotp))
      }

    collide(ball) {
        let point = this.orthogonalProjection2(ball.position);
        let lim = ball.diameter/2 + this.thickness/2;
        let d = p5.Vector.dist(ball.position, point);
        if (d > lim) {
            return false;
        }
        let vec = p5.Vector.sub(ball.position, point);
        vec.div(vec.mag());
        return [p5.Vector.mult(vec, lim - d), p5.Vector.mult(vec, -2*R_BALL_WALL*p5.Vector.dot(ball.velocity, vec))];
    }

    draw() {
        strokeWeight(this.thickness);
        stroke(120);
        line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    }
}