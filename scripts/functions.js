let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    add(a,b) {
        this.x +=a;
        this.y +=b;
    }
}

class Thing{
    constructor(position, size, angle= 0){
        this.barrel = 0;
        this.position = position;
        this.size = size;
        this.angle = angle; //This angle is in degrees
        this.move = function(x,y) {
            this.position.add(x,y);
        };
        this.draw = function() {
            ctx.rotate(this.angle * Math.PI/180);
            ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        };
        this.update = function(){
            if(keyPressed != null) {
                if(keyPressed == 'ArrowUp' && this.position.y > 0)
                    this.move(0,-2);
                else if(keyPressed == 'ArrowDown' && this.position.y + this.size.y < canvas.height)
                    this.move(0, 2);
                else if(keyPressed == 'ArrowLeft' && this.position.x > 0)
                    this.move(-2,0);
                else if(keyPressed == 'ArrowRight' && this.position.x + this.size.x < canvas.width)
                    this.move(2,0);
                else if(keyPressed == ' ' && this.barrel == 0)
                    this.barrel = 90;
                else if(keyPressed == 'r')
                    this.angle = 5;
            }
            if(this.barrel != 0){
                if(this.barrel > 50){
                    this.move(0, -10);
                }
                else if(this.barrel < 50){
                    this.move(0,10);
                }
                this.barrel -= 10;
            }
        }
    }
}
//variables
let keyPressed = null;

//functions
function storeEvent(e) {
    keyPressed = e.key;
    console.log(e);
}
function removeEvent(e) {
    keyPressed = null;
}


//Event Listeners
window.addEventListener('keydown', storeEvent);
window.addEventListener('keyup', removeEvent);

//run

let player;
function init() {
    canvas.width = innerWidth -20;
    canvas.height = innerHeight -20;
    player = new Thing(new Vector(100,100), new Vector(50,50));
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    player.draw();
    player.update();
}

init();
animate();