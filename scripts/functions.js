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
    constructor(position, size){
        this.position = position;
        this.size = size;
        this.move = function(x,y) {
            this.position.add(x,y);
        };
        this.draw = function() {
            ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
        };
        this.update = function(){
            if(keyPressed != null) {
                if(keyPressed == 'ArrowUp')
                    this.move(0,-2);
                else if(keyPressed == 'ArrowDown')
                    this.move(0, 2);
                else if(keyPressed == 'ArrowLeft')
                    this.move(-2,0);
                else if(keyPressed == 'ArrowRight')
                    this.move(2,0);    
            }
        }
    }
}
//variables
let keyPressed = null;

//functions
function storeEvent(e) {
    keyPressed = e.key;
    console.log(keyPressed);
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