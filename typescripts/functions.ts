let canvas:any = document.getElementById('gameCanvas');
let ctx:CanvasRenderingContext2D = canvas.getContext('2d');

class Vector{

    x:number;
    y:number;

    constructor(x: number,y: number) {
        this.x = x;
        this.y = y;
    }

    add(a: number,b: number):void {
        this.x +=a;
        this.y +=b;
    }
}

class Thing{

    barrel: number;
    position: Vector;
    size: Vector;
    angle: number;

    constructor(position: Vector, size: Vector, angle:number=0){
        this.barrel = 0;
        this.position = position;
        this.size = size;
        this.angle = angle; //This angle is in degrees
    }

    move(a: number,b: number):void {
        this.position.add(a,b);
    }
    draw():void {
        ctx.fillStyle = '#000';
        ctx.rotate(this.angle * Math.PI/180);
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update():void {
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
//variables
let keyPressed = null;

//functions
function storeEvent(e:KeyboardEvent):void {
    keyPressed = e.key;
    console.log(e);
}
function removeEvent(e:KeyboardEvent):void {
    keyPressed = null;
}


//Event Listeners
window.addEventListener('keydown', storeEvent);
window.addEventListener('keyup', removeEvent);

//run

let player:Thing;
function init() {
    canvas.width = innerWidth -20;
    canvas.height = innerHeight -20;
    player = new Thing(new Vector(100,100), new Vector(50,50));
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    //ctx.fillStyle = 'rgba(255,255,255,0.3)';
    //ctx.fillRect(0,0, innerWidth, innerHeight);
    player.draw();
    player.update();
}

init();
animate();