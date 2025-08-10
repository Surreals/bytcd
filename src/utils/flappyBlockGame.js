// JVector Class
export function JVector(x, y) {
  this.x = x;
  this.y = y;
}

JVector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
};

JVector.prototype.mult = function(scalar) {
  this.x *= scalar;
  this.y *= scalar;
};

JVector.prototype.div = function(scalar) {
  this.x /= scalar;
  this.y /= scalar;
};

JVector.prototype.mag = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
};

JVector.prototype.normalize = function() {
  var m = this.mag();
  if (m > 0) { // Avoid division by zero
    this.div(m);
  }
};

// Bird Class
export function Bird(posVec, velVec, accVec, canvasHeight, canvasWidth) {
  this.pos = posVec;
  this.vel = velVec;
  this.acc = accVec;
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;

  // Make bird properties proportional to canvas dimensions
  this.size = this.canvasHeight * 0.05; // 5% of canvas height
  this.maxSpeed = this.canvasHeight * 0.05; // 5% of canvas height
  this.flapStrength = this.canvasHeight * 0.04; // 4% of canvas height

  this.flapping = false; // Initialize flapping state
  this.flapTimeout = null; // To store the timeout ID for animation
}

Bird.prototype.flap = function() {
  this.vel = new JVector(this.vel.x, -this.flapStrength);
  this.flapping = true; // Set flapping to true for animation

  // Clear any existing timeout to prevent multiple animations overlapping
  if (this.flapTimeout) {
    clearTimeout(this.flapTimeout);
  }

  // Set a timeout to reset flapping state after a short duration
  this.flapTimeout = setTimeout(() => {
    this.flapping = false;
    this.flapTimeout = null;
  }, 150); // Adjust duration as needed for the animation
};

Bird.prototype.reset = function() {
  // Player's X position is now fixed
  this.pos = new JVector(this.canvasWidth / 4, this.canvasHeight / 2);
  this.vel = new JVector(0, 0);
  this.flapping = false; // Reset flapping state on game reset
  if (this.flapTimeout) {
    clearTimeout(this.flapTimeout);
    this.flapTimeout = null;
  }
};

Bird.prototype.update = function() {
  // Only apply vertical acceleration (gravity)
  this.vel.y += this.acc.y;
  this.pos.add(this.vel);
  if (this.vel.mag() >= this.maxSpeed) {
    this.vel.normalize();
    this.vel.mult(this.maxSpeed);
  }
};

Bird.prototype.display = function(ctx) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(this.pos.x - this.size, this.pos.y - this.size, this.size, this.size);
  // Wings (simplified for clarity, original had issues with closePath)
  ctx.beginPath();
  if (!this.flapping) {
    ctx.moveTo(this.pos.x - this.size, this.pos.y - this.size);
    ctx.lineTo(this.pos.x - this.size / 2, this.pos.y - this.size * 2); // Adjusted for better wing shape
    ctx.lineTo(this.pos.x, this.pos.y - this.size);
  } else {
    ctx.moveTo(this.pos.x - this.size, this.pos.y);
    ctx.lineTo(this.pos.x - this.size / 2, this.pos.y + this.size);
    ctx.lineTo(this.pos.x, this.pos.y);
  }
  ctx.closePath();
  ctx.strokeStyle = "#fff";
  ctx.stroke();
};

Bird.prototype.checkWorld = function() {
  var x = this.pos.x;
  var y = this.pos.y;
  var size = this.size; // Use dynamic size
  // Player's X position is fixed, so no need to wrap horizontally
  // Check vertical boundaries
  if (y <= 0) {
    this.pos.y = 0 + size;
    this.vel.y = 0; // Stop upward movement if hitting top
  } else if (y + size >= this.canvasHeight) { // Check if bottom of player hits bottom of canvas
    this.pos.y = this.canvasHeight - size; // Clamp player to the bottom
    this.vel.y = 0; // Stop vertical movement
  }
};

