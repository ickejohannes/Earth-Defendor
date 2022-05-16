//player laser is from here https://redfoc.com/item/space-shooter-game-assets/


const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const audio = new Audio('./assets/audio/game.mp3');

let score = 0;

let level = 1;

const backgroundImage = new Image();
backgroundImage.src = "./assets/images/bg.jpg";


const shipImage = new Image();
shipImage.src = "./assets/images/rocket-147466_640.png";
let playerPosX = 700;
let playerPosY = 400;   
let playerWidth = 50;
let playerHeight = 50;
let shipRotation = 0;
let rotationSpeed = 10;


const shotImage = new Image();
shotImage.src = "./assets/images/shot.png"
let shots = [];
let shotWidth = 10;
let shotHeight = 10;
xBaseSpeed = 2;
yBaseSpeed = -2;


const enemyArray = [];
const enemyImage = new Image();
enemyImage.src = "./assets/images/enemy_1.png";
let enemySpeed = 1;
let enemyBaseFrequency = 1000;




window.onload = () => {
    start();
};
  
function start() {
    updateCanvas();
    intervalID = setInterval(createEnemy, enemyBaseFrequency); 
}
  
function updateCanvas() {
    checkForLevelIncrease();

    ctx.drawImage(backgroundImage, 0, 0);

    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${score}`, 40, 40);
    
   
    for (iterator = 0; iterator < shots.length; iterator += 1) {
        let shot = shots[iterator];
        for (i = 0; i < enemyArray.length; i += 1) {
            let enemy = enemyArray[i];
            
            if (collisionCheck(shot.xPos, shot.yPos, shotWidth, shotHeight, enemy.enemyXPos, enemy.enemyYPos, enemy.enemyWidth, enemy.enemyHeight)) {
                enemyArray.splice(i, 1);
                shots.splice(iterator, 1);
                score += 1;
            }
        }
        ctx.drawImage(shotImage, shot.xPos, shot.yPos, shotWidth, shotHeight);
        shot.yPos -= shot.ySpeed;
        shot.xPos += shot.xSpeed;
    }

    for (iterator = 0; iterator < enemyArray.length; iterator += 1) {
        let enemy = enemyArray[iterator];
        if (collisionCheck(playerPosX, playerPosY, playerWidth, playerHeight, enemy.enemyXPos, enemy.enemyYPos, enemy.enemyWidth, enemy.enemyHeight)) {
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

function collisionCheck(obj1xPos, obj1yPos, obj1Width, obj1Height, obj2xPos, obj2yPos, obj2Width, obj2Height) {
    if (obj1xPos + obj1Width / 2 > obj2xPos - obj2Width / 2 && obj1xPos - obj1Width / 2 < obj2xPos + obj2Width) {
        if (obj1yPos + obj1Height / 2 > obj2yPos - obj2Height / 2 && obj1yPos - obj1Height / 2 < obj2yPos + obj2Height)
            return true;
    }
}

function gameOverPrinter() {
    console.log("Game over!");
}

function checkForLevelIncrease() {
    if (score > 5 * level) {
        level += 1;
        clearInterval(intervalID);
        setInterval(createEnemy, enemyBaseFrequency/level)
    }
}