"use client";

import React, { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react';

// Create a context to allow components to change the cursor type
const CursorContext = createContext(null);

// Custom hook to use the cursor context
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CustomCursorProvider');
  }
  return context;
};

// JVector Class (from provided snippet)
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
  if (m > 0) {
    this.div(m);
  }
};

// Cursor Classes (adapted from provided snippet to accept element in constructor)

class ArrowPointer {
  constructor(cursorElement) {
    this.root = document.body;
    this.cursor = cursorElement;

    this.position = {
      distanceX: 0,
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    };
    this.previousPointerX = 0;
    this.previousPointerY = 0;
    this.angle = 0;
    this.previousAngle = 0;
    this.angleDisplace = 0;
    this.degrees = 57.296;
    this.cursorSize = 20;

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      transition: '250ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    this.init(this.cursor, this.cursorStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.previousPointerX = this.position.pointerX;
    this.previousPointerY = this.position.pointerY;
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y;
    this.position.distanceX = this.previousPointerX - this.position.pointerX;
    this.position.distanceY = this.previousPointerY - this.position.pointerY;
    this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2);

    this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;

    if (this.distance > 1) {
      this.rotate(this.position);
    } else {
      this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`;
    }
  }

  rotate(position) {
    let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees;
    let modAngle;
    const style = this.cursor.style;
    this.previousAngle = this.angle;

    if (position.distanceX <= 0 && position.distanceY >= 0) {
      this.angle = 90 - unsortedAngle + 0;
    } else if (position.distanceX < 0 && position.distanceY < 0) {
      this.angle = unsortedAngle + 90;
    } else if (position.distanceX >= 0 && position.distanceY <= 0) {
      this.angle = 90 - unsortedAngle + 180;
    } else if (position.distanceX > 0 && position.distanceY > 0) {
      this.angle = unsortedAngle + 270;
    }

    if (isNaN(this.angle)) {
      this.angle = this.previousAngle;
    } else {
      if (this.angle - this.previousAngle <= -270) {
        this.angleDisplace += 360 + this.angle - this.previousAngle;
      } else if (this.angle - this.previousAngle >= 270) {
        this.angleDisplace += this.angle - this.previousAngle - 360;
      } else {
        this.angleDisplace += this.angle - this.previousAngle;
      }
    }
    style.left = `${ -this.cursorSize / 2 }px`;
    style.top = `${ 0 }px`;
    style.transform += ` rotate(${this.angleDisplace}deg)`;
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

class BigCircle {
  constructor(cursorElement) {
    this.root = document.body;
    this.cursor = cursorElement;
    this.circle = this.cursor.querySelector(".circle");
    this.dot = this.cursor.querySelector(".dot");

    this.pointerX = 0;
    this.pointerY = 0;
    this.cursorSize = 50;

    this.circleStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      backgroundColor: '#fff0',
      borderRadius: '50%',
      transition: '500ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    this.dotStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      zIndex: '2147483647',
      width: '6px',
      height: '6px',
      backgroundColor: '#0000',
      borderRadius: '50%',
      userSelect: 'none',
      pointerEvents: 'none',
      transition: '250ms, transform 75ms'
    };

    if (CSS.supports("backdrop-filter", "invert(1) grayscale(1)")) {
      this.circleStyle.backdropFilter = 'invert(0.85) grayscale(1)';
      this.dotStyle.backdropFilter = 'invert(1)';
      this.circleStyle.backgroundColor = '#fff0';
    } else {
      this.circleStyle.backgroundColor = '#000';
      this.circleStyle.opacity = '0.5';
    }

    this.init(this.circle, this.circleStyle);
    this.init(this.dot, this.dotStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.pointerX = event.pageX;
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

    this.circle.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
    this.dot.style.transform = `translate3d(calc(-50% + ${this.pointerX}px), calc(-50% + ${this.pointerY}px), 0)`;

    if (event.target.localName === 'svg' ||
        event.target.localName === 'a' ||
        event.target.onclick !== null ||
        Array.from(event.target.classList).includes('curzr-hover')) {
      this.hover();
    } else {
      this.hoverout();
    }
  }

  hover() {
    this.circle.style.transform += ` scale(2.5)`;
  }

  hoverout() {
    this.circle.style.transform = this.circle.style.transform.replace(` scale(2.5)`, '');
  }

  click() {
    this.circle.style.transform += ` scale(0.75)`;
    setTimeout(() => {
      this.circle.style.transform = this.circle.style.transform.replace(` scale(0.75)`, '');
    }, 35);
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

class RingDot {
  constructor(cursorElement) {
    this.root = document.body;
    this.cursor = cursorElement;
    this.dot = this.cursor.querySelector(".curzr-dot");

    this.pointerX = 0;
    this.pointerY = 0;
    this.cursorSize = 20;

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      display: 'flex',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      justifyContent: 'center',
      alignItems: 'center',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      backgroundColor: '#fff0',
      boxShadow: '0 0 0 1.25px #292927, 0 0 0 2.25px #edf370',
      borderRadius: '50%',
      transition: '200ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    this.dotStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      zIndex: '2147483647',
      width: '4px',
      height: '4px',
      backgroundColor: '#292927',
      boxShadow: '0 0 0 1px #edf370',
      borderRadius: '50%',
      userSelect: 'none',
      pointerEvents: 'none',
    };

    this.init(this.cursor, this.cursorStyle);
    this.init(this.dot, this.dotStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    if (event.target.localName === 'svg' ||
        event.target.localName === 'a' ||
        event.target.onclick !== null ||
        Array.from(event.target.classList).includes('curzr-hover')) {
      this.hover(40);
    } else {
      this.hoverout();
    }

    this.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y;

    this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
  }

  hover(radius) {
    this.cursor.style.width = this.cursor.style.height = `${radius}px`;
    this.cursor.style.top = this.cursor.style.left = `${radius / -2}px`;
  }

  hoverout() {
    this.cursor.style.width = this.cursor.style.height = `${this.cursorSize}px`;
    this.cursor.style.top = this.cursor.style.left = `${this.cursorSize / -2}px`;
  }

  click() {
    this.cursor.style.transform += ` scale(0.75)`;
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '');
    }, 35);
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

class CircleAndDot {
  constructor(cursorElement) {
    this.root = document.body;
    this.cursor = cursorElement;

    this.position = {
      distanceX: 0,
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    };
    this.previousPointerX = 0;
    this.previousPointerY = 0;
    this.angle = 0;
    this.previousAngle = 0;
    this.angleDisplace = 0;
    this.degrees = 57.296;
    this.cursorSize = 20;
    this.fading = false;

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      backgroundColor: '#fff0',
      border: '1.25px solid #292927',
      borderRadius: '50%',
      boxShadow: '0 -15px 0 -8px #292927',
      transition: '250ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    this.init(this.cursor, this.cursorStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.previousPointerX = this.position.pointerX;
    this.previousPointerY = this.position.pointerY;
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y;
    this.position.distanceX = this.previousPointerX - this.position.pointerX;
    this.position.distanceY = this.previousPointerY - this.position.pointerY;
    this.distance = Math.sqrt(this.position.distanceY ** 2 + this.position.distanceX ** 2);

    if (event.target.localName === 'svg' ||
        event.target.localName === 'a' ||
        event.target.onclick !== null ||
        Array.from(event.target.classList).includes('curzr-hover')) {
      this.hover();
    } else {
      this.hoverout();
    }

    this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;

    this.rotate(this.position);
    this.fade(this.distance);
  }

  rotate(position) {
    let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees;
    this.previousAngle = this.angle;

    if (position.distanceX <= 0 && position.distanceY >= 0) {
      this.angle = 90 - unsortedAngle + 0;
    } else if (position.distanceX < 0 && position.distanceY < 0) {
      this.angle = unsortedAngle + 90;
    } else if (position.distanceX >= 0 && position.distanceY <= 0) {
      this.angle = 90 - unsortedAngle + 180;
    } else if (position.distanceX > 0 && position.distanceY > 0) {
      this.angle = unsortedAngle + 270;
    }

    if (isNaN(this.angle)) {
      this.angle = this.previousAngle;
    } else {
      if (this.angle - this.previousAngle <= -270) {
        this.angleDisplace += 360 + this.angle - this.previousAngle;
      } else if (this.angle - this.previousAngle >= 270) {
        this.angleDisplace += this.angle - this.previousAngle - 360;
      } else {
        this.angleDisplace += this.angle - this.previousAngle;
      }
    }
    this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`;
  }