Bird.prototype.frame = function(ctx) {
  this.update();
  this.checkWorld();
  this.display(ctx);
};

// Obstacle Class
export function Obstacle(x, canvasWidth, canvasHeight, speed) {
  this.x = x;
  this.canvasWidth = canvasWidth; // Store canvasWidth
  this.canvasHeight = canvasHeight;
  this.speed = speed;

  // Make obstacle properties proportional to canvas dimensions
  this.width = this.canvasWidth * (Math.random() * 0.05 + 0.03); // 3% to 8% of canvas width
  const gap = this.canvasHeight * 0.35; // 35% of canvas height
  const playerSize = this.canvasHeight * 0.05; // Use the same player size ratio as in Bird

  // Ensure there's enough space for the player to pass
  const minTopPipeHeight = playerSize * 2; // Minimum height for top pipe
  let maxTopPipeHeight = this.canvasHeight - gap - (playerSize * 2); // Max height for top pipe, leaving space for bottom pipe and margin

  // Ensure maxTopPipeHeight is not negative or too small
  if (maxTopPipeHeight < minTopPipeHeight) {
    maxTopPipeHeight = minTopPipeHeight; // Fallback to minimum if calculation is problematic
  }
  this.height = minTopPipeHeight + Math.random() * (maxTopPipeHeight - minTopPipeHeight);
}

Obstacle.prototype.display = function(ctx) {
  // Move obstacle to the left
  this.x -= this.speed;

  ctx.fillStyle = "#fff";
  const gap = this.canvasHeight * 0.35; // Use dynamic gap

  // Draw top obstacle
  ctx.fillRect(this.x - this.width / 2, 0, this.width, this.height);
  // Draw bottom obstacle
  ctx.fillRect(this.x - this.width / 2, this.height + gap, this.width, this.canvasHeight - (this.height + gap));
};

Obstacle.prototype.detectCollision = function(player) {
  var playerX = player.pos.x;
  var playerY = player.pos.y;
  var playerSize = player.size; // This will now be dynamic
  const gap = this.canvasHeight * 0.35; // Use dynamic gap

  // Check collision with top obstacle
  if (playerX + playerSize >= this.x - this.width / 2 &&
      playerX - playerSize <= this.x + this.width / 2 &&
      playerY - playerSize <= this.height) {
    return true;
  }

  // Check collision with bottom obstacle
  if (playerX + playerSize >= this.x - this.width / 2 &&
      playerX - playerSize <= this.x + this.width / 2 &&
      playerY + playerSize >= this.height + gap) {
    return true;
  }
  return false;
};

// ObstacleManager Class
export function ObstacleManager(maxNum, canvasWidth, canvasHeight, obstacleSpeed) {
  this.maxNum = maxNum;
  this.obstacles = [];
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.obstacleSpeed = obstacleSpeed;

  this.generateObstacles = function() {
    this.obstacles = [];
    // Initial obstacles are spaced out
    for (var i = 0; i < this.maxNum; i++) {
      // Spacing obstacles further apart initially, with random offset relative to width
      var xPos = this.canvasWidth + (i * (this.canvasWidth / this.maxNum) * 1.5) + Math.floor(Math.random() * (this.canvasWidth * 0.1));
      this.obstacles.push(new Obstacle(xPos, this.canvasWidth, this.canvasHeight, this.obstacleSpeed)); // Pass canvasWidth and canvasHeight
    }
  };

  this.renderObstacles = function(ctx) {
    for (var i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].display(ctx);
    }
  };

  this.detectCollisions = function(player) {
    for (var i = 0; i < this.obstacles.length; i++) {
      var collision = this.obstacles[i].detectCollision(player);
      if (collision) {
        return true;
      }
    }
    return false;
  };
}

