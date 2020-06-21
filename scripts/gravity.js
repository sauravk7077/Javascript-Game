class Circle {
    constructor(x, y, radius, dx = 1, dy=1) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.g = 0.2;
        this.friction = 0.97;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius,0, Math.PI*2, false);
            c.fillStyle = "cyan";
            c.fill();
            c.stroke();
        };
        this.update = function() {
            if(this.x > box.width - this.radius || this.x < this.radius)
                this.dx = - this.dx;
            if(this.y > box.height - this.radius - this.dy || this.y < this.radius)
                this.dy = - this.friction * this.dy;
            this.draw();
            this.x += this.dx;
            this.y += this.dy;
            this.dy += this.g;
            
        };
    }
}

window.addEventListener('resize', init);
var box, c, circle;
function init(){
    box = document.getElementById('gameCanvas');
    box.width = window.innerWidth - 20;
    box.height = window.innerHeight - 20;
    c = box.getContext('2d');
    circle = new Circle(randomRange(0,box.width),100,50,0,0);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    circle.update();
}

function randomRange(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}


animate();