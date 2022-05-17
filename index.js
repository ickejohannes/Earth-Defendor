//player laser and enemy ships are from here https://redfoc.com/item/space-shooter-game-assets/
//sound effects shot and explosion are from here https://www.playonloop.com/sound-effects-for-videos/boom-slam-impact-sounds/
// player ship currently from here https://pixabay.com/vectors/rocket-spaceship-space-shuttle-nasa-147466/
// background image: https://pixabay.com/illustrations/universe-sky-stars-space-cosmos-2742113/#
// robot voice: https://lingojam.com/RobotVoiceGenerator
// <a href="https://www.vecteezy.com/free-vector/earth">Earth Vectors by Vecteezy</a>


const splashScreen = document.getElementById("splashScreen");
const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const audio = new Audio('./assets/audio/game.mp3');
const playerExplodesSound = new Audio("./assets/audio/playerExplodes.wav");
const enemyShipExplodesSound = new Audio("./assets/audio/enemyShipExplodes.wav");
const playerShootsSound = new Audio("./assets/audio/playerShoots.wav");

let gameStarted = false;

let score = 0;

let level = 1;
let increaseLevelEveryScoreMultiple = 10;

const backgroundImage = new Image();
backgroundImage.src = "./assets/images/bg.jpg";

const earthImage = new Image();
earthImage.src = "./assets/images/Earth.png"


const shipImage = new Image();
shipImage.src = "./assets/images/rocket-147466_640.png";
let playerPosX = 700;
let playerPosY = 400;   
let playerWidth = 50;
let playerHeight = 50;
let shipRotation = 0;
const rotationSpeedConst = 15;
let rotationSpeed = rotationSpeedConst;


const shotImage = new Image();
shotImage.src = "./assets/images/shot.png"
let shots = [];
let shotWidth = 10;
let shotHeight = 10;
xBaseSpeed = 2;
yBaseSpeed = -2;


let enemyArray = [];
const enemyImage = new Image();
enemyImage.src = "./assets/images/enemy_1.png";
let enemySpeed = 1;
let enemyBaseFrequency = 1000;

const explosionImage1 = new Image();
explosionImage1.src = "./assets/images/explosion1.png"
const explosionImage2 = new Image();
explosionImage2.src = "./assets/images/explosion2.png"
const explosionImage3 = new Image();
explosionImage3.src = "./assets/images/explosion3.png"
const explosionImage4 = new Image();
explosionImage4.src = "./assets/images/explosion4.png"
const explosionWidth = 60;
const explosionHeigth = 60;

// collisionAdjuster allows to increase/decrease size of hit boxes relative to image size. the higher the number the smaller the hitbox
const collisionAdjuster = 10;

let leftArrowInterval;
let rightArrowInterval;


// The EventListener starts the game (when it is not running yet), calls the shoot() function to create shots and the rotate functions to rotate the ship
document.addEventListener("keydown", event => {
    if (event.code == "Space") {
        event.preventDefault();
        if (!gameStarted) {
            canvas.setAttribute("style", "");
            splashScreen.setAttribute("style", "display: none");
            start();
            gameStarted = true;
            }
        shoot();
    } else if (event.key == "ArrowLeft") {
        event.preventDefault();
        rotationSpeed = rotationSpeedConst;
        rotateShipCounterClockwise();
    } if (event.key == "ArrowRight") {
        event.preventDefault();
        rotationSpeed = rotationSpeedConst;
        rotateShipClockwise();
      };
})

// Start function is called when space is pressed for the first time. It calls updateCanvas and begins spawning of enemies via setInterval.
function start() {
    updateCanvas();
    intervalID = setInterval(createEnemy, enemyBaseFrequency); 
}

