import { useEffect, useMemo } from "react";
import type { SectionId } from "./types";

import { SECTIONS } from "./data/sections";
import { PRODUCTS } from "./data/products";
import { PALETTE } from "./data/constants";

import { useActiveSection } from './hooks/useActiveSection';
import { HeadManager } from "./meta/HeadManager";
import { SkipLink } from "./meta/SkipLink";

import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { ProductsBlock } from "./components/ProductsBlock";
import { Specs } from "./components/Specs";
import { FeatureList } from "./components/FeatureList";
import { DistributorForm } from "./components/DistributorForm";
import { Footer } from "./components/Footer";
import Accordion from "./components/Accordion";

export default function App() {
  const sectionIds = useMemo(() => SECTIONS.map(s => s.id), []);
  const active = useActiveSection(sectionIds);

  const navigateTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", `#${id}`); // update hash
  };

  // Deep link inicial (#hash)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "") as SectionId;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Tests de humo (opt-in en runtime)
  useEffect(() => {
    const results: Array<{ name: string; pass: boolean }> = [];
    const log = (pass: boolean, name: string) => {
      results.push({ name, pass });
      // eslint-disable-next-line no-console
      console[pass ? "log" : "error"](`[OnePage Test] ${pass ? "✓" : "✗"} ${name}`);
    };

    SECTIONS.forEach((s) => log(!!document.getElementById(s.id), `Existe #${s.id}`));
    log(document.querySelectorAll(".nav__links .nav__link").length === SECTIONS.length, "Nav tiene todos los links");
    log(!!document.querySelector(".footer"), "Footer presente");
    log(!!document.querySelector(".hero__cta .btn") && !!document.getElementById("productos"), "CTA productos y destino existen");

    // Form + honeypot
    log(!!document.querySelector('form[data-distributor-form]'), "Formulario de distribuidores presente");
    log(!!document.querySelector('input.hp[name="company"]'), "Honeypot presente");

    // Cards = PRODUCTS
    log(document.querySelectorAll(".product-card").length === PRODUCTS.length, "Cards = PRODUCTS.length");
    log(!!document.querySelector(".badge"), "Badge de estado presente");
    log(!!document.querySelector(".product-card__actions .btn--secondary"), "Botón secundario visible");

    try {
      const grid = document.querySelector(".products-grid");
      if (grid) {
        const cs = getComputedStyle(grid as Element);
        const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).length;
        if (window.matchMedia("(min-width: 1000px)").matches) {
          log(cols === 3, "Productos: 3 columnas en desktop");
          const gapVal = parseFloat((cs as any).gap || (cs as any).columnGap || "0");
          log(Math.round(gapVal) === 15, "Productos: gap 15px en desktop");
          const bleed = document.querySelector(".products-bleed");
          if (bleed) {
            const csb = getComputedStyle(bleed as Element);
            const padL = parseFloat((csb as any).paddingLeft);
            const padR = parseFloat((csb as any).paddingRight);
            log(padL >= 24 && padL <= 120 && padR >= 24 && padR <= 120, "Productos: gutter fluido (24–120px) activo");
          }
        }
      }
      // Dark / no dark
      log(document.querySelector("#productos")?.classList.contains("section--dark") === true, "#productos en dark");
      log(document.querySelector("#distribuidores")?.classList.contains("section--dark") === true, "#distribuidores en dark");
      log(document.querySelector("#trucks")?.classList.contains("section--dark") === false, "#trucks no en dark");

      // Overlay abre/cierra
      const burger = document.querySelector(".nav__burger");
      if (burger) {
        burger.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        setTimeout(() => {
          const opened = document.querySelector(".overlay");
          log(!!opened, "Overlay abre");
          if (opened) {
            (opened as any).dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
            setTimeout(() => {
              log(!document.querySelector(".overlay"), "Overlay cierra");
            }, 0);
          }
        }, 0);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Test error", e);
    }

    // Meta SEO básicos
    log(!!document.querySelector('meta[name="description"]'), "Meta description presente");
    log(!!document.querySelector('meta[property="og:image"]'), "OG image presente");
    log(!!document.querySelector('link[rel="manifest"]'), "Manifest link presente");

    (window as any).__MAJORANI_TESTS = results;
  }, []);

  return (
    <div>
      <HeadManager />
      <SkipLink />
      <Nav active={active} onNavigate={navigateTo} />
      <Hero onCta={navigateTo} />

      {/* Proyecto */}
      <Section
        id="proyecto"
        title="Proyecto Majorani"
        media={<img src="/images/IMG_5400.jpeg" alt="Fábrica" decoding="async" loading="lazy" />}
      >
        <p>
          Para nosotros, el quad skate crece cuando lo hacemos juntos. Por eso, Majorani no es solamente una marca: es un
          proyecto colectivo que se alimenta de la energía y el talento de toda la comunidad. Creemos en compartir
          experiencias, en fortalecer los lazos entre patinadores y en trabajar codo a codo con quienes, al igual que
          nosotros, sienten esta pasión como parte de su vida.
        </p>
        <p>
          Nuestro objetivo es aportar soluciones que sumen valor real al desempeño de cada patinador. Queremos que cada uno,
          sin importar su nivel o estilo, encuentre en nuestros productos un aliado para progresar, disfrutar y desafiar sus
          propios límites. Al mismo tiempo, nos comprometemos a impulsar la cultura del quad skate, apoyando su evolución y
          fomentando un espacio en el que la comunidad pueda crecer sin fronteras.
        </p>
        <br></br>
        <p className="callout">
          <strong>Majorani es movimiento, innovación y unión.</strong> Este es nuestro proyecto: construir, junto a todos
          ustedes, un futuro donde el quad skate tenga cada vez más presencia, más fuerza y más libertad para expresarse.
        </p>
      </Section>

      {/* Productos */}
      <Section id="productos" title="Productos" dark>
        <ProductsBlock onNavigate={navigateTo} />
      </Section>

      {/* Trucks */}
      <Section
        id="trucks"
        title="Trucks"
        media={<img src="/images/image11.jpeg" alt="Trucks" decoding="async" loading="lazy" />}
      >
        <div className="truck-layout no-aside">
          <div className="truck-body">
            <h3>Compatibilidad</h3>
            <p>
              Compatibles con planchas de 10 grados, como por ejemplo, Sunlite, Magic y Brunny. Además son compatibles con planchas de artístico: 
              solo requiere modificar la altura de los bujes inferiores a 25mm o adquirir un set de kingpin Majorani para un funcionamiento óptimo. <br></br>La premisa:{" "}
              <strong>adaptarse sin perder rendimiento</strong>.
            </p>

            <h3>Tecnología y diseño</h3>
            <p>
              <strong>Inyección de aluminio puro en lingotes</strong> que reduce hasta 85% las
              burbujas de aire respecto a la fundición tradicional, ganando resistencia y consistencia. {" "}
              <strong>Geometría Fast-Grind</strong> con groove central: <strong>más estabilidad transversal</strong> y menor rozamiento 
              para un deslizamiento controlado.
            </p>

            <h3>Para todo tipo de patinadores</h3>
            <p>
              Desde los primeros pasos hasta niveles avanzados. Mantienen la línea sin requerir posturas complejas, esfuerzos innecesarios, ni
              cantidades excesivas de cera, ofreciendo <strong>control y confianza</strong> en cada truco.
            </p>

            <h3>Rendimiento comprobado</h3>
            <p>
              Testeados exhaustivamente por patinadores técnicos en skateparks, street y eventos por mas de un año (Primera aparición pública en Milano Quad Fest). No
              usamos aluminio reciclado ni atajos: buscamos <strong>precisión, robustez y durabilidad</strong>.
            </p>

            <h3>Origen</h3>
            <p>
              Fabricado en Argentina. Proyecto que apuesta a la industria nacional con visión internacional y un{" "}
              <strong>nuevo estándar</strong> para el quad skate.
            </p>

            <div className="truck-actions">
              <a
                className="btn btn--small"
                href="#especificaciones"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("especificaciones");
                }}
              >
                Especificaciones
              </a>
              <a className="btn btn--secondary btn--small" href="/docs/majorani-trucks-info.pdf" download>
                Ver PDF
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Especificaciones */}
      <Section
        id="especificaciones"
        title="Especificaciones"
        media={<img src="/images/IMG_9484.jpg" alt="Especificaciones" decoding="async" loading="lazy" />}
      >
        <Specs
          items={[
            { k: "Compatibilidad", v: "Planchas 10° / Sunlite - Magic - Brunny - Royal - TMG - Roll Line - Majorani" },
            { k: "Tecnología", v: " Geometría Fast-Grind con Groove central" },
            { k: "Material", v: "Inyección de aluminio" },
            { k: "Ejes", v: "Acero trefilado 1045" },
            { k: "Fabricación", v: "Producción Nacional - ISO 9001" },
          ]}
        />
      </Section>

      {/* Kingpin (oscuro) */}
      <Section
        id="kingpin"
        title="Kingpin Set"
        dark
        media={<img src="public/images/IMG_1120.jpeg" alt="Kingpin Set" decoding="async" loading="lazy" />}
      >
        <p className="lead">
          Adaptá trucks de quad skate a planchas de artístico de 10° con un set robusto y fácil de instalar.
        </p>

        <FeatureList
          features={[
            "Incluye tornillo kingpin, arandela y tuerca de seguridad",
            "Compatible con planchas ROYAL Y ROLL LINE",
            "Optimizado para set-up con Trucks Majorani",
            "Industria Argentina",
          ]}
        />

        <p>
          <a
            className="btn btn--secondary btn--small"
            href="#distribuidores"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("distribuidores");
            }}
          >
            Dónde comprar
          </a>
        </p>
      </Section>


      {/* Gorros */}
      <Section id="gorros" title="Gorros" media={<img src="/images/julisombrerito-05.png" alt="Gorros Majorani" decoding="async" loading="lazy" />}>
        <p className="lead">
          Ediciones limitadas con identidad Majorani. <br/>
          Fabricación local, materiales de calidad y terminaciones prolijas.
        </p>
        <FeatureList
          features={[
            "Tejido cómodo y respirable",
            "Unisex, talle único",
            "Producción local en tandas limitadas",
            "Colaboración con Secret Spot Tienda"
          ]}
        />
        <p>
          <a
            className="btn btn--secondary btn--small"
            href="#distribuidores"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("distribuidores");
            }}
          >
            Ver distribuidores
          </a>
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="Preguntas frecuentes">
        <div className="accordion" role="region" aria-label="FAQ">
          <Accordion
            items={[
              { q: "¿Venden directo al público?", a: "Trabajamos exclusivamente con quad-skate shops autorizadas." },
              { q: "¿Con qué planchas es compatible?", a: "Compatibles con configuraciones de 10° (consulta tu shop para placas específicas)." },
              { q: "¿Cuándo salen a la venta?", a: "El lanzamiento está previsto para Octubre 2025." },
            ]}
          />
        </div>
      </Section>

      {/* Team */}
      <Section id="team" title="Team Majorani" media={<img src="/images/team.jpg" alt="Team" decoding="async" loading="lazy" />}>
        <p>Riders y testers que impulsan el desarrollo con feedback real en pista y calle.</p>
      </Section>

      {/* Distribuidores */}
      <Section id="distribuidores" title="Distribuidores" dark media={<img src="/images/shops.jpg" alt="Tiendas" decoding="async" loading="lazy" />}>
        <p>
          Vendemos únicamente a través de <strong>quad-skate shops</strong> autorizadas. Si querés ser parte de la red,
          completá el formulario y te contactamos.
        </p>
        <DistributorForm endpoint={import.meta.env?.VITE_FORMSPREE_ENDPOINT || ""} />
      </Section>

      {/* Comunidad */}
      <Section id="comunidad" title="Comunidad" media={<img src="/images/comunidad.jpg" alt="Comunidad" decoding="async" loading="lazy" />}>
        <p>
          Eventos, tutoriales y el <em>Collective Trick Contest</em>. Seguinos para participar.
        </p>
      </Section>

      {/* Contacto */}
      <Section id="contacto" title="Contacto">
        <p>¿Tenés dudas o querés enviarnos feedback? Escribinos.</p>
        <p>
          <a className="btn" href="mailto:hola@majorani.com">
            Enviar email
          </a>
        </p>
      </Section>

      <Footer />

      {/* Estilos (incluye HERO altura 397px) */}
      <style>{`
        :root{
          --font-head: "Clash Grotesk", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", sans-serif;
          --font-base: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", sans-serif;
          --font-mono: "VT323", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          --accent: ${PALETTE.naranja};
          --accent-contrast: #ffffff;
          --ink: #111111;
          --ink-muted: #4b4b4b;
          --bg: #ffffff;
          --bg-alt: #f7f7f7;
          --radius: 14px;
          --gap: 16px;
          --shadow-1: 0 6px 24px rgba(0,0,0,.12);
          --shadow-2: 0 14px 40px rgba(0,0,0,.18);
          --motion-fast: 120ms;
          --motion-normal: 200ms;
          --motion-slow: 360ms;
          --nav-h: 64px;
          --nav-blur: 12px;
          --nav-alpha: 0.72;
          --blanco-hueso: ${PALETTE.blancoHueso};
        }
        @media (min-width:880px){ :root{ --nav-h:72px } }
        *{ box-sizing:border-box }
        html{ scroll-behavior:smooth }
        body{ margin:0; font-family: var(--font-base); color:var(--ink); background:var(--bg) }
        img{ max-width:100%; height:auto; display:block }
        .container{ width:min(1360px,92vw); margin:0 auto }
        .skip{ position:absolute; left:-999px; top:auto; width:1px; height:1px; overflow:hidden }
        .skip:focus{ left:16px; top:8px; width:auto; height:auto; background:#000; color:#fff; padding:8px 10px; border-radius:10px }

        /* NAV */
        .nav{ position:sticky; top:0; z-index:50; background:rgba(255,255,255,var(--nav-alpha)); backdrop-filter:saturate(180%) blur(var(--nav-blur)); border-bottom:1px solid rgba(0,0,0,.06) }
        .nav__inner{ display:flex; align-items:center; justify-content:space-between; gap:var(--gap); padding:10px 16px }
        .nav__links{ display:none; gap:12px }
        .nav__link{ position:relative; padding:10px 12px; text-decoration:none; color:#222; border-radius:10px; transition: color var(--motion-fast) ease }
        .nav__link::after{ content:""; position:absolute; left:10px; right:10px; bottom:6px; height:2px; background: currentColor; transform: scaleX(0); transform-origin:left; transition: transform var(--motion-normal) ease }
        .nav__link:hover{ color:var(--accent) }
        .nav__link:hover::after{ transform: scaleX(1) }
        .nav__link.is-active{ color:var(--accent); font-weight:600 }
        .nav__link.is-active::after{ transform: scaleX(1) }
        .brand{ display:inline-flex; align-items:center; gap:8px }
        .nav__burger{ display:inline-flex; flex-direction:column; gap:4px; background:transparent; border:0; padding:8px }
        .nav__burger span{ width:20px; height:2px; background:#111; display:block }
        @media (min-width:880px){ .nav__links{ display:flex } .nav__burger{ display:none } }

        /* OVERLAY */
        .overlay{ position:fixed; inset:0; background:rgba(0,0,0,.5); display:grid; place-items:center }
        .overlay__panel{ background:#111; width:min(420px, 92vw); border-radius:16px; padding:24px; display:flex; flex-direction:column; gap:4px; box-shadow: var(--shadow-2) }
        .overlay__close{ align-self:flex-end; background:transparent; color:#fff; font-size:28px; line-height:1; border:0 }
        .overlay__link{ color:#fff; text-decoration:none; padding:12px 10px; border-radius:10px; transition: background var(--motion-fast) ease }
        .overlay__link:hover{ background:rgba(255,255,255,.08) }
        .overlay__link.is-active{ background:#fff; color:#111 }

        /* HERO — altura fija de 397px */
        .hero{
          position:relative;
          height:397px;
          overflow:hidden;
          scroll-margin-top:calc(var(--nav-h) + 12px)
        }
        /* En móviles muy chicos, permite ceder un poco la altura */
        @media (max-width:520px){
          .hero{ height:clamp(300px, 62vw, 397px) }
        }
        .hero__video{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          object-fit:cover; /* llena el ancho y recorta sin deformar */
        }
        .hero__overlay{
          position:absolute;
          inset:0;
          background:linear-gradient(180deg, rgba(0,0,0,.30), rgba(0,0,0,.80));
        }
        .hero__brand{
          position:absolute;
          left:0; right:0; bottom:18px;
          display:grid;
          place-items:center;
          gap:10px;
          color:#fff;
          text-align:center;
        }
        .hero__brand img{ width:min(180px, 36vw) } /* logo contenido */
        .hero__cta{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center }

        /* BUTTONS */
        .btn{ display:inline-block; padding:12px 16px; border-radius:12px; text-decoration:none; font-weight:600; transition: transform var(--motion-fast) ease, box-shadow var(--motion-fast) ease, background var(--motion-fast) ease, color var(--motion-fast) ease; will-change: transform }
        .btn:active{ transform: translateY(1px) }
        .btn:focus-visible{ outline: 2px solid var(--accent); outline-offset:2px }
        .btn{ background:var(--accent); color:var(--accent-contrast) }
        .btn--secondary{ background:var(--bg-alt); color:var(--ink); border:1px solid rgba(0,0,0,.08) }
        .btn--ghost{ background:transparent; color:#fff; outline:1.5px solid rgba(255,255,255,.7) }
        .btn--small{ padding:8px 12px; font-size:14px }
        .section--dark .btn--secondary{ background:rgba(255,255,255,.1); color:var(--blanco-hueso); border:1px solid rgba(255,255,255,.2) }

        /* SECTIONS */
        .section{ padding:72px 0; background:#fff; scroll-margin-top:calc(var(--nav-h) + 12px) }
        .section--dark{ background:#0f0f10; color:var(--blanco-hueso) }
        .section__title{ margin:0 0 16px; font-family: var(--font-head); letter-spacing:.2px; font-size:clamp(24px, 2.6vw, 36px) }
        .section__grid{ display:grid; grid-template-columns:1fr; gap:16px }
        .lead{ font-size:clamp(18px, 2.1vw, 20px); line-height:1.75; }
        .callout{ margin-top:12px; background:rgba(255,106,0,.06); border-left:4px solid var(--accent); padding:12px 14px; border-radius:10px; }
        .section__media{ border-radius:16px; overflow:hidden; box-shadow: var(--shadow-1) }
        @media (min-width:920px){ .section__grid.has-media{ grid-template-columns:1.1fr .9fr; align-items:center } }

        /* FEATURES */
        .features{ list-style: none; padding:0; margin:16px 0; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px }
        .features li{ background:var(--bg-alt); border:1px solid rgba(0,0,0,.06); padding:10px 12px; border-radius:10px }
        .section--dark .features li{ background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.1) }

        /* SPECS */
        .specs{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; margin:12px 0 }
        .specs__row{ display:contents }
        .specs dt{ font-weight:600; background:var(--bg-alt); padding:10px 12px; border-radius:10px }
        .specs dd{ margin:0; background:#fff; padding:10px 12px; border-radius:10px; border:1px solid rgba(0,0,0,.06) }

        /* ACCORDION */
        .accordion{ border:1px solid rgba(0,0,0,.08); border-radius:12px; overflow:hidden }
        .accordion__item + .accordion__item{ border-top:1px solid rgba(0,0,0,.08) }
        .accordion__btn{ width:100%; text-align:left; padding:14px 16px; font-weight:600; background:#fff; border:0; cursor:pointer }
        .accordion__panel{ padding:0 16px 16px 16px; background:#fff }

        /* PRODUCTS */
        #productos .section__content{ padding-inline: 0 }
        .products-wrap{ display:flex; flex-direction:column; gap:16px }
        .products-bleed{ width:100vw; margin-left:calc(50% - 50vw); margin-right:calc(50% - 50vw); padding:0 16px; }
        .products-grid{ display:grid; grid-template-columns:1fr; gap:12px }
        @media (min-width:740px){ .products-grid{ grid-template-columns:repeat(2, minmax(0,1fr)) } }
        @media (min-width:1000px){ .products-bleed{ padding:0 clamp(24px, 6vw, 120px) } .products-grid{ grid-template-columns:repeat(3, minmax(0,1fr)); gap:15px } }

        .product-card{ height: var(--product-card-h, 440px); display:grid; grid-template-rows: var(--product-media-h, 56%) 1fr; background: rgba(255,255,255,.04); border:1px solid rgba(0,0,0,.12); border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-1); }
        @media (max-width:740px){ .product-card{ height: 380px } }
        @media (min-width:1400px){ .product-card{ height: 480px } }
        .section--dark .product-card{ background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.12) }

        .product-card__media{ position:relative }
        .product-card__img{ width:100%; height:100%; object-fit:cover }
        .product-card__body{ padding:16px; display:flex; flex-direction:column; gap:10px; color: var(--blanco-hueso) }
        .product-card__title{ font-family: var(--font-head); font-size:22px; margin:0 }
        .product-card__desc{ color: rgba(255,255,255,.85); margin:0; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden }
        .product-card__actions{ margin-top:auto; display:flex; gap:10px; flex-wrap:wrap }

        .badge{ position:absolute; top:12px; left:12px; padding:6px 10px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:.2px }
        .badge--nuevo{ background: var(--accent); color: var(--accent-contrast) }
        .badge--en_stock{ background: rgba(0,150,0,.18); color:#d4ffd4; border:1px solid rgba(0,255,0,.25) }
        .badge--proximamente{ background: rgba(255,106,0,.18); color:#ffd9c5; border:1px solid rgba(255,106,0,.35) }

        /* TRUCKS */
        .truck-layout{ display:grid; grid-template-columns:1fr; gap:14px }
        @media (min-width:980px){ .truck-layout{ grid-template-columns:minmax(240px,.8fr) 1.2fr; gap:18px } }
        .truck-layout.no-aside{ grid-template-columns:1fr }
        .truck-aside h4{ margin:10px 0 6px; font-size:12px; text-transform:uppercase; letter-spacing:.04em; opacity:.75 }
        .truck-aside p{ margin:0 0 10px; color:var(--ink-muted) }
        .truck-body h3{ margin:16px 0 6px; font-family: var(--font-head); font-size: clamp(18px, 2vw, 20px) }
        .truck-body p{ margin:0 0 12px; line-height:1.75 }
        .truck-body strong{ font-weight:700 }
        .truck-actions{ display:flex; gap:10px; flex-wrap:wrap; margin-top:8px }

        /* KINGPIN: features apilados (1 columna) */
        #kingpin .features{
          grid-template-columns: 1fr;   /* en vez de 2 columnas */
        }


        /* FOOTER */
        .footer{ padding:32px 0; background:var(--bg-alt); color:#222; margin-top:48px }
        .footer__grid{ display:flex; align-items:center; justify-content:space-between; gap:16px }
        .footer a{ color:inherit; text-decoration:none }
      `}</style>
    </div>
  );
}
