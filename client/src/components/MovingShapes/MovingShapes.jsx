import React, { useEffect, useRef } from "react";
import styles from "./MovingShapes.module.scss";

const shapesCount = 7;
const shapes = [];
const colorsPalette = [
  "11, 163, 143" /* Глубокий изумрудно-бирюзовый (темный контраст) */,
  "25, 114, 196" /* Насыщенный синий океан */,
  "0, 240, 160" /* Яркий неоновый мятный (светящийся контраст) */,
  "12, 194, 214" /* Сочный глубокий циан */,
  "200, 255, 240" /* Ультра-светлая ледяная мята */,
];

let isInitialized = false;

class Shape {
  constructor() {
    this.init(true);
  }

    init(isFirstTime = false) {
        if (Math.random() < 0.3) {
            this.radius = Math.random() * 80 + 160;
        } else {
            this.radius = Math.random() * 60 + 50;
        }

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

        const speedFactor = this.radius > 150 ? 0.2 : 0.45;
        this.vx = (Math.random() - 0.5) * speedFactor;
        this.vy = (Math.random() - 0.5) * speedFactor;

        this.alpha =
            this.radius > 150
                ? Math.random() * 0.08 + 0.12
                : Math.random() * 0.15 + 0.22;

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
