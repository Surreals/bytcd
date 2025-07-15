"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

// Helper classes/functions for the game logic
function JVector(x, y) {
    this.x = x;
    this.y = y;
}
JVector.prototype.add = function(vector) { this.x += vector.x; this.y += vector.y; };
JVector.prototype.mult = function(scalar) { this.x *= scalar; this.y *= scalar; };
JVector.prototype.div = function(scalar) { if (scalar !== 0) { this.x /= scalar; this.y /= scalar; } };
JVector.prototype.mag = function() { return Math.sqrt((this.x * this.x) + (this.y * this.y)); };
JVector.prototype.normalize = function() { var m = this.mag(); if (m > 0) this.div(m); };

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
Bird.prototype.flap = function() { this.vel = new JVector(this.vel.x, -this.flapStrength); };
Bird.prototype.reset = function() { this.pos = new JVector(0, this.canvasHeight / 2); this.vel = new JVector(0, 0); };
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
    ctx.fillRect(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size, this.size); // Centered rect
    if (!this.flapping) {
        ctx.beginPath();
        ctx.moveTo(this.pos.x - this.size / 2, this.pos.y - this.size / 2);
        ctx.lineTo(this.pos.x, this.pos.y - this.size - this.size / 2);
        ctx.lineTo(this.pos.x + this.size / 2, this.pos.y - this.size / 2);
        ctx.closePath();
    }
    if (this.flapping) {
        ctx.beginPath();
        ctx.moveTo(this.pos.x - this.size / 2, this.pos.y + this.size / 2);
        ctx.lineTo(this.pos.x, this.pos.y + this.size + this.size / 2);
        ctx.lineTo(this.pos.x + this.size / 2, this.pos.y + this.size / 2);
        ctx.closePath();
    }
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
        this.pos.y = 0 + this.size / 2;
    } else if (y + this.size / 2 > this.canvasHeight) { // Check bottom boundary
        this.pos.y = this.canvasHeight - this.size / 2;
    }
};
Bird.prototype.frame = function(ctx) {
    this.update();
    this.checkWorld();
    this.display(ctx);
};

function Obstacle(x, canvasHeight) {
    this.x = x;
    // Ensure height is within reasonable bounds to create a gap
    const minGapHeight = 150; // Minimum height for the gap
    const maxObstacleHeight = (canvasHeight - minGapHeight) / 2;
    this.height = (Math.random() * 2 - 1) * maxObstacleHeight; // Random height for top/bottom obstacle
    this.width = Math.random() * 50 + 20;
    this.canvasHeight = canvasHeight;
}
Obstacle.prototype.display = function(ctx) {
    ctx.fillStyle = "#fff";
    if (this.height >= 0) { // Top obstacle
        ctx.fillRect(this.x - this.width / 2, 0, this.width, this.height);
    } else { // Bottom obstacle (height is negative, so add to canvasHeight)
        ctx.fillRect(this.x - this.width / 2, this.canvasHeight + this.height, this.width, -this.height); // -this.height for positive height value
    }
};
Obstacle.prototype.detectCollision = function(player) {
    var playerLeft = player.pos.x - player.size / 2;
    var playerRight = player.pos.x + player.size / 2;
    var playerTop = player.pos.y - player.size / 2;
    var playerBottom = player.pos.y + player.size / 2;

    var obstacleLeft = this.x - this.width / 2;
    var obstacleRight = this.x + this.width / 2;

    // Check for horizontal overlap
    if (playerRight > obstacleLeft && playerLeft < obstacleRight) {
        if (this.height >= 0) { // Top obstacle
            if (playerTop < this.height) {
                return true;
            }
        } else { // Bottom obstacle
            if (playerBottom > this.canvasHeight + this.height) {
                return true;
            }
        }
    }
    return false;
};

