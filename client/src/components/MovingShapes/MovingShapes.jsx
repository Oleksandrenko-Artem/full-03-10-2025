import React, { useEffect, useRef } from "react";
import styles from "./MovingShapes.module.scss";

const shapesCount = 7;
const shapes = [];
const colorsPalette = [
  "83, 237, 206",
  "62, 190, 178",
  "114, 242, 221",
  "52, 143, 173",
  "134, 216, 237",
];

let isInitialized = false;

class Shape {
  constructor() {
    this.init(true);
  }

  init(isFirstTime = false) {
    this.radius = Math.random() * 60 + 40;

    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;

    if (isFirstTime) {
      this.x = Math.random() * currentWidth;
      this.y = Math.random() * currentHeight;
    } else {
      if (Math.random() > 0.5) {
        this.x = this.vx > 0 ? -this.radius : currentWidth + this.radius;
        this.y = Math.random() * currentHeight;
      } else {
        this.x = Math.random() * currentWidth;
        this.y = this.vy > 0 ? -this.radius : currentHeight + this.radius;
      }
    }

    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.13 + 0.12;
    this.baseColor =
      colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (
      this.x < -this.radius ||
      this.x > window.innerWidth + this.radius ||
      this.y < -this.radius ||
      this.y > window.innerHeight + this.radius
    ) {
      this.init(false);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
    ctx.fill();
  }
}

if (!isInitialized) {
  for (let i = 0; i < shapesCount; i++) {
    shapes.push(new Shape());
  }
  isInitialized = true;
}

const MovingShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.update();
        shape.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles["moving-shapes"]}
    />
  );
};

export default MovingShapes;
