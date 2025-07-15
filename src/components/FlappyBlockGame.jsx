"use client";

import React, { useRef, useEffect, useCallback } from 'react';

const FlappyBlockGame = () => {
  const canvasRef = useRef(null);
  const gameInstanceRef = useRef(null); // To hold the Game object

  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // --- JVector Class ---
    function JVector(x, y) {
      this.x = x;
      this.y = y;
    }

    JVector.prototype.add = function(vector) {
      this.x += vector.x;
      this.y += vector.y;
    }

    JVector.prototype.mult = function(scalar) {
      this.x *= scalar;
      this.y *= scalar;
    }

    JVector.prototype.div = function(scalar) {
      this.x /= scalar;
      this.y /= scalar;
    }

    JVector.prototype.mag = function() {
      return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    JVector.prototype.normalize = function() {
      var m = this.mag();
      if (m > 0) this.div(m);
    }

    // --- Bird Class ---
    function Bird(posVec, velVec, accVec, size, maxSpeed, flapStrength) {
      this.pos = posVec;
      this.vel = velVec;
      this.acc = accVec;
      this.size = size;
      this.maxSpeed = maxSpeed;
      this.flapStrength = flapStrength;
      this.flapping = false;
    }

    Bird.prototype.flap = function() {
      this.vel = new JVector(this.vel.x, -this.flapStrength);
    }

    Bird.prototype.reset = function() {
      this.pos = new JVector(WIDTH / 4, HEIGHT / 2); // Start bird further right
      this.vel = new JVector(0, 0);
    }

    Bird.prototype.update = function() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      if (this.vel.mag() >= this.maxSpeed) {
        this.vel.normalize();
        this.vel.mult(this.maxSpeed);
      }
    }

    Bird.prototype.display = function() {
      ctx.fillStyle = "#fff";
      ctx.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size); // Centered rect

      // Simplified wing display
      if (!this.flapping) {
        ctx.beginPath();
        ctx.moveTo(this.pos.x - this.size / 2, this.pos.y - this.size / 2);
        ctx.lineTo(this.pos.x, this.pos.y - this.size * 1.5); // Higher wing
        ctx.lineTo(this.pos.x + this.size / 2, this.pos.y - this.size / 2);
        ctx.fill();
      } else { // flapping
        ctx.beginPath();
        ctx.moveTo(this.pos.x - this.size / 2, this.pos.y + this.size / 2);
        ctx.lineTo(this.pos.x, this.pos.y + this.size * 1.5); // Lower wing
        ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size / 2);
        ctx.fill();
      }
    }

    Bird.prototype.checkWorld = function() {
      var y = this.pos.y;
      if (y <= this.size / 2) { // Top boundary
        this.pos.y = this.size / 2;
        this.vel.y = 0; // Stop vertical movement
      } else if (y >= HEIGHT - this.size / 2) { // Bottom boundary
        this.pos.y = HEIGHT - this.size / 2;
        this.vel.y = 0; // Stop vertical movement
        gameInstanceRef.current.killPlayer(); // Game over if hits bottom
      }
    }

    Bird.prototype.frame = function() {
      this.update();
      this.checkWorld();
      this.display();
    }

    // --- Obstacle Class ---
    function Obstacle(x) {
      this.x = x;
      this.width = 50; // Fixed width for consistency
      const minGapHeight = 180; // Minimum vertical gap for the bird to pass
      const maxTopHeight = HEIGHT - minGapHeight - 50; // Max height for top pipe, leaving space for bottom pipe and some margin
      this.topHeight = Math.random() * (maxTopHeight - 50) + 50; // Random height for top pipe, min 50px
      this.bottomY = this.topHeight + minGapHeight; // Y-coordinate where bottom pipe starts
      this.passed = false; // To track if player has passed this obstacle for scoring
    }

    Obstacle.prototype.display = function() {
      ctx.fillStyle = "#fff";
      // Top pipe
      ctx.fillRect(this.x, 0, this.width, this.topHeight);
      // Bottom pipe
      ctx.fillRect(this.x, this.bottomY, this.width, HEIGHT - this.bottomY);
    }

    Obstacle.prototype.detectCollision = function(player) {
      var playerLeft = player.pos.x - player.size / 2;
      var playerRight = player.pos.x + player.size / 2;
      var playerTop = player.pos.y - player.size / 2;
      var playerBottom = player.pos.y + player.size / 2;

      // Check if player is horizontally within the obstacle
      if (playerRight > this.x && playerLeft < this.x + this.width) {
        // Check collision with top pipe
        if (playerTop < this.topHeight) {
          return true;
        }
        // Check collision with bottom pipe
        if (playerBottom > this.bottomY) {
          return true;
        }
      }
      return false;
    }

    // --- ObstacleManager Class ---
    function ObstacleManager(numObstacles, spacing) {
      this.numObstacles = numObstacles;
      this.spacing = spacing; // Horizontal spacing between obstacles
      this.obstacles = [];

      this.generateObstacles = function() {
        this.obstacles = [];
        for (let i = 0; i < this.numObstacles; i++) {
          this.obstacles.push(new Obstacle(WIDTH + i * this.spacing));
        }
      }

      this.renderObstacles = function(playerX) {
        for (let i = 0; i < this.obstacles.length; i++) {
          let obs = this.obstacles[i];
          obs.display();
          obs.x -= 2; // Move obstacles left

          // Check for scoring
          if (!obs.passed && obs.x + obs.width < playerX) {
            gameInstanceRef.current.score.increment();
            obs.passed = true;
          }

          // Recycle obstacle if it goes off screen
          if (obs.x + obs.width < 0) {
            obs.x = WIDTH + this.spacing * (this.numObstacles - 1); // Place it after the last obstacle
            const minGapHeight = 180;
            const maxTopHeight = HEIGHT - minGapHeight - 50;
            obs.topHeight = Math.random() * (maxTopHeight - 50) + 50;
            obs.bottomY = obs.topHeight + minGapHeight;
            obs.passed = false; // Reset passed status
          }
        }
      }
    }

    // --- Score Class ---
    function Score() {
      this.score = 0;

      this.increment = function() {
        this.score += 100;
      }

      this.reset = function() {
        this.score = 0;
      }

      this.display = function() {
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial"; // Changed from Oswald
        ctx.textAlign = "left";
        ctx.fillText("Score: " + this.score, 15, 35);
      }
    }

    var bg = "#000";

    // --- Game Class ---
    var Game = function() {
      this.startScreen = true;
      this.playing = false;
      this.gameOver = false;

      this.locVec = new JVector(WIDTH / 4, HEIGHT / 2);
      this.velVec = new JVector(0, 0);
      this.accVec = new JVector(0, 0);

      this.score = new Score();

      this.player = new Bird(this.locVec, this.velVec, this.accVec, 20, 12, 10);

      this.obstacleManager = new ObstacleManager(3, 300); // 3 obstacles, 300px spacing

      this.gravity = new JVector(0, .4); // Increased gravity for more flappy feel

      this.startGame = function() {
        this.startScreen = false;
        this.playing = true;
        this.gameOver = false;
        this.obstacleManager.generateObstacles();
        this.player.reset();
        this.score.reset();
      }

      this.killPlayer = function() {
        this.startScreen = false;
        this.playing = false;
        this.gameOver = true;
      }

      this.draw = function() {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        if (this.startScreen) {
          ctx.strokeStyle = "#fff";
          ctx.fillStyle = "#fff";
          ctx.font = "48px Arial"; // Changed from Oswald
          ctx.textAlign = "center";
          ctx.strokeText("Flappy Block", WIDTH / 2, HEIGHT / 2);
          ctx.font = "18px Arial"; // Changed from Oswald
          ctx.fillText("Hit 'S' to start the game!", WIDTH / 2, HEIGHT / 2 + 40);
        }

        if (this.playing) {
          this.score.display();
          this.player.vel.add(this.gravity);
          this.obstacleManager.renderObstacles(this.player.pos.x);
          var collision = this.obstacleManager.detectCollisions(this.player);
          if (collision) {
            this.killPlayer();
          }
          this.player.frame();
        }

        if (this.gameOver) {
          ctx.strokeStyle = "#fff";
          ctx.fillStyle = "#fff";
          ctx.font = "48px Arial"; // Changed from Oswald
          ctx.textAlign = "center";
          ctx.strokeText("Gameover!", WIDTH / 2, HEIGHT / 2);
          ctx.font= "24px Arial"; // Changed from Oswald
          ctx.fillText("Final Score: " + this.score.score, WIDTH / 2, HEIGHT / 2 + 40);
          ctx.font = "18px Arial"; // Changed from Oswald
          ctx.fillText("Hit 'S' to play again!", WIDTH / 2, HEIGHT / 2 + 80);
        }

        gameInstanceRef.current.animationFrameId = requestAnimationFrame(this.draw.bind(this));
      }
    }

    const game = new Game();
    gameInstanceRef.current = game; // Store the game instance
    game.draw();

    const handleResize = () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      // Re-initialize player position and obstacles on resize
      game.player.reset();
      game.obstacleManager.generateObstacles();
    };
    window.addEventListener("resize", handleResize);

    const keyDown = (e) => {
      var event = e || window.event;
      var key = event.keyCode;

      if (key === 83 && !game.playing) { // 'S' key to start
        game.startGame();
      }

      if (key === 83 && !game.player.flapping && game.playing) { // 'S' key for flap
        game.player.flap();
        game.player.flapping = true;
      }
    }

    const keyUp = (e) => {
      var event = e || window.event;
      var key = event.keyCode;

      if (key === 83 && game.player.flapping) { // 'S' key for flap release
        game.player.flapping = false;
      }
    }

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
      if (gameInstanceRef.current && gameInstanceRef.current.animationFrameId) {
        cancelAnimationFrame(gameInstanceRef.current.animationFrameId);
      }
    };
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black"></canvas>
  );
};

export default FlappyBlockGame;