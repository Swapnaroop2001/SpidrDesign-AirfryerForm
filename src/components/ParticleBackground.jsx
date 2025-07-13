import { useEffect, useRef } from "react";

const CONFIG = {
  PARTICLE_COUNT: 400,
  MAX_CONNECTIONS: 7,
  CONNECTION_DISTANCE: 400,
  MOUSE_RADIUS: 200,
  PARTICLE_SIZE_MIN: 4,
  PARTICLE_SIZE_MAX: 8,
  COLOR: "240, 240, 240",
  PARTICLE_COLOR: "245, 245, 245",
  BACKGROUND: "#333",
  PARTICLE_BASE_OPACITY: 0.3,
  LINE_BASE_OPACITY: 0.2,
  CANVAS_OPACITY: 1,
};

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };
    const corners = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
      updateCornerPositions();
    };

    const updateCornerPositions = () => {
      if (corners.length === 4) {
        corners[1].x = width;
        corners[2].x = width;
        corners[2].y = height;
        corners[3].y = height;
      }
    };

    class Particle {
      constructor(isCorner = false, x = null, y = null) {
        this.isCorner = isCorner;
        this.x = x !== null ? x : Math.random() * width;
        this.y = y !== null ? y : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.opacity = 1;
        this.size =
          Math.random() *
          (CONFIG.PARTICLE_SIZE_MAX - CONFIG.PARTICLE_SIZE_MIN) +
          CONFIG.PARTICLE_SIZE_MIN;
      }

      update() {
        if (this.isCorner) return;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      isWithinRadius() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        return Math.sqrt(dx * dx + dy * dy) < CONFIG.MOUSE_RADIUS;
      }

      draw() {
        if (!this.isWithinRadius() && !this.isCorner) return;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const fade = 1 - dist / CONFIG.MOUSE_RADIUS;
        const effectiveOpacity = Math.max(
          0,
          this.opacity * CONFIG.PARTICLE_BASE_OPACITY * fade
        );

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${CONFIG.PARTICLE_COLOR}, ${effectiveOpacity})`;
        ctx.fill();
      }
    }

    const findClosestNeighbors = (p, all) => {
      return all
        .filter((other) => other !== p)
        .map((other) => {
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { particle: other, dist };
        })
        .filter((d) => d.dist < CONFIG.CONNECTION_DISTANCE)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, CONFIG.MAX_CONNECTIONS)
        .map((d) => d.particle);
    };

    const initParticles = () => {
      resize();
      particles = [];
      corners.length = 0;
      corners.push(
        new Particle(true, 0, 0),
        new Particle(true, width, 0),
        new Particle(true, width, height),
        new Particle(true, 0, height)
      );
      particles.push(...corners);
      for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const updateParticles = () => {
      particles.forEach((p) => p.update());
      while (particles.length < CONFIG.PARTICLE_COUNT + corners.length) {
        particles.push(new Particle());
      }
    };

    const renderConnections = () => {
      const visibleParticles = particles.filter(
        (p) => p.isWithinRadius() || p.isCorner
      );

      for (const p of visibleParticles) {
        const neighbors = findClosestNeighbors(p, visibleParticles);
        neighbors.forEach((n) => {
          const dist = Math.hypot(n.x - p.x, n.y - p.y);
          const alpha =
            (1 - dist / CONFIG.CONNECTION_DISTANCE) * CONFIG.LINE_BASE_OPACITY;

          const fade1 =
            1 -
            Math.min(
              1,
              Math.hypot(p.x - mouse.x, p.y - mouse.y) / CONFIG.MOUSE_RADIUS
            );
          const fade2 =
            1 -
            Math.min(
              1,
              Math.hypot(n.x - mouse.x, n.y - mouse.y) / CONFIG.MOUSE_RADIUS
            );
          const fade = Math.min(fade1, fade2);

          ctx.strokeStyle = `rgba(${CONFIG.COLOR}, ${alpha * fade})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      renderConnections();
      particles.forEach((p) => p.draw());
      updateParticles();
      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      resize();
    };

    initParticles();
    draw();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "block",
          zIndex: -1,
          backgroundColor: CONFIG.BACKGROUND,
          opacity: CONFIG.CANVAS_OPACITY,
        }}
      />

      {/* Centered Header */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <h1 className="text-white text-4xl md:text-5xl  text-center font-raleway">
        Welcome to my submission
      </h1>
    </div>

      {/* Scroll down button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center z-10">
        <a
          href="#profile-card"
          className="group text-gray-300 text-sm font-light transition-colors duration-300 hover:text-[#479daf]"
        >
          <i className="fa fa-angle-down bounce text-sm transition-colors duration-300 group-hover:text-[#479daf]" />
          <br />
          scroll
        </a>
      </div>

      {/* Bounce animation */}
      <style jsx>{`
        .bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(8px);
          }
          60% {
            transform: translateY(4px);
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;
