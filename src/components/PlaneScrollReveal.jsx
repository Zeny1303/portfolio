import { useEffect, useRef } from "react";
import { PaperPlane } from "./PaperPlane";
import "./PlaneScrollReveal.css";

/* ---- tuning ---- */
const PATH = {
  start: { x: 0.1, y: 0.87 },
  control: { x: 0.55, y: 0.72 },
  end: { x: 0.87, y: 0.12 },
};

const BOUNDARY_ANGLE_START = 62; // steep at take-off
const BOUNDARY_ANGLE_SWEEP = 64; // start - sweep*p  => ~30deg at midpoint
const REVEAL_LAG = 0.35; // how far brown trails the plane (vh)
const CLOSE_FROM = 0.85; // when brown finishes filling the screen
const ART_ANGLE_OFFSET = 45; // SVG already points up-right
const PLANE_EARLY = "#5a3d29"; // plane color over white
const PLANE_LATE = "#faf6f1"; // plane color once brown swallows it

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

const smoothstep = (a, b, v) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function flightPoint(t, w, h) {
  const p0 = { x: PATH.start.x * w, y: PATH.start.y * h };
  const p1 = { x: PATH.control.x * w, y: PATH.control.y * h };
  const p2 = { x: PATH.end.x * w, y: PATH.end.y * h };

  const mt = 1 - t;

  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
    angle:
      (Math.atan2(
        2 * mt * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
        2 * mt * (p1.x - p0.x) + 2 * t * (p2.x - p1.x)
      ) *
        180) /
      Math.PI,
  };
}

export default function PlaneScrollReveal({ children }) {
  const sectionRef = useRef(null);
  const planeRef = useRef(null);
  const brownRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    const render = () => {
      frame = 0;

      const section = sectionRef.current,
        plane = planeRef.current,
        brown = brownRef.current;
      if (!section || !plane || !brown) return;

      const w = window.innerWidth,
        h = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const total = rect.height - h;
      const p = clamp01(total > 0 ? -rect.top / total : 0); // 0 -> 1 scroll progress

      // airplane
      const { x, y, angle } = flightPoint(p, w, h);
      const size = Math.max(56, Math.min(w, h) * 0.11);

      plane.style.width = `${size}px`;
      plane.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${
        angle + ART_ANGLE_OFFSET
      }deg)`;
      plane.style.color = p > 0.93 ? PLANE_LATE : PLANE_EARLY;

      // diagonal brown reveal: a line anchored just behind the plane
      const close = smoothstep(CLOSE_FROM, 1, p);
      const deg = BOUNDARY_ANGLE_START - BOUNDARY_ANGLE_SWEEP * p;
      const slope = Math.tan((deg * Math.PI) / 180);
      const lag = h * REVEAL_LAG * Math.pow(1 - p, 1.5);
      const anchor = y + lag - close * (y + lag + h * 0.35);

      const yLeft = anchor - x * slope;
      const yRight = anchor + (w - x) * slope;

      brown.style.clipPath = `polygon(0px ${yLeft}px, ${w}px ${yRight}px, ${w}px ${
        h + 2
      }px, 0px ${h + 2}px)`;

      if (contentRef.current)
        contentRef.current.style.opacity = smoothstep(0.9, 1, p);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="psr-section"
      aria-label="Scroll-driven flight transition"
    >
      <div className="psr-sticky">
        <div ref={brownRef} className="psr-brown" />
        <div ref={planeRef} className="psr-plane">
          <PaperPlane />
        </div>
        <div ref={contentRef} className="psr-content">
          {children}
        </div>
      </div>
    </section>
  );
}
