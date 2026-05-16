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

    console.log(mouse)
    // console.log({c1X: circle1.x, c1Y: circle1.y})
})

window.addEventListener('resize', (event) => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // console.log(mouse)
})

function getDistance(x1, y1, x2, y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius
    this.color = color;

    this.color = this.color || colorArray[Math.floor(Math.random() * colorArray.length)]

    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color
        c.fill()
    }

    this.update = function () {
        this.draw();
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

let circle1;
let circle2;

function init() {

    circle1 = new Circle(300, 300, 100, 'black');
    circle2 = new Circle(10, 10, 30, 'red');
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width, canvas.height);
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();

    if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius){
        circle1.color = "red";
    }else{
        circle1.color = "black";
    }

    // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y))
}

// var circleArray = [];
// function init() {
//     circleArray = [];
//     for (var i = 0; i < 900; i++) {
//         var radius = Math.random() * 3 + 1;
//         var x = Math.random() * (innerWidth - radius * 2) + radius;
//         var y = Math.random() * (innerHeight - radius * 2) + radius;
//         var dx = (Math.random() - 0.5);
//         var dy = (Math.random() - 0.5);
//         circleArray.push(new Circle(x, y, dx, dy, radius))
//     }
// }

// function animate() {
//     requestAnimationFrame(animate)
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }
// }

init();
animate();

let teste = (Math.sqrt(Math.pow(1, 2) + Math.pow(1, 2)));

console.log(teste)

