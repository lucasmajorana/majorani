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

  // Si el video falla (404 o códec), ocultamos el <video> y mostramos el poster
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
        poster="public\images\julisombrerito-05.png"
        onError={handleError}
      >
    <source src="/images/Banner1.mp4" type="video/mp4" />
  </video>

      <div className="hero__overlay" />
      <div className="hero__brand">
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
