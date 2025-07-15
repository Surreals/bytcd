"use client";

import React, { useRef, useEffect, useCallback } from 'react';

const FlappyBlockGame = () => {
  const canvasRef = useRef(null);
  const gameInstanceRef = useRef(null); // To hold the game object

  // Define game classes and functions inside the component or as helpers
  // to avoid global variables and ensure they have access to canvas context.

  // JVector Class
  function JVector(x, y) {
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
  function Bird(posVec, velVec, accVec, size, maxSpeed, flapStrength, canvasWidth, canvasHeight) {
    this.pos = posVec;
    this.vel = velVec;
    this.acc = accVec;
    this.size = size;
    this.maxSpeed = maxSpeed;
    this.flapStrength = flapStrength;
    this.flapping = false;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  Bird.prototype.flap = function() {
    this.vel = new JVector(this.vel.x, -this.flapStrength);
  };

  Bird.prototype.reset = function() {
    this.pos = new JVector(0, this.canvasHeight / 2);
    this.vel = new JVector(0, 0);
  };

  Bird.prototype.update = function() {
    this.vel.add(this.acc);
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
    if (x <= 0) {
      this.pos.x = this.canvasWidth;
    } else if (x > this.canvasWidth) {
      this.pos.x = 0;
    }
    if (y <= 0) {
      this.pos.y = 0 + this.size;
    } else if (y > this.canvasHeight) {
      this.pos.y = this.canvasHeight;
    }
  };

  Bird.prototype.frame = function(ctx) {
    this.update();
    this.checkWorld();
    this.display(ctx);
  };

  // Obstacle Class
  function Obstacle(x, canvasHeight) {
    this.x = x;
    this.height = (Math.random() * 0.6 + 0.2) * canvasHeight; // Height between 20% and 80% of canvas height
    this.width = Math.random() * 50 + 20;
    this.canvasHeight = canvasHeight;
  }

  Obstacle.prototype.display = function(ctx) {
    ctx.fillStyle = "#fff";
    // Draw top obstacle
    ctx.fillRect(this.x - this.width / 2, 0, this.width, this.height);
    // Draw bottom obstacle (fixed gap)
    const gap = 150; // Fixed gap size
    ctx.fillRect(this.x - this.width / 2, this.height + gap, this.width, this.canvasHeight - (this.height + gap));
  };

  Obstacle.prototype.detectCollision = function(player) {
    var playerX = player.pos.x;
    var playerY = player.pos.y;
    var playerSize = player.size;

    // Check collision with top obstacle
    if (playerX + playerSize >= this.x - this.width / 2 &&
        playerX - playerSize <= this.x + this.width / 2 &&
        playerY - playerSize <= this.height) {
      return true;
    }

    // Check collision with bottom obstacle
    const gap = 150;
    if (playerX + playerSize >= this.x - this.width / 2 &&
        playerX - playerSize <= this.x + this.width / 2 &&
        playerY + playerSize >= this.height + gap) {
      return true;
    }
    return false;
  };

  // ObstacleManager Class
  function ObstacleManager(maxNum, canvasWidth, canvasHeight) {
    this.maxNum = maxNum;
    this.obstacles = [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.generateObstacles = function() {
      this.obstacles = [];
      for (var i = 0; i < this.maxNum; i++) {
        // Adjusted xPos generation for better spacing
        var xPos = ((i * (this.canvasWidth / this.maxNum) * 1.5) + Math.floor(Math.random() * 50)) + this.canvasWidth / 4;
        this.obstacles.push(new Obstacle(xPos, this.canvasHeight));
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
  function Score() {
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
  const Game = function(canvas, ctx, WIDTH, HEIGHT) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;

    this.startScreen = true;
    this.playing = false;
    this.gameOver = false;

    this.locVec = new JVector(0, this.HEIGHT / 2);
    this.velVec = new JVector(0, 0);
    this.accVec = new JVector(0.08, 0.4); // Increased horizontal acceleration for faster game

    this.score = new Score();

    this.player = new Bird(this.locVec, this.velVec, this.accVec, 20, 10, 10, this.WIDTH, this.HEIGHT); // Increased maxSpeed

    this.obstacleManager = new ObstacleManager(4, this.WIDTH, this.HEIGHT); // Increased maxNum of obstacles

    this.gravity = new JVector(0, .1);

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
        this.ctx.fillText("Hit 'S' to flap!", this.WIDTH / 2, this.HEIGHT / 2 + 40);
      }

      if (this.playing) {
        this.score.display(this.ctx);
        this.player.vel.add(this.gravity);
        this.obstacleManager.renderObstacles(this.ctx);
        var collision = this.obstacleManager.detectCollisions(this.player);
        if (collision) {
          this.killPlayer();
        }
        this.player.frame(this.ctx);
        // Check if player has passed an obstacle
        if (this.player.pos.x >= this.obstacleManager.obstacles[0].x + this.obstacleManager.obstacles[0].width / 2) {
          this.obstacleManager.obstacles.shift(); // Remove passed obstacle
          // Add new obstacle further to the right
          this.obstacleManager.obstacles.push(new Obstacle(this.WIDTH + Math.random() * 200 + 100, this.HEIGHT));
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
        this.ctx.fillText("Hit 'S' to play again!", this.WIDTH / 2, this.HEIGHT / 2 + 80);
      }
    };
  };

  // Main game loop and event handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (gameInstanceRef.current) {
        gameInstanceRef.current.WIDTH = canvas.width;
        gameInstanceRef.current.HEIGHT = canvas.height;
        gameInstanceRef.current.player.canvasWidth = canvas.width;
        gameInstanceRef.current.player.canvasHeight = canvas.height;
        gameInstanceRef.current.obstacleManager.canvasWidth = canvas.width;
        gameInstanceRef.current.obstacleManager.canvasHeight = canvas.height;
      }
    };

    setCanvasDimensions(); // Initial dimensions

    // Initialize game
    gameInstanceRef.current = new Game(canvas, ctx, canvas.width, canvas.height);
    gameInstanceRef.current.startGame(); // Start game automatically when component mounts

    const animate = () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleKeyDown = (e) => {
      const game = gameInstanceRef.current;
      if (!game) return;

      const key = e.keyCode;
      // console.log("Key Down:", key);

      // 'S' key (83) to flap
      if (key === 83) {
        if (game.gameOver) {
          game.startGame(); // Restart game if game over
        } else if (game.playing && !game.player.flapping) {
          game.player.flap();
          game.player.flapping = true;
        }
      }
    };

    const handleKeyUp = (e) => {
      const game = gameInstanceRef.current;
      if (!game) return;

      const key = e.keyCode;
      // console.log("Key Up:", key);

      // 'S' key (83) to release flap
      if (key === 83 && game.player.flapping) {
        game.player.flapping = false;
      }
    };

    window.addEventListener("resize", setCanvasDimensions);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasDimensions);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="w-full h-full block"></canvas>
    </div>
  );
};

export default FlappyBlockGame;