  hover() {
    this.cursor.style.border = '10px solid #292927';
  }

  hoverout() {
    this.cursor.style.border = '1.25px solid #292927';
  }

  fade(distance) {
    this.cursor.style.boxShadow = `0 ${-15 - distance}px 0 -8px #292927`;
    if (!this.fading) {
      this.fading = true;
      setTimeout(() => {
        this.cursor.style.boxShadow = '0 -15px 0 -8px #29292700';
        this.fading = false;
      }, 50);
    }
  }

  click() {
    this.cursor.style.transform += ` scale(0.75)`;
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '');
    }, 35);
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

class GlitchEffect {
  constructor(cursorElement) {
    this.root = document.body;
    this.cursor = cursorElement;

    this.distanceX = 0;
    this.distanceY = 0;
    this.pointerX = 0;
    this.pointerY = 0;
    this.previousPointerX = 0;
    this.previousPointerY = 0;
    this.cursorSize = 15;
    this.glitchColorB = '#00feff';
    this.glitchColorR = '#ff4f71';
    this.moving = false; // Added moving state

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      backgroundColor: '#222',
      borderRadius: '50%',
      boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
      transition: '100ms, transform 100ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    if (CSS.supports("backdrop-filter", "invert(1)")) {
      this.cursorStyle.backdropFilter = 'invert(1)';
      this.cursorStyle.backgroundColor = '#fff0';
    } else {
      this.cursorStyle.backgroundColor = '#222';
    }

