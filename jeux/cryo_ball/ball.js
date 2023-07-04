class ball {
    constructor(r, m, x, y, vx, vy) {
        this.r = r;
        this.m = m;
        this.position = createVector(x, y);
        this.velocity = createVector(vx, vy);
        this.acceleration = createVector(0, 0);
        this.volume = 4*Math.PI*this.r**3/3;
    }

    equa_diff() {
        let omega_x = 2*Math.PI*freq_slider_x.value();
        let omega_y = 2*Math.PI*freq_slider_y.value();

        let pos = p5.Vector.sub(this.position, createVector(width/2, height/2));
        let gamma_x = this.m*omega_x*surQ0_slider.value()
        let gamma_y = this.m*omega_y*surQ0_slider.value()
        let damp = createVector(-this.velocity.x*gamma_x, -this.velocity.y*gamma_y);
        let kx = (2*Math.PI*freq_slider_x.value())**2*this.m
        let ky = (2*Math.PI*freq_slider_y.value())**2*this.m
        let harm = createVector(-pos.x*kx, -pos.y*ky);
        let therm = createVector(random(-1, 1), random(-1, 1));
        therm.setMag(T_slider.value());
        return p5.Vector.add(p5.Vector.add(harm, damp), therm);
    }

    update() {
        this.acceleration = p5.Vector.div(this.equa_diff(), this.m);
        this.velocity.add(p5.Vector.mult(this.acceleration, DT));
        this.position.add(p5.Vector.mult(this.velocity, DT));
    }

    show() {
        strokeWeight(this.r*2);
        stroke(255);
        point(this.position.x, this.position.y);
    }
}