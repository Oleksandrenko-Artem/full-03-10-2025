import React, { useEffect, useRef } from "react";
import styles from "./MovingShapes.module.scss";

const MovingShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const shapesCount = 7;
    const shapes = [];
    const colorsPalette = [
      "83, 237, 206",
      "62, 190, 178",
      "114, 242, 221",
      "52, 143, 173",
      "134, 216, 237",
    ];

    const resizeCanvas = () => {
      if (!canvas || !canvas.parentElement) return;

      const parentWidth = canvas.parentElement.offsetWidth;
      const parentHeight = canvas.parentElement.offsetHeight;

      if (canvas.width !== parentWidth || canvas.height !== parentHeight) {
        canvas.width = parentWidth;
        canvas.height = parentHeight;
      }
    };

    class Shape {
      constructor() {
        this.init(true);
      }

      init(isFirstTime = false) {
        this.radius = Math.random() * 60 + 40;

        const currentWidth = window.innerWidth;
        const currentHeight = isFirstTime
          ? window.innerHeight
          : canvas.parentElement?.offsetHeight || window.innerHeight;

        if (isFirstTime) {
          this.x = Math.random() * currentWidth;
          this.y = Math.random() * currentHeight;
        } else {
          if (Math.random() > 0.5) {
            this.x = this.vx > 0 ? -this.radius : canvas.width + this.radius;
            this.y = Math.random() * canvas.height;
          } else {
            this.x = Math.random() * canvas.width;
            this.y = this.vy > 0 ? -this.radius : canvas.height + this.radius;
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

        const currentMaxHeight =
          canvas.height > 0 ? canvas.height : window.innerHeight;

        if (
          this.x < -this.radius ||
          this.x > canvas.width + this.radius ||
          this.y < -this.radius ||
          this.y > currentMaxHeight + this.radius
        ) {
          this.init(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
        ctx.fill();
      }
    }

    resizeCanvas();

    for (let i = 0; i < shapesCount; i++) {
      shapes.push(new Shape());
    }
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        shape.update();
        shape.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles['moving-shapes']}
    />
  );
};

export default MovingShapes;
