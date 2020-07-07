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

// Functions given to us (our toolbox):
// createGameComponent(width, height, color, xPosition, yPosition) creates a game component
// gameComponent.update() moves and draws a game component
// gameComponent.didCrashWith(otherGameComponent) tells us if gameComponent crashed into otherGameComponent
// createObstacle() creates a new obstacle with a random size and gap at the far right of the screen

// OUR TASK: update the game state over and over again
function updateGame() {
  // we want to:
  // 1. check if our game piece crashed into any obstacles
  // 2. clear the canvas so we can draw new things on it during this frame
  // 3. create obstacles (not every frame though!!)
  // 4. move and draw our obstacles
  // 5. move and draw our game piece
  // 5. update the score and draw it
}


















/////////////////////////////////// EXTENSIONS (from easiest to hardest) //////////////////////////////

// DESCRIPTIVE
// 1a. Use HTML to create a title and description for your game! Extra credit: use a ton of emojis.

// FASTER!
// 2a. Make the game go faster the longer you play!

// COLORFUL
// 3a. Make every new obstacle a different random color :D

// MULTIPLAYER
// 4a. Create another game piece, make it controllable with a different key than the A key, and battle against your friends!
// 4b. Extra credit: only stop the game after BOTH game pieces have hit walls. 
// 4c. Extra extra credit: Display two scores, one for each player!

// SOUPED UP FLAPPY BIRD
// 5a. Give your character multiple lives, so that the game doesn't end when you hit your first wall only. Maybe you can 
//    bump into the wall or go right through it, but either way you lose a life and the game ends when you've lost all of them!
// 5b. Extra credit (hard): Create "food" items in random places on the screen, and earn a ton of points when you eat them!