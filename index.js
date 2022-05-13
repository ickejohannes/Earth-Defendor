const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const img = new Image();
img.src = "./assets/images/bg.jpg";

const ship = new Image();
ship.src = "./assets/images/rocket-147466_640.png";

let shipRotation = 0;

let shots = [];

ySpeed = 1;

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
   

    ctx.save();
    ctx.translate(700,400);
    ctx.rotate(shipRotation * Math.PI / 180);
    ctx.drawImage(ship, -25, -25, 50, 50);
    ctx.restore();

    
    for (iterator = 0; iterator < shots.length; iterator += 1) {
        ctx.fillRect(shots[iterator].xPos, shots[iterator].yPos, 20, 20);
        shots[iterator].yPos -= ySpeed;
    }


    requestAnimationFrame(updateCanvas);
}
    
document.addEventListener("keydown", event => {
    console.log(event);
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
    shipRotation += 1;
}

function rotateShipCounterClockwise() {
    shipRotation -= 1;
}

function shoot() {
    shots.push(new Shot);
}

class Shot {
        xSpeed = 0;
        
        xPos = 200;
        yPos = 200;
}
