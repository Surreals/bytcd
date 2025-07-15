"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { JVector, Bird, Obstacle, ObstacleManager, Score, Game } from '../utils/flappyBlockGame'; // Import game classes

const FlappyBlockGame = () => {
  const canvasRef = useRef(null);
  const gameInstanceRef = useRef(null); // To hold the game object

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
      // 'S' key (83) to release flap
      if (key === 83 && game.player.flapping) {
        game.player.flapping = false;
      }
    };

    const handleTouchStart = (e) => {
      e.preventDefault(); // Prevent scrolling/zooming on touch
      const game = gameInstanceRef.current;
      if (!game) return;

      if (game.gameOver) {
        game.startGame(); // Restart game if game over
      } else if (game.playing && !game.player.flapping) {
        game.player.flap();
        game.player.flapping = true;
      }
    };

    const handleTouchEnd = (e) => {
      e.preventDefault(); // Prevent scrolling/zooming on touch
      const game = gameInstanceRef.current;
      if (!game) return;

      if (game.player.flapping) {
        game.player.flapping = false;
      }
    };

    window.addEventListener("resize", setCanvasDimensions);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);


    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", setCanvasDimensions);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <canvas ref={canvasRef} className="w-full h-full block"></canvas>
    </div>
  );
};

export default FlappyBlockGame;