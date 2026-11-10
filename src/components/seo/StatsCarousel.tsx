"use client";

import { useEffect, useState } from "react";

// Mobile/tablet stat carousel — same behaviour as the site's .loop-carousel (4s autoplay, clickable dots).
export default function StatsCarousel({ slides }: { slides: [string, string][] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setCurrent((c) => (c + 1) % slides.length), 4000);
    return () => window.clearInterval(t);
  }, [slides.length]);

  return (
    <div className="loop-carousel">
      <div className="slides">
        {slides.map(([title, sub], i) => (
          <div key={title} className={`slide${i === current ? " active" : ""}`} aria-hidden={i !== current}>
            <h2>{title}</h2>
            <p>{sub}</p>
          </div>
        ))}
      </div>
      <div className="dots">
        {slides.map(([title], i) => (
          <button
            key={title}
            type="button"
            aria-label={`Show stat ${i + 1}`}
            className={`dot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
