"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type Logo = { src: string; alt: string; w: number; h: number };

// Port of the "Smooth Marquee" widget on jasonturtoga.com: two identical tracks, CSS keyframe
// translateX(-100% - gap), duration = total track width / (speed × 10) — speed 8 on the site.
export default function LogoMarquee({ logos, reverse = false, speed = 8 }: { logos: Logo[]; reverse?: boolean; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = () => {
      const tracks = el.querySelectorAll<HTMLElement>(".mq-track");
      let total = 0;
      tracks.forEach((t) => (total += t.scrollWidth));
      const secs = total / (speed * 10);
      tracks.forEach((t) => (t.style.animationDuration = `${secs}s`));
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [speed]);

  const track = (hidden: boolean) => (
    <div className="mq-track" aria-hidden={hidden || undefined}>
      {logos.map((l) => (
        <figure key={l.src} className="mq-item">
          <Image src={l.src} alt={hidden ? "" : l.alt} width={l.w} height={l.h} sizes="160px" />
        </figure>
      ))}
    </div>
  );

  return (
    <div ref={ref} className={`mq${reverse ? " mq--reverse" : ""}`}>
      <div className="mq-wrapper">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