    this.init(this.cursor, this.cursorStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.previousPointerX = this.pointerX;
    this.previousPointerY = this.pointerY;
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y;
    this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10);
    this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10);

    if (event.target.localName === 'svg' ||
        event.target.localName === 'a' ||
        event.target.onclick !== null ||
        Array.from(event.target.classList).includes('curzr-hover')) {
      this.hover();
    } else {
      this.hoverout();
    }

    this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`;
    this.cursor.style.boxShadow = `
      ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB},
      ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`;
    this.stop();
  }

  hover() {
    this.cursor.style.width = this.cursor.style.height = `${30}px`; // Apply hover size
    this.cursor.style.top = this.cursor.style.left = `${30 / -2}px`;
  }

  hoverout() {
    this.cursor.style.width = this.cursor.style.height = `${this.cursorSize}px`; // Reset to original size
    this.cursor.style.top = this.cursor.style.left = `${this.cursorSize / -2}px`;
  }

  click() {
    this.cursor.style.transform += ` scale(0.75)`;
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, '');
    }, 35);
  }

  stop() {
    if (!this.moving) {
      this.moving = true;
      setTimeout(() => {
        this.cursor.style.boxShadow = '';
        this.moving = false;
      }, 50);
    }
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

class MotionBlur {
  constructor(cursorElement) {
    this.root = document.body;
    this.cursor = cursorElement;
    this.filter = this.cursor.querySelector(".curzr-motion-blur");

    this.position = {
      distanceX: 0,
      distanceY: 0,
      pointerX: 0,
      pointerY: 0,
    };
    this.previousPointerX = 0;
    this.previousPointerY = 0;
    this.angle = 0;
    this.previousAngle = 0;
    this.angleDisplace = 0;
    this.degrees = 57.296;
    this.cursorSize = 15;
    this.moving = false;

    this.cursorStyle = {
      boxSizing: 'border-box',
      position: 'fixed',
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: '2147483647',
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      borderRadius: '50%',
      overflow: 'visible',
      transition: '200ms, transform 20ms',
      userSelect: 'none',
      pointerEvents: 'none'
    };

    this.init(this.cursor, this.cursorStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    setTimeout(() => {
      this.cursor.removeAttribute("hidden");
    }, 500);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.previousPointerX = this.position.pointerX;
    this.previousPointerY = this.position.pointerY;
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y;
    this.position.distanceX = Math.min(Math.max(this.previousPointerX - this.position.pointerX, -20), 20);
    this.position.distanceY = Math.min(Math.max(this.previousPointerY - this.position.pointerY, -20), 20);

    this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;
    this.rotate(this.position);
    this.moving ? this.stop() : this.moving = true;
  }

  rotate(position) {
    let unsortedAngle = Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) * this.degrees;

    if (isNaN(unsortedAngle)) {
      this.angle = this.previousAngle;
    } else {
      if (unsortedAngle <= 45) {
        if (position.distanceX * position.distanceY >= 0) {
          this.angle = +unsortedAngle;
        } else {
          this.angle = -unsortedAngle;
        }
        this.filter.setAttribute('stdDeviation', `${Math.abs(this.position.distanceX / 2)}, 0`);
      } else {
        if (position.distanceX * position.distanceY <= 0) {
          this.angle = 180 - unsortedAngle;
        } else {
          this.angle = unsortedAngle;
        }
        this.filter.setAttribute('stdDeviation', `${Math.abs(this.position.distanceY / 2)}, 0`);
      }
    }
    this.cursor.style.transform += ` rotate(${this.angle}deg)`;
    this.previousAngle = this.angle;
  }

  stop() {
    setTimeout(() => {
      this.filter.setAttribute('stdDeviation', '0, 0');
      this.moving = false;
    }, 50);
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

const cursorClasses = {
  'arrow-pointer': ArrowPointer,
  'big-circle': BigCircle,
  'ring-dot': RingDot,
  'circle-and-dot': CircleAndDot,
  'glitch-effect': GlitchEffect,
  'motion-blur': MotionBlur,
};

const CustomCursorProvider = ({ children }) => {
  const activeCursorInstance = useRef(null);
  const [currentCursorType, setCurrentCursorType] = useState('arrow-pointer'); // Default cursor type

  const initializeCursor = useCallback((type) => {
    if (activeCursorInstance.current) {
      activeCursorInstance.current.hidden(); // Hide the currently active cursor
      activeCursorInstance.current = null;
    }

    const CursorClass = cursorClasses[type];
    if (CursorClass) {
      const cursorElement = document.querySelector(`.curzr-${type.replace('-', '')}`); // Adjust selector for some types
      if (cursorElement) {
        activeCursorInstance.current = new CursorClass(cursorElement);
      } else {
        console.warn(`Cursor element for type "${type}" not found.`);
      }
    }
  }, []);

  useEffect(() => {
    initializeCursor(currentCursorType);

    const handleMouseMove = (event) => {
      if (activeCursorInstance.current && typeof activeCursorInstance.current.move === 'function') {
        activeCursorInstance.current.move(event);
      }
    };

    const handleTouchMove = (event) => {
      if (activeCursorInstance.current && typeof activeCursorInstance.current.move === 'function' && event.touches.length > 0) {
        activeCursorInstance.current.move(event.touches[0]);
      }
    };

    const handleClick = () => {
      if (activeCursorInstance.current && typeof activeCursorInstance.current.click === 'function') {
        activeCursorInstance.current.click();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('click', handleClick);
      if (activeCursorInstance.current) {
        activeCursorInstance.current.hidden();
      }
    };
  }, [currentCursorType, initializeCursor]);

  const cursorContextValue = React.useMemo(() => ({
    setCursorType: setCurrentCursorType,
    currentCursorType,
  }), [currentCursorType]);

  return (
    <CursorContext.Provider value={cursorContextValue}>
      {children}
      {/* Render all cursor HTML elements here, initially hidden */}
      <div className="curzr-arrow-pointer" hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path className="inner" d="M25,30a5.82,5.82,0,0,1-1.09-.17l-.2-.07-7.36-3.48a.72.72,0,0,0-.35-.08.78.78,0,0,0-.33.07L8.24,29.54a.66.66,0,0,1-.2.06,5.17,5.17,0,0,1-1,.15,3.6,3.6,0,0,1-3.29-5L12.68,4.2a3.59,3.59,0,0,1,6.58,0l9,20.74A3.6,3.6,0,0,1,25,30Z" fill="#F2F5F8" />
          <path className="outer" d="M16,3A2.59,2.59,0,0,1,18.34,4.6l9,20.74A2.59,2.59,0,0,1,25,29a5.42,5.42,0,0,1-.86-.15l-7.37-3.48a1.84,1.84,0,0,0-.77-.17,1.69,1.69,0,0,0-.73.16l-7.4,3.31a5.89,5.89,0,0,1-.79.12,2.59,2.59,0,0,1-2.37-3.62L13.6,4.6A2.58,2.58,0,0,1,16,3m0-2h0A4.58,4.58,0,0,0,11.76,3.8L2.84,24.33A4.58,4.58,0,0,0,7,30.75a6.08,6.08,0,0,0,1.21-.17,1.87,1.87,0,0,0,.4-.13L16,27.18l7.29,3.44a1.64,1.64,0,0,0,.39.14A6.37,6.37,0,0,0,25,31a4.59,4.59,0,0,0,4.21-6.41l-9-20.75A4.62,4.62,0,0,0,16,1Z" fill="#111920" />
        </svg>
      </div>

      <div className="curzr-big-circle" hidden>
        <div className="circle"></div>
        <div className="dot"></div>
      </div>

      <div className="curzr-ring-dot" hidden>
        <div className="curzr-dot"></div>
      </div>

      <div className="curzr-circle-and-dot" hidden></div>

      <div className="curzr-glitch-effect" hidden></div>

      <svg className="curzr-motion" hidden>
        <filter id="motionblur" x="-100%" y="-100%" width="400%" height="400%">
          <feGaussianBlur className="curzr-motion-blur" stdDeviation="0, 0" />
        </filter>
        <circle cx="50%" cy="50%" r="5" fill="#292927" filter="url(#motionblur)" />
      </svg>
    </CursorContext.Provider>
  );
};

export default CustomCursorProvider;