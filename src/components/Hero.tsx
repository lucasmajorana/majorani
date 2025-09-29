import { useEffect, useRef } from "react";
import type { SectionId } from "../types";
import { useReducedMotion } from "framer-motion";

type Props = { onCta: (id: SectionId) => void };

export function Hero({ onCta }: Props) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (ref.current && prefersReduced) {
      try { ref.current.pause(); } catch {}
    }
  }, [prefersReduced]);

  return (
    <section id="home" className="hero hero--banner" aria-label="Hero">
      <video
        ref={ref}
        className="hero__video"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster="/images/hero-poster.jpg"
        src="/images/Banner1.mp4"
      />

      <div className="hero__overlay" />
      <div className="hero__brand">
        <img src="/images/majorani-mark.svg" alt="Majorani" />
        <p>Hardware de calidad para quad skate</p>
        <div className="hero__cta">
          <a
            href="#productos"
            className="btn"
            onClick={(e) => { e.preventDefault(); onCta("productos"); }}
          >
            Ver productos
          </a>
          <a
            href="#distribuidores"
            className="btn btn--ghost"
            onClick={(e) => { e.preventDefault(); onCta("distribuidores"); }}
          >
            Ser distribuidor
          </a>
        </div>
      </div>
    </section>
  );
}
export default Hero;