// updateCanvas() draws background, Earth, player and enemy ships and player shots. For every shot it checks for collision with every enemy ship. For every enemy ship it checks for collision with player. If an enemy ship collides with the player it calls gameOver()
function updateCanvas() {
    checkForLevelIncrease();

    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(earthImage, playerPosX-50, playerPosY-50, 100, 100)

    ctx.font = '30px Times';
    ctx.shadowColor="red";
    ctx.shadowBlur = 7;
    ctx.lineWidth=5;
    ctx.strokeText(`SCORE: ${score}`, 40, 60);
    ctx.shadowBlur=0;
    ctx.fillStyle="white";
    ctx.fillText(`SCORE: ${score}`, 40, 60);
    
   
    for (iterator = 0; iterator < shots.length; iterator += 1) {
        let shot = shots[iterator];
        for (i = 0; i < enemyArray.length; i += 1) {
            let enemy = enemyArray[i];
            
            if (collisionCheck(shot.xPos, shot.yPos, shotWidth, shotHeight, enemy.enemyXPos, enemy.enemyYPos, enemy.enemyWidth, enemy.enemyHeight)) {
                enemyArray.splice(i, 1);
                ctx.drawImage(explosionImage1, enemy.enemyXPos, enemy.enemyYPos, explosionWidth, explosionHeigth);
                ctx.drawImage(explosionImage2, enemy.enemyXPos, enemy.enemyYPos, explosionWidth, explosionHeigth);
                /* We could add these two additional explosion stages but they would have to be delayed a bit
                ctx.drawImage(explosionImage3, enemy.enemyXPos, enemy.enemyYPos, explosionWidth, explosionHeigth);
                ctx.drawImage(explosionImage4, enemy.enemyXPos, enemy.enemyYPos, explosionWidth, explosionHeigth);*/
                enemyShipExplodesSound.cloneNode(true).play();
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
            console.log(playerPosX, playerPosY)
            ctx.drawImage(explosionImage1, playerPosX-playerWidth/2-5, playerPosY-playerHeight/2-5, explosionWidth, explosionHeigth);
            playerExplodesSound.play();
            setTimeout(gameOver, 50);
            return;
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

function rotateShipClockwise() {
    shipRotation += rotationSpeed;
}

function rotateShipCounterClockwise() {
    shipRotation -= rotationSpeed;
}


function shoot() {
    shots.push(new Shot(shipRotation));
    audio.play();
    playerShootsSound.cloneNode(true).play();
   
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

// this function generates a random direction for the enemy to come from
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

// this function generates a random position for the enemy to spawn (depending on the direction generated by chooseRandomSpawnDirection())
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

// this function generates a random speed for the enemy depending on the direction he is coming from. Eg when the enemy is coming from the left, he is given a positive horizontal speed of one, vertical speed can vary between 0.5 and -0.5
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

// the collider is adjusted using collisionAdjuster: as we use the image height and width for players/enemies/shots to determine collision, without adjustment collisions will appear to happen too early (as images are boxes), so we shrink the image dimensions a bit for the collider.
function collisionCheck(obj1xPos, obj1yPos, obj1Width, obj1Height, obj2xPos, obj2yPos, obj2Width, obj2Height) {
    if (obj1xPos + obj1Width / 2 -collisionAdjuster > obj2xPos - obj2Width / 2 && obj1xPos - obj1Width / 2 +collisionAdjuster < obj2xPos + obj2Width) {
        if (obj1yPos + obj1Height / 2 -collisionAdjuster > obj2yPos - obj2Height / 2 && obj1yPos - obj1Height / 2 +collisionAdjuster < obj2yPos + obj2Height)
            return true;
    }
}

function gameOver() {
    /* For later user with highscore */
    // window.prompt("Game over! Enter your name and hit enter. Then press space to play again.");
    window.alert("Game over! Do you want to play again? Hit space.");
    resetGame();
}

function resetGame() {
    shots = [];
    level = 1;
    score = 0;
    enemyArray = []
    gameStarted = false;
    // clearInterval(intervalID);
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id);
}
}

// every time the score is bigger than level * increaseLevelEveryScoreMultiple we increase it, this increases enemy spawn frequency
function checkForLevelIncrease() {
    if (score > increaseLevelEveryScoreMultiple * level) {
        level += 1;
        clearInterval(intervalID);
        setInterval(createEnemy, enemyBaseFrequency/level)
    }
}