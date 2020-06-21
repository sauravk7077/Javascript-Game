class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius,0, Math.PI*2, false);
            c.fillStyle = "cyan";
            c.fill();
            c.stroke();
        };
        this.update = function() {
            this.draw();

        };
    }
}

window.addEventListener('resize', init);
window.addEventListener('mousemove', mouseDataInit)

let box, c, circle;
function init(){
    box = document.getElementById('gameCanvas');
    box.width = window.innerWidth - 20;
    box.height = window.innerHeight - 20;
    c = box.getContext('2d');
    circle = new Circle(500,500,100);
}

let mouse = {};
function mouseDataInit(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    circle2 = new Circle(100,100, 100);
    if(getDistance(circle.x, circle.y, circle2.x, circle2.y) > circle.radius+circle2.radius){
        circle.x = mouse.x;
        circle.y = mouse.y;
    }
    circle2.update();
    circle.update();
}

function getDistance(x1, y1, x2, y2){
    let x_distance = Math.abs(x2 -x1);
    let y_distance = Math.abs(y2 - y1);
    return Math.sqrt(Math.pow(x_distance,2)+Math.pow(y_distance,2));
}

function randomRange(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

init();
animate();
