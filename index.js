//player laser is from here https://redfoc.com/item/space-shooter-game-assets/


const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const audio = new Audio('./assets/audio/game.mp3');


const backgroundImage = new Image();
backgroundImage.src = "./assets/images/bg.jpg";


const shipImage = new Image();
shipImage.src = "./assets/images/rocket-147466_640.png";
let playerPosX = 700;
let playerPosY = 400;   
let playerWidth = 50;
let playerHeigth = 50;

xBaseSpeed = 1;
yBaseSpeed = -1;
let shipRotation = 0;
let rotationSpeed = 5;

const shotImage = new Image();
shotImage.src = "./assets/images/shot.png"
let shots = [];


const enemyArray = [];
const enemyImage = new Image();
enemyImage.src = "./assets/images/enemy_1.png";
let enemySpeed = 1;
let enemyFrequency = 2000;




window.onload = () => {
    start();
};
  
function start() {
    updateCanvas();
    setInterval(createEnemy, enemyFrequency); 
}
  
function updateCanvas() {
    ctx.drawImage(backgroundImage, 0, 0);
   
    for (iterator = 0; iterator < shots.length; iterator += 1) {
        ctx.drawImage(shotImage, shots[iterator].xPos, shots[iterator].yPos, 10, 10);
        shots[iterator].yPos -= shots[iterator].ySpeed;
        shots[iterator].xPos += shots[iterator].xSpeed;
    }

    for (iterator = 0; iterator < enemyArray.length; iterator += 1) {
        let enemy = enemyArray[iterator];
        if (collisionCheck(playerPosX, playerPosY, playerWidth, playerHeigth, enemy.enemyXPos, enemy.enemyYPos, enemy.enemyWidth, enemy.enemyHeight)) {
            gameOverPrinter();
        }
        ctx.drawImage(enemyImage, enemy.enemyXPos, enemy.enemyYPos, enemy.enemyWidth, enemy.enemyHeight);
        enemy.enemyXPos += enemy.enemyXSpeed;
        enemy.enemyYPos += enemy.enemyYSpeed;  
    }

    ctx.save();
    ctx.translate(playerPosX,playerPosY);
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
        this.ySpeed = Math.sin(radians) * yBaseSpeed;
        this.xPos = 695;
        this.yPos = 395;
    }
}

class Enemy {
    constructor(xPos, yPos, xSpeed, ySpeed) {
        this.enemyXPos = xPos;
        this.enemyYPos = yPos;
        this.enemyHeight = 60;
        this.enemyWidth = 30;
        this.enemyXSpeed = xSpeed;
        this.enemyYSpeed = ySpeed;
    };
    
  }

function createEnemy() {
    let enemySpawnDirection = chooseRandomSpawnDirection();
    let enemySpawnPosition = createSpawnPosition(enemySpawnDirection);
    let enemySpeed = createEnemySpeed(enemySpawnDirection);
    enemyArray.push(new Enemy(enemySpawnPosition[0], enemySpawnPosition[1], enemySpeed[0], enemySpeed[1]));
}

function chooseRandomSpawnDirection() {
    let randomNumber = Math.random()
    if (randomNumber < 0.25) {
        return "left";
    } else if (randomNumber < 0.5) {
        return "top";
    } else if (randomNumber < 0.75) {
        return "right";
    } else {
        return "bottom";
    }

}

function createSpawnPosition(direction) {
    if (direction == "left") {
        return [-50, Math.random() * 800];
    } else if (direction == "top") {
        return [Math.random() * 1500, -50];
    } else if (direction == "right") {
        return [1550, Math.random() * 800];
    } else {
        return [Math.random() * 1500, 850];
    }
}

function createEnemySpeed(direction) {
    if (direction == "left") {
        return [1, Math.random()-0.5];
    } else if (direction == "top") {
        return [Math.random()-0.5, 1];
    } else if (direction == "right") {
        return [-1, -(Math.random()-0.5)];
    } else {
        return [-(Math.random()-0.5) , -1];
    }
}

function collisionCheck(obj1xPos, obj1yPos, obj1Width, obj1Heigth, obj2xPos, obj2yPos, obj2Width, obj2Height) {
    if (obj1xPos + obj1Width / 2 > obj2xPos - obj2Width / 2 && obj1xPos - obj1Width / 2 < obj2xPos + obj2Width) {
        if (obj1yPos + obj1Heigth / 2 > obj2yPos - obj2Height / 2 && obj1yPos - obj1Heigth / 2 < obj2yPos + obj2Height)
            return true;
    }
}

/* function collisionCheck(enemyShip) { //25 in beide RIchtungen für Spieler, 60 hoch 30 breit für Enemies
    if (enemyShip.enemyXPos +15 > playerPosX-25 && enemyShip.enemyXPos -15 < playerPosX+25) {
        if (enemyShip.enemyYPos +30 > playerPosY-25 && enemyShip.enemyYPos -30 < playerPosY+25 ) {
            gameOver = true;
        }
    }
} */

function gameOverPrinter() {
    console.log("Game over!");
}