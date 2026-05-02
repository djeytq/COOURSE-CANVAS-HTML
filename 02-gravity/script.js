const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

var colorsArray = [
    "blue",
    "yellow",
    '#ccc',
    '#000',
    "#ddaa11"
]

var gravity = 1;
var friction = 0.9;

addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

addEventListener('resize', (e) => {
    canvas.width = innerWidth
    canvas.height = innerHeight;
    init()
    
})

addEventListener('click', (e)=>{

    init();
})

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
    return colors[Math.floor(Math.random() * colors.length)]
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        c.beginPath()
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fill()
        c.closePath();
    }

    this.update = function () {
        /*
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy;
        */

        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
            //console.log(this.dy)
        }

        if(this.x + this.radius + this.dx > canvas.width
            || this.x - this.radius <= 0
        ){
            this.dx = -this.dx
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw()
    }
}

//var circleArray = [];
/*
for (var i = 0; i < 100; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = 30
    circleArray.push(new Circle(x, y, dx, dy, radius))
}
*/

//console.log(circleArray)

var ball;
var ballArray;
function init(){
    ballArray = [];
    for(var i = 0; i < 300; i++){
        var radius = randomIntFromRange(8, 20);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);

        var color = randomColor(colorsArray);
        

        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < ballArray.length; i++){
        ballArray[i].update()
    }
    //c.fillText("HTML CANVAS BOILEPLATE", mouse.x, mouse.y)
}

init();
animate();