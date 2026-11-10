"use client";

import { useEffect, useRef } from "react";

// Same hero animation as jasonturtoga.com/services/seo/ (ElementsKit Lottie widget:
// svg renderer, autoplay, loop, speed 1). lottie_light keeps the bundle small.
export default function HeroLottie() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let anim: { destroy: () => void } | undefined;
    let cancelled = false;
    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (cancelled || !ref.current) return;
      anim = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        path: "/lottie/seo-services-hero.json",
      });
    });
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, []);

  return <div ref={ref} className="hero-lottie" aria-hidden />;
}
