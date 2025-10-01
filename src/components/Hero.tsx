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

  // Si el video falla (404 o códec), ocultamos el <video> y mostramos el póster
  const handleError: React.ReactEventHandler<HTMLVideoElement> = () => {
    const v = ref.current;
    if (!v) return;
    v.style.display = "none";
    const poster = document.querySelector(".hero__poster") as HTMLImageElement | null;
    if (poster) poster.style.display = "block";
  };

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
        onError={handleError}
      >
        <source src="/images/Banner1.mp4" type="video/mp4" />
      </video>

      {/* Póster de respaldo si falla el <video> */}
      <img
        className="hero__poster"
        src="/images/hero-poster.jpg"
        alt=""
        style={{ display: "none", position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
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
