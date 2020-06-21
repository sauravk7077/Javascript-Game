class Circle {
    constructor(x, y, radius, dx = 1, dy=1) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius,0, Math.PI*2, false);
            c.fillStyle = "cyan";
            c.fill();
        };
        this.update = function() {
            if(this.x >= innerWidth - this.radius || this.x <= this.radius)
                this.dx = - this.dx;
            if(this.y >= innerHeight - this.radius || this.y <= this.radius )
                this.dy = - this.dy;
            
            
            this.x += this.dx;
            this.y += this.dy;

            //Interactivity
            if(Math.abs(mousePosition.x - this.x) < 60 && Math.abs(mousePosition.y - this.y) < 60 && this.radius <= 100){
                this.radius += 2;
            }
            else if (this.radius>10)
                this.radius--;

            this.draw();
        };
    }
}

var mousePosition = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove', function(event) {
    mousePosition.x = event.x;
    mousePosition.y = event.y;
})

box = document.getElementById('gameCanvas');
box.width = window.innerWidth;
box.height = window.innerHeight;
c = box.getContext('2d');


var circleArray = [];

for(i = 0;i<300;i++){
    var ce = new Circle(Math.random()* innerWidth,
        Math.random() * innerHeight, Math.random() * 40, Math.random() * 4, Math.random()*4);
    circleArray.push(ce);
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    for(j = 0;j<300;j++){
        circleArray[j].update();
    }
}



animate();