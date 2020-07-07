function createObstacle(color) {
  const height = getRandomNumberBetween(20, canvas.height / 2)
  const gap = getRandomNumberBetween(50, canvas.height / 2)
  const newTopObstacle = createGameComponent(
    10,
    height,
    color,
    canvas.width,
    0
  )
  const bottomObstacleYposition = height + gap
  const newBottomObstacle = createGameComponent(
    10,
    // fills up the space between its Y position and bottom of canvas
    canvas.height - bottomObstacleYposition,
    color,
    canvas.width,
    bottomObstacleYposition
  )
  newTopObstacle.speedX = -1
  newBottomObstacle.speedX = -1
  gameObstacles.push(newTopObstacle, newBottomObstacle)
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function createGameComponent(width, height, color, x, y) {
  return new GameComponent(width, height, color, x, y)
}

function GameComponent(width, height, color, x, y) {
  this.color = color
  this.width = width
  this.height = height
  this.speedX = 0
  this.speedY = 0
  this.acceleration = 0
  this.x = x
  this.y = y

  this.update = function () {
    this.speedY += this.acceleration
    this.x += this.speedX
    this.y += this.speedY
    this.stayWithinBounds()
    canvasContext.fillStyle = this.color
    canvasContext.fillRect(this.x, this.y, this.width, this.height)
  }

  this.stayWithinBounds = function () {
    let bottomOfTheCanvas = canvas.height - this.height
    if (this.y > bottomOfTheCanvas) {
      this.y = bottomOfTheCanvas
      this.speedY
    }
    if (this.y < 0) {
      this.y = 0
      this.speedY = 0
    }
  }
  this.didCrashWith = function (otherGameComponent) {
    let myLeft = this.x
    let myRight = this.x + this.width
    let myTop = this.y
    let myBottom = this.y + this.height

    let otherLeft = otherGameComponent.x
    let otherRight = otherGameComponent.x + otherGameComponent.width
    let otherTop = otherGameComponent.y
    let otherBottom = otherGameComponent.y + otherGameComponent.height
    if (
      myBottom < otherTop || // we're above it
      myTop > otherBottom || // we're below it
      myRight < otherLeft || // we're to the left of it
      myLeft > otherRight // we're to the right of it
    ) {
      return false
    } else {
      return true
    }
  }
}
