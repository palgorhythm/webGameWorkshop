// adapted from https://www.w3schools.com/graphics/game_intro.asp

var myGamePiece;
var myObstacles = [];
var myScore;

var myGameArea = {
  canvas : document.getElementById('game-screen'),
  start : function() {
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    this.frameNumber = 0;
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)
    setInterval(updateGameArea, 20);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function keyDownHandler(e) {
  accelerate(-0.2)
}
function keyUpHandler(e) {
  accelerate(0.05)
}

function startGame() {
    myGamePiece = new GameComponent(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new GameComponent("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

function GameComponent(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        if (this.type == "text") {
            myGameArea.context.font = this.width + " " + this.height;
            myGameArea.context.fillStyle = color;
            myGameArea.context.fillText(this.text, this.x, this.y);
        } else {
            myGameArea.context.fillStyle = color;
            myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var bottomOfTheCanvas = myGameArea.canvas.height - this.height;
        if (this.y > bottomOfTheCanvas) {
            this.y = bottomOfTheCanvas;
            this.gravitySpeed = 0;
        }
    }
    this.didCrashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if (
          (mybottom < othertop) || 
          (mytop > otherbottom) || 
          (myright < otherleft) || 
          (myleft > otherright)
        ) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.didCrashWith(myObstacles[i])) {
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNumber += 1;
    if (myGameArea.frameNumber == 1 || everyInterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new GameComponent(10, height, "green", x, 0));
        myObstacles.push(new GameComponent(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNumber;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyInterval(n) {
    if ((myGameArea.frameNumber / n) % 1 == 0) {
      return true;
    } else {
      return false;
    }
}

function accelerate(n) {
    myGamePiece.gravity = n;
}