// Score Class
export function Score() {
  this.score = 0;

  this.increment = function() {
    this.score += 100;
    // console.log(this.score); // Keep console log for debugging if needed
  };

  this.reset = function() {
    this.score = 0;
  };

  this.display = function(ctx) {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial"; // Changed font to a common web-safe font
    ctx.textAlign = "left";
    ctx.fillText("Score: " + this.score, 15, 35);
  };
}

// Game Class
export const Game = function(canvas, ctx, WIDTH, HEIGHT) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.WIDTH = WIDTH;
  this.HEIGHT = HEIGHT;

  this.startScreen = true;
  this.playing = false;
  this.gameOver = false;

  this.locVec = new JVector(0, this.HEIGHT / 2);
  this.velVec = new JVector(0, 0);
  this.accVec = new JVector(0, 0.4); // Player only has vertical acceleration (gravity)

  this.score = new Score();

  // Pass canvas dimensions to Bird constructor
  this.player = new Bird(this.locVec, this.velVec, this.accVec, this.HEIGHT, this.WIDTH);

  this.obstacleSpeed = 1.5; // Speed at which obstacles move left
  // Pass canvas dimensions to ObstacleManager constructor
  this.obstacleManager = new ObstacleManager(4, this.WIDTH, this.HEIGHT, this.obstacleSpeed);

  // Gravity proportional to canvas height
  this.gravity = new JVector(0, this.HEIGHT * 0.0005);

  this.startGame = function() {
    this.startScreen = false;
    this.playing = true;
    this.gameOver = false;
    this.obstacleManager.generateObstacles();
    this.player.reset();
    this.score.reset();
  };

  this.killPlayer = function() {
    this.startScreen = false;
    this.playing = false;
    this.gameOver = true;
  };

  this.draw = function() {
    this.ctx.fillStyle = "#000"; // Black background
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    if (this.startScreen) {
      this.ctx.strokeStyle = "#fff";
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "48px Arial"; // Changed font
      this.ctx.textAlign = "center";
      this.ctx.strokeText("Flappy Block", this.WIDTH / 2, this.HEIGHT / 2);
      this.ctx.font = "18px Arial"; // Changed font
      this.ctx.fillText("Hit 'S' or tap to flap!", this.WIDTH / 2, this.HEIGHT / 2 + 40);
    }

    if (this.playing) {
      this.score.display(this.ctx);
      this.player.vel.add(this.gravity); // Apply gravity to player
      this.obstacleManager.renderObstacles(this.ctx); // Render and move obstacles

      // Check for collision with obstacles
      var collision = this.obstacleManager.detectCollisions(this.player);
      // The Bird.checkWorld() method now handles clamping to the bottom

      if (collision) {
        this.killPlayer();
      }
      this.player.frame(this.ctx);

      // Check if the first obstacle has moved off-screen to the left
      if (this.obstacleManager.obstacles.length > 0 && this.obstacleManager.obstacles[0].x + this.obstacleManager.obstacles[0].width / 2 < 0) {
        this.obstacleManager.obstacles.shift(); // Remove passed obstacle
        // Add new obstacle further to the right, ensuring good spacing
        this.obstacleManager.obstacles.push(new Obstacle(this.WIDTH + Math.random() * 200 + 150, this.WIDTH, this.HEIGHT, this.obstacleSpeed)); // Pass canvasWidth and canvasHeight
        this.score.increment();
      }
    }

    if (this.gameOver) {
      this.ctx.strokeStyle = "#fff";
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "48px Arial"; // Changed font
      this.ctx.textAlign = "center";
      this.ctx.strokeText("Gameover!", this.WIDTH / 2, this.HEIGHT / 2);
      this.ctx.font= "24px Arial"; // Changed font
      this.ctx.fillText("Final Score: " + this.score.score, this.WIDTH / 2, this.HEIGHT / 2 + 40);
      this.ctx.font = "18px Arial"; // Changed font
      this.ctx.fillText("Hit 'S' or tap to play again!", this.WIDTH / 2, this.HEIGHT / 2 + 80);
    }
  };
};