function ObstacleManager(maxNum, canvasWidth, canvasHeight) {
    this.maxNum = maxNum;
    this.obstacles = [];
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.generateObstacles = function() {
        this.obstacles = [];
        for (var i = 0; i < this.maxNum; i++) {
            var xPos = ((i * this.canvasWidth / this.maxNum) + Math.floor(Math.random() * 50)) + this.canvasWidth / 4;
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

function Score() {
    this.score = 0;
    this.increment = function() { this.score += 100; };
    this.reset = function() { this.score = 0; };
    this.display = function(ctx, canvasWidth) {
        ctx.fillStyle = "#fff";
        ctx.font = "20px Oswald"; // Fallback to a generic sans-serif if Oswald isn't loaded
        ctx.textAlign = "left";
        ctx.fillText("Score: " + this.score, 15, 35);
    };
}

const FlappyBlockGame = () => {
    const canvasRef = useRef(null);
    const gameInstanceRef = useRef(null); // To hold the Game object
    const animationFrameId = useRef(null);

    const [gameState, setGameState] = useState('startScreen'); // 'startScreen', 'playing', 'gameOver'
    const [currentScore, setCurrentScore] = useState(0);

    // Game class adapted for React
    const Game = useCallback((canvas, ctx, initialWidth, initialHeight) => {
        let currentWidth = initialWidth;
        let currentHeight = initialHeight;

        const locVec = new JVector(0, currentHeight / 2);
        const velVec = new JVector(0, 0);
        const accVec = new JVector(0.1, 0.4);

        const score = new Score();
        const player = new Bird(locVec, velVec, accVec, 20, 12, 10, currentWidth, currentHeight);
        const obstacleManager = new ObstacleManager(5, currentWidth, currentHeight);
        const gravity = new JVector(0, .1);

        const startGame = () => {
            setGameState('playing');
            score.reset();
            setCurrentScore(0);
            obstacleManager.generateObstacles();
            player.reset();
        };

        const killPlayer = () => {
            setGameState('gameOver');
        };

        const updateDimensions = (newWidth, newHeight) => {
            currentWidth = newWidth;
            currentHeight = newHeight;
            player.canvasWidth = newWidth;
            player.canvasHeight = newHeight;
            obstacleManager.canvasWidth = newWidth;
            obstacleManager.canvasHeight = newHeight;
            player.reset(); // Reset player position based on new height
            obstacleManager.generateObstacles(); // Regenerate obstacles
        };

        const draw = () => {
            ctx.fillStyle = "#000"; // Background color
            ctx.fillRect(0, 0, currentWidth, currentHeight);

            if (gameState === 'startScreen') {
                ctx.strokeStyle = "#fff";
                ctx.fillStyle = "#fff";
                ctx.font = "48px Oswald, sans-serif";
                ctx.textAlign = "center";
                ctx.strokeText("Flappy Block", currentWidth / 2, currentHeight / 2);
                ctx.font = "18px Oswald, sans-serif";
                ctx.fillText("Hit 'S' to start the game!", currentWidth / 2, currentHeight / 2 + 40);
                score.reset();
                setCurrentScore(0);
            } else if (gameState === 'playing') {
                score.display(ctx, currentWidth);
                player.vel.add(gravity);
                obstacleManager.renderObstacles(ctx);
                const collision = obstacleManager.detectCollisions(player);
                if (collision) {
                    killPlayer();
                }
                player.frame(ctx);
                if (player.pos.x <= 0) { // When player wraps around
                    obstacleManager.generateObstacles();
                    score.increment();
                    setCurrentScore(score.score);
                }
            } else if (gameState === 'gameOver') {
                ctx.strokeStyle = "#fff";
                ctx.fillStyle = "#fff";
                ctx.font = "48px Oswald, sans-serif";
                ctx.textAlign = "center";
                ctx.strokeText("Gameover!", currentWidth / 2, currentHeight / 2);
                ctx.font= "24px Oswald, sans-serif";
                ctx.fillText("Final Score: " + score.score, currentWidth / 2, currentHeight / 2 + 40);
                ctx.font = "18px Oswald, sans-serif";
                ctx.fillText("Hit 'S' to play again!", currentWidth / 2, currentHeight / 2 + 80);
            }

            animationFrameId.current = requestAnimationFrame(draw);
        };

        return {
            startGame,
            player,
            draw,
            updateDimensions,
        };
    }, [gameState]); // Recreate Game instance if gameState changes (important for text rendering)

    // Initialize canvas and game
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const setCanvasDimensions = () => {
            const parent = canvas.parentElement;
            const newWidth = parent ? parent.clientWidth : window.innerWidth;
            const newHeight = parent ? parent.clientHeight : window.innerHeight;
            canvas.width = newWidth;
            canvas.height = newHeight;
            if (gameInstanceRef.current) {
                gameInstanceRef.current.updateDimensions(newWidth, newHeight);
            }
        };

        setCanvasDimensions(); // Initial set
        window.addEventListener('resize', setCanvasDimensions);

        gameInstanceRef.current = Game(canvas, ctx, canvas.width, canvas.height);
        gameInstanceRef.current.draw();

        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [Game]); // Re-run if Game instance changes (due to gameState dependency)

    // Handle keyboard input
    useEffect(() => {
        const keyDownHandler = (e) => {
            const game = gameInstanceRef.current;
            if (!game) return;

            const key = e.keyCode;

            if (key === 83 && gameState !== 'playing') { // 'S' key
                game.startGame();
            }

            if (key === 32 && !game.player.flapping && gameState === 'playing') { // Spacebar
                game.player.flap();
                game.player.flapping = true;
            }
        };

        const keyUpHandler = (e) => {
            const game = gameInstanceRef.current;
            if (!game) return;

            const key = e.keyCode;
            if (key === 32 && game.player.flapping) { // Spacebar
                game.player.flapping = false;
            }
        };

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, [gameState]); // Depend on gameState to ensure correct game state is used in handlers

    return (
        <div className="w-full h-full bg-black flex items-center justify-center">
            <canvas ref={canvasRef} className="block"></canvas>
        </div>
    );
};

export default FlappyBlockGame;