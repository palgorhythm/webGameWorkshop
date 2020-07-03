// Configuration variables that change the behavior of the game
const FRAMES_PER_SECOND = 50
const GRAVITY = 0.05
const THRUST_POWER = -0.2

// create the game canvas and make it a square!
const canvas = document.getElementById('game-screen')
canvas.width = 500
canvas.height = 500

// get the 2d context of the canvas, which allows us to draw shapes on it!
const canvasContext = canvas.getContext('2d')
let frameNumber = 0

// create the flappy square and the game score objects,
// and create the gameObstacles array (it's empty, to start!)
let gamePiece = createGameComponent(30, 30, 'red', 10, 120)
gamePiece.acceleration = GRAVITY
canvasContext.font = '30px Comic Sans MS'
let gameObstacles = []

// make the space bar change the acceleration of the game piece
document.addEventListener('keydown', keyDownHandler)
document.addEventListener('keyup', keyUpHandler)
function keyDownHandler() {
  gamePiece.acceleration = THRUST_POWER
}
function keyUpHandler() {
  gamePiece.acceleration = GRAVITY
}

// make the game state update happen over and over again!
const gameUpdater = setInterval(updateGame, 1000 / FRAMES_PER_SECOND)

// update the game state
function updateGame() {
  if (didGamePieceCrashIntoAnObstacle()) {
    clearInterval(gameUpdater)
  }
  clearCanvas() // try removing this and seeing what happens :]
  if (frameNumber % 150 === 0) {
    createObstacle()
  }
  updateObstacles()
  updateScore()
  gamePiece.update()
  frameNumber += 1
}

// Check all the obstacles to see if our game piece crashed into one of them!
function didGamePieceCrashIntoAnObstacle() {
  for (let i = 0; i < gameObstacles.length; i += 1) {
    if (gamePiece.didCrashWith(gameObstacles[i])) {
      return true
    }
  }
  return false
}

// clear the canvas so we can paint new objects on it.
function clearCanvas() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}

// update obstacles
function updateObstacles() {
  for (let i = 0; i < gameObstacles.length; i += 1) {
    gameObstacles[i].update()
  }
}

// show the score on the top right of the screen
function updateScore() {
  canvasContext.fillStyle = 'black'
  const score = getScore()
  canvasContext.fillText('SCORE: ' + score, 280, 40)
}

// get score
function getScore() {
  return Math.floor(frameNumber / FRAMES_PER_SECOND)
}
