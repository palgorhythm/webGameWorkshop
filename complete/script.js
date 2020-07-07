// Configuration variables that change the behavior of the game
const FRAMES_PER_SECOND = 50
const GRAVITY = 0.05
const THRUST_POWER = 0.2

// create the game canvas and make it a square!
const canvas = document.getElementById('game-screen')
canvas.width = 500
canvas.height = 500

// get the 2d context of the canvas, which allows us to draw shapes on it!
const canvasContext = canvas.getContext('2d')
let frameNumber = 0 // tracks how long the game has been going on

// create the flappy square and the game score objects,
// and create the gameObstacles array (it's empty, to start!)
let gamePiece = createGameComponent(30, 30, 'red', 10, 120)
gamePiece.acceleration = GRAVITY
canvasContext.font = '30px Comic Sans MS'
let gameObstacles = []

// update the game state
function updateGame() {
  if (didGamePieceCrashIntoAnObstacle()) {
    clearInterval(gameUpdater)
  }
  if (frameNumber % 150 === 0) { // 2. create obstacles (not every frame though!!)
    createObstacle('green')
  }
  clearCanvas() // try removing this and seeing what happens :]
  updateObstacles() // 4. move and draw our obstacles
  gamePiece.update() // 5. move and draw our game piece
  updateScore()
  frameNumber += 1
}

// 1. check if our game piece crashed into any obstacles
function didGamePieceCrashIntoAnObstacle() {
  for (let i = 0; i < gameObstacles.length; i += 1) {
    if (gamePiece.didCrashWith(gameObstacles[i])) {
      return true
    }
  }
  return false
}

// 3. clear the canvas so we can draw new things on it during this frame
function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}

// 4. update obstacles
function updateObstacles() {
  for (let i = 0; i < gameObstacles.length; i += 1) {
    gameObstacles[i].update()
  }
}

// 6. update the score and draw it
function updateScore() {
  canvasContext.fillStyle = 'black'
  const score = getScore()
  canvasContext.fillText('SCORE: ' + score, 280, 40)
}

// get score utility for 6.
function getScore() {
  return Math.floor(frameNumber / FRAMES_PER_SECOND)
}

// last part of A: make the game state update happen over and over again!
const gameUpdater = setInterval(updateGame, 1000 / FRAMES_PER_SECOND)

// B. make the space bar change the acceleration of the game piece
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)
function keyDownHandler(e) {
  if(e.keyCode === 65){
    gamePiece.acceleration = -1 * THRUST_POWER
  }
}
function keyUpHandler(e) {
  if(e.keyCode === 65){
    gamePiece.acceleration = GRAVITY
  }
}