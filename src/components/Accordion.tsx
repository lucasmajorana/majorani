import { useState } from "react";

export type AccordionItem = { q: string; a: string };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion" role="tablist" aria-label="Preguntas frecuentes">
      {items.map((it, i) => (
        <div className="accordion__item" key={i}>
          <button
            className="accordion__btn"
            role="tab"
            aria-expanded={open === i}
            aria-controls={`acc-panel-${i}`}
            id={`acc-tab-${i}`}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            {it.q}
          </button>
          <div
            id={`acc-panel-${i}`}
            role="tabpanel"
            className="accordion__panel"
            hidden={open !== i}
            aria-labelledby={`acc-tab-${i}`}
          >
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
