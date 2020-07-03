// Configuration variables that change the behavior of the game
const FRAMES_PER_SECOND = 50
const GRAVITY = 0.05
const THRUST_POWER = -0.2
const GAME_AREA_WIDTH = 500
const GAME_AREA_HEIGHT = 500

// create the game screen!
const canvas = document.getElementById('game-screen')
canvas.width = 500
canvas.height = 500
const canvasContext = canvas.getContext('2d')
canvasContext.font = '30px Comic Sans MS'

// create the flappy square and the game score objects,
// and create the gameObstacles array (it's empty, to start!)
let gamePiece = createGameComponent(30, 30, 'red', 10, 120)
gamePiece.acceleration = GRAVITY
let gameObstacles = []
let frameNumber = 0

// functions given to us:
// createGameComponent(width, height, color, xPosition, yPosition) creates a game component
// gameComponent.update() moves and draws a game component

// update the game state
function updateGame() {
  // we want to:
  // 1. check if our game piece crashed into any obstacles
  // 2. clear the canvas so we can draw new things on it during this frame
  // 3. create obstacles (not every frame though!!)
  // 4. move and draw our obstacles
  // 5. move and draw our game piece
  // 5. update the score and draw it
}
