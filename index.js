//player laser is from here https://redfoc.com/item/space-shooter-game-assets/


const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const audio = new Audio('./assets/audio/game.mp3');


const backgroundImage = new Image();
backgroundImage.src = "./assets/images/bg.jpg";

const shipImage = new Image();
shipImage.src = "./assets/images/rocket-147466_640.png";
xBaseSpeed = 1;
yBaseSpeed = -1;

let shipRotation = 0;
let rotationSpeed = 5;


const shotImage = new Image();
shotImage.src = "./assets/images/shot.png"
let shots = [];



window.onload = () => {
    start();
};
  
function start() {
    updateCanvas();
}
  
function updateCanvas() {
    ctx.drawImage(backgroundImage, 0, 0);
   
    for (iterator = 0; iterator < shots.length; iterator += 1) {
        ctx.drawImage(shotImage, shots[iterator].xPos, shots[iterator].yPos, 10, 10);
        shots[iterator].yPos -= shots[iterator].ySpeed;
        shots[iterator].xPos += shots[iterator].xSpeed;
    }

    ctx.save();
    ctx.translate(700,400);
    ctx.rotate(shipRotation * Math.PI / 180);
    ctx.drawImage(shipImage, -25, -25, 50, 50);
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
    audio.play();
   
}

class Shot {
    constructor(shipRotationAtShot) {
        let radians = shipRotationAtShot * Math.PI / 180
        
        this.xSpeed = Math.cos(radians) * xBaseSpeed
        console.log(Math.cos(radians) * xBaseSpeed)
        this.ySpeed = Math.sin(radians) * yBaseSpeed;
        // this.xSpeed = xBaseSpeed * Math.sin(shipRotationAtShot);
        // this.ySpeed = yBaseSpeed * Math.cos(shipRotationAtShot);
        this.xPos = 695;
        this.yPos = 395;
    }
}
