import { useEffect, useState } from "react";
import { NAV_LOGO } from "../data/constants";
import { SECTIONS } from "../data/sections";
import type { SectionId } from "../types";

export function Nav({ active, onNavigate }: {
  active: SectionId;
  onNavigate: (id: SectionId)=>void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className="nav" role="banner">
      <div className="nav__inner">
        <a href="#home" className="brand" aria-label="Ir al inicio"
           onClick={(e)=>{e.preventDefault(); onNavigate("home");}}>
          <img src={NAV_LOGO} alt="Majorani" height={28} />
        </a>
        <button className="nav__burger" aria-label="Abrir menú" aria-expanded={open}
                onClick={()=>setOpen(true)}>
          <span /> <span /> <span />
        </button>
        <nav className="nav__links" aria-label="Secciones">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`}
               className={"nav__link" + (active === s.id ? " is-active" : "")}
               onClick={(e)=>{e.preventDefault(); onNavigate(s.id);}}>
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      {open && (
        <div className="overlay" onClick={()=>setOpen(false)}>
          <div className="overlay__panel" onClick={(e)=>e.stopPropagation()}>
            <button className="overlay__close" aria-label="Cerrar" onClick={()=>setOpen(false)}>×</button>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                 className={"overlay__link" + (active === s.id ? " is-active" : "")}
                 onClick={(e)=>{e.preventDefault(); onNavigate(s.id); setOpen(false);}}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
