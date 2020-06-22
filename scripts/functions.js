let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
}
class Thing {
    constructor(position, size, angle = 0, velocity = new Vector(0, 0)) {
        this.barrel = 0;
        this.position = position;
        this.size = size;
        this.angle = angle; //This angle is in degrees
        this.velocity = velocity;
    }
    move(vector) {
        this.position.add(vector);
    }
    draw() {
        ctx.fillStyle = '#000';
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
    update() { } //For inheritance
}
class GravityObject extends Thing {
    constructor(position, size, angle = 0, isPlayer = false) {
        super(position, size, angle);
        this.gravity = 1;
        this.isGravityEnabled = true;
        this.isPlayer = isPlayer;
    }
    actGravity() {
        if (this.isGravityEnabled)
            this.velocity.add(new Vector(0, this.gravity));
    }
    update() {
        if (!this.inGround()) {
            this.actGravity();
            this.move(this.velocity);
        }
        //Player Controls
        if (this.isPlayer) {
            if (keyPressed == 'ArrowRight')
                this.position.add(new Vector(2, 0));
            else if (keyPressed == 'ArrowLeft')
                this.position.add(new Vector(-2, 0));
        }
    }
    inGround() {
        return false;
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
let ground;
let gameObjects;
function init() {
    canvas.width = innerWidth - 20;
    canvas.height = innerHeight - 20;
    player = new GravityObject(new Vector(100, 100), new Vector(50, 50), 0, true);
    ground = new GravityObject(new Vector(100, 500), new Vector(500, 50));
    ground.isGravityEnabled = false;
    gameObjects = [];
    gameObjects.push(ground);
    gameObjects.push(player);
}
function hasCollided(ob1, ob2) {
    var box1 = new Vector(ob1.position.x + ob1.size.x, ob1.position.y + ob1.size.y);
    var box2 = new Vector(ob2.position.x + ob2.size.x, ob2.position.y + ob2.size.y);
    if (distance(ob1.position, ob2.position) == 0)
        return true;
    if (distance(box1, ob2.position) == 0)
        return true;
    if (distance(ob1.position, box2) == 0)
        return true;
    if (distance(box1, box2) == 0)
        return true;
    return false;
}
function distance(ob1, ob2) {
    return Math.sqrt(Math.pow(ob1.x - ob2.x, 2) + Math.pow(ob1.y - ob2.y, 2));
}
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    //ctx.fillStyle = 'rgba(255,255,255,0.3)';
    //ctx.fillRect(0,0, innerWidth, innerHeight);
    for (let ob of gameObjects) {
        ob.draw();
        ob.update();
    }
    if (hasCollided(gameObjects[0], gameObjects[1]))
        console.log("true");
}
init();
animate();
