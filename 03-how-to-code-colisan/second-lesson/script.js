const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

var mouse = {
    x: 10,
    y: 10
}

var maxRadius = 40.
var minRadius = 2;

var colorArray = [
    '#ffaa33',
    '#99ffaa',
    '#00ff00',
    "#4411aa",
    "#ff1100"
];

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    // console.log(mouse)
    // console.log({c1X: circle1.x, c1Y: circle1.y})
})

window.addEventListener('resize', (event) => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // console.log(mouse)
});

function rotate(velocity, angle) {
    const rotateVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) - velocity.y * Math.sin(angle)
    };

    return rotateVelocities;
}

function resolveColision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)

        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function randomIntFromRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function randomColor(colors) {
    return colorArray[Math.floor(Math.random() * colors.length)]
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: (Math.random() - .5) * 5,
        y: (Math.random() - .5) * 5
    }
    this.radius = radius
    this.color = color;
    this.mass = 1;
    this.opacity = 0;

    this.color = this.color || colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save()
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore()
        c.strokeStyle = this.color
        c.stroke()
    }

    this.update = particles => {
        this.draw();

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;

            if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                resolveColision(this, particles[i])
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius > innerWidth) {
            this.velocity.x *= -1;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius > innerHeight) {
            this.velocity.y *= -1;
        }

        //mouse colision
        if(getDistance(mouse.x, mouse.y, this.x, this.y) < 30 && this.opacity < 0.2){
            this.opacity += 0.02;
        }else if(this.opacity > 0){
            this.opacity -= 0.02;
            this.opacity = Math.max(0 ,this.opacity)
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    // this.update = function () {
    //     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
    //         this.dx = -this.dx
    //     }

    //     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
    //         this.dy = -this.dy
    //     }

    //     this.x += this.dx;
    //     this.y += this.dy;

    //     //interacting
    //     if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
    //         if (this.radius < maxRadius) {
    //             this.radius += 1;
    //         }
    //     } else if (this.radius > this.minRadius) {
    //         this.radius -= 1;
    //     }

    //     this.draw()
    // }
}

let particles;

function init() {

    particles = [];

    for (var i = 0; i < 100; i++) {
        const radius = 15;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        const color = randomColor(colorArray);

        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    j = -1;

                }

            }
        }
        particles.push(new Particle(x, y, radius, color))
    }

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);


    particles.forEach(particle => {
        particle.update(particles);
    });

    // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y))
}

init();
animate();

