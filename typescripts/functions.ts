let canvas:any = document.getElementById('gameCanvas');
let ctx:CanvasRenderingContext2D = canvas.getContext('2d');

class Vector{

    x:number;
    y:number;

    constructor(x: number,y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector:Vector){
        this.x += vector.x;
        this.y += vector.y;
    }
}

class Thing{

    barrel: number;
    position: Vector;
    size: Vector;
    angle: number;
    velocity: Vector;

    constructor(position: Vector, size: Vector, angle:number=0, velocity=new Vector(0,0)){
        this.barrel = 0;
        this.position = position;
        this.size = size;
        this.angle = angle; //This angle is in degrees
        this.velocity = velocity;
    }
    

    move(vector:Vector):void {
        this.position.add(vector);
    }
    draw():void {
        ctx.fillStyle = '#000';
        ctx.rotate(this.angle * Math.PI/180);
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update():void{} //For inheritance
}

class GravityObject extends Thing{
    gravity: number;
    isGravityEnabled:boolean;
    isPlayer:boolean;
    constructor(position: Vector, size: Vector, angle:number=0, isPlayer:boolean=false){
        super(position, size, angle);
        this.gravity = 1;
        this.isGravityEnabled = true;
        this.isPlayer = isPlayer;
    }

    actGravity(){
        if(this.isGravityEnabled)
            this.velocity.add(new Vector(0,this.gravity));
    }

    update() {
        if(!this.inGround()) {
            this.actGravity();
            this.move(this.velocity);
        }
        //Player Controls
        if(this.isPlayer){
        if(keyPressed == 'ArrowRight')
            this.position.add(new Vector(2, 0));
        else if(keyPressed == 'ArrowLeft')
            this.position.add(new Vector(-2,0));
        }
    }
    inGround():boolean {
        return false;
    }
}


//variables
let keyPressed:String = null;

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

let player:GravityObject;
let ground:GravityObject;
let gameObjects: Thing[];
function init() {
    canvas.width = innerWidth -20;
    canvas.height = innerHeight -20;
    player = new GravityObject(new Vector(100,100), new Vector(50,50), 0, true);
    ground = new GravityObject(new Vector(100,500), new Vector(500,50));
    ground.isGravityEnabled = false;
    gameObjects = [];
    gameObjects.push(ground);
    gameObjects.push(player);
}

function hasCollided(ob1: Thing, ob2: Thing) {
    var box1 = new Vector(ob1.position.x + ob1.size.x, ob1.position.y + ob1.size.y);
    var box2 = new Vector(ob2.position.x + ob2.size.x, ob2.position.y + ob2.size.y);
    if(distance(ob1.position, ob2.position) == 0)
        return true;
    if(distance(box1, ob2.position) == 0)
        return true;
    if(distance(ob1.position,box2) ==0)
        return true;
    if(distance(box1, box2) == 0)
        return true;
    return false;
}

function distance(ob1:Vector, ob2:Vector){
    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y, 2));
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    //ctx.fillStyle = 'rgba(255,255,255,0.3)';
    //ctx.fillRect(0,0, innerWidth, innerHeight);
    for(let ob of gameObjects){
        ob.draw();
        ob.update();
    }
    if(hasCollided(gameObjects[0],gameObjects[1]))
        console.log("true");
    
}

init();
animate();