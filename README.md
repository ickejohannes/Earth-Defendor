# Earth Defendor

## Description

An 80s style arcade game where you are defending earth from alien spaceships that come at you from all directions.

## MVP (DOM - CANVAS)

- game has a spaceship in the middle
- player can rotate ship using arrow keys
- player can shoot in directing ship is facing
- enemy ships appear randomly outside of the canvas and move in the general direction of the player
- difficulty increases with score
- player shots destroy enemy ships
- enemy ships destroy player

## Backlog

- enemy ships should fly towards player
- enemy ships should do evasive maneuvers
- add scoreboard
- powerups
- make player spaceship mobile (enemies should then move towards Earth? player?)
- prettify

## Data structure

# index.js

- function start() {}
- function updateCanvas() {}
- function rotateShipClockwise() {}
- rotateShipCounterClockwise() {}
- function shoot()
- Shot() {this.xSpeed; this.ySpeed; this.xPos; this.yPos}
- Enemy() {this.enemyXPos; this.enemyYPos; this.enemyHeight; this.enemyWidth; this.enemyXSpeed; this.enemyYSpeed}
- createEnemy() {}
- chooseRandomSpawnDirection()
- createSpawnPosition()
- createEnemySpeed()
- collisionCheck()
- gameOver()
- resetGame()
- checkForLevelIncrease()

## States y States Transitions

- splashScreen
- gameScreen
- gameOverScreen

## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- index.js - start
- index.js - updateCanvas
- index.js - rotateShipClockwise
- index.js - rotateShipCounterClockwise
- index.js - shoot
- index.js - Shot
- index.js - Enemy
- index.js - createEnemy
- index.js - chooseRandomSpawnDirection
- index.js - createSpawnPosition
- index.js - createEnemySpeed
- index.js - collisionCheck
- index.js - gameOver
- index.js - resetGame
- index.js - checkForLevelIncrease

## Links

###

[Link Trello](https://trello.com/b/asbeRUoA/earth-defendor)

###

[Link Repo](https://github.com/ickejohannes/Earth-Defendor)
