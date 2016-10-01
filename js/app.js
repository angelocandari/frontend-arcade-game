//Sprite
var Sprite = function(x, y) {
  this.x = x;
  this.y = y;
}

Sprite.prototype.collision = function(sprite) {
  if (sprite.x < this.x + 50 && sprite.x + 50 > this.x &&
    sprite.y < this.y + 50 && sprite.y + 50 > this.y) {
    return true;
  } else {
    return false;
  }
};

Sprite.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  Sprite.call(this, x, y);
  this.speed = Math.floor((Math.random() * 300) + 75);
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += (this.speed * dt);
  if (this.x > 606) {
    this.x = 0;
    this.speed = Math.floor((Math.random() * 175) + 50);
  }
};

Enemy.callAllEnemies = function() {
  var enemies = [];
  for (var i = 0; i < 3; i++) {
    enemies[i] = new Enemy(0, ((i * 80) + 60))
  }
  return enemies
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
  Sprite.call(this, x, y);
  this.sprite = "images/char-boy.png";
}

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.checkCollisions();
};

Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (this.collision(allEnemies[i])) {
      this.x = 303;
      this.y = 404;
      score.score -= 20;
    }
  }
  for (var a = 0; a < allStars.length; a++) {
    if (this.collision(allStars[a])) {
      allStars.splice(a, 1);
      score.score += 40;
    }
  }

};

Player.prototype.handleInput = function(key) {
  var stepV = 83;
  var stepH = 101;

  if (key === "up") {
    if (this.y > 0) {
      this.y -= stepV;
    }
  }
  if (key === "right") {
    if (this.x < 606) {
      this.x += stepH;
    }

  }
  if (key === "down") {
    if (this.y < 404) {
      this.y += stepV;
    }
  }
  if (key === "left") {
    if (this.x > 0) {
      this.x -= stepH;
    }
  }

  if (this.y < 0) {
    this.x = 303;
    this.y = 404;
    allStars = Star.callAllStars();
    score.score += 100;
  }
};

//Score
var Score = function(x, y) {
  Sprite.call(this, x, y);
  this.score = 0;

}

Score.prototype = Object.create(Sprite.prototype);
Score.prototype.constructor = Score;
Score.prototype.render = function() {
  ctx.font = "30px Sans-serif";
  ctx.fillStyle = "yellow";
  ctx.textAlign = "center";
  ctx.fillText("Score: " + score.score, this.x, this.y);
};

//Star
var Star = function() {
  var starPosX = [0, 101, 202, 303, 404, 505, 606]
  var starPosY = [60, 143, 226]
  this.x = starPosX[Math.floor(Math.random() * 7)];
  this.y = starPosY[Math.floor(Math.random() * 3)];
  Sprite.call(this, this.x, this.y);
  this.sprite = "images/Star.png";
};

Star.prototype = Object.create(Sprite.prototype);
Star.prototype.constructor = Star;

Star.callAllStars = function() {
  var stars = [];
  for (var i = 0; i < 3; i++) {
    stars[i] = new Star();
  }
  return stars;
};

Star.prototype.update = function(dt) {

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(303, 404);
var allEnemies = Enemy.callAllEnemies();
var score = new Score(100, 500);
var allStars = Star.callAllStars();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
