const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./assets/images/bg.jpg";

const ship = new Image();
ship.src = "./assets/images/rocket-147466_640.png";
xBaseSpeed = 1;
yBaseSpeed = -1;

let shipRotation = 0;
let rotationSpeed = 5;

let shots = [];



window.onload = () => {
    start();
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(ship, canvas.width/2, canvas.height/2, 50, 50);
};
  
function start() {
    // new Audio("").play()
    // intervalID = setInterval(createObstacle, obstacleFrequency);
    updateCanvas();
}
  
function updateCanvas() {
    ctx.drawImage(img, 0, 0);
   
    for (iterator = 0; iterator < shots.length; iterator += 1) {
        ctx.fillRect(shots[iterator].xPos, shots[iterator].yPos, 20, 20);
        shots[iterator].yPos -= shots[iterator].ySpeed;
        shots[iterator].xPos += shots[iterator].xSpeed;
    }

    ctx.save();
    ctx.translate(700,400);
    ctx.rotate(shipRotation * Math.PI / 180);
    ctx.drawImage(ship, -25, -25, 50, 50);
    ctx.restore();


    requestAnimationFrame(updateCanvas);
}
    
document.addEventListener("keydown", event => {
    if (event.code == "Space") {
        event.preventDefault();
        shoot();
    } else if (event.key == "ArrowLeft") {
        event.preventDefault();
        rotateShipClockwise();
    } if (event.key == "ArrowRight") {
        event.preventDefault();
        rotateShipCounterClockwise();
      };
})

function rotateShipClockwise() {
    shipRotation -= rotationSpeed;
}

function rotateShipCounterClockwise() {
    shipRotation += rotationSpeed;
}

function shoot() {
    shots.push(new Shot(shipRotation));
   
}

class Shot {
    constructor(shipRotationAtShot) {
        let radians = shipRotationAtShot * Math.PI / 180
        
        this.xSpeed = Math.cos(radians) * xBaseSpeed
        console.log(Math.cos(radians) * xBaseSpeed)
        this.ySpeed = Math.sin(radians) * yBaseSpeed;
        // this.xSpeed = xBaseSpeed * Math.sin(shipRotationAtShot);
        // this.ySpeed = yBaseSpeed * Math.cos(shipRotationAtShot);
        this.xPos = 700;
        this.yPos = 400;
    }
}
