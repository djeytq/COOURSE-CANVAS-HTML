var larguraDaTela = window.innerWidth - 40;
var alturaDaTela = window.innerHeight - 40;


class Bola {
    constructor(c) {
        this.radius = Math.floor(Math.random() * 30);
        this.x = Math.random() * (larguraDaTela - this.radius * 2) + this.radius;
        this.y = Math.random() * (alturaDaTela - this.radius * 2) + this.radius;
        this.dx = 2;
        this.dy = 2;
        this.c = c;
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.c.stroke();
        this.c.closePath();
    }

    move() {
        if (this.x > larguraDaTela - 30 || this.x < 0 + 30) {
            this.dx *= -1;
        } else if (this.y > alturaDaTela - 30 || this.y < 0 + 30) {
            this.dy *= -1;
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    update() {
        this.draw();
        this.move();

    }
}

export default Bola;