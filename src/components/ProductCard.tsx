import type { Product, SectionId } from "../types";

export function ProductCard({ p, onNavigate }: {
  p: Product; onNavigate: (id: SectionId)=>void;
}) {
  const statusLabel = p.status === 'nuevo'
    ? 'Nuevo'
    : p.status === 'proximamente' ? 'Próximamente'
    : p.status === 'en_stock' ? 'En stock' : '';

  return (
    <article className="product-card" data-cat={p.category}>
      <div className="product-card__media">
        <img className="product-card__img" src={p.image} alt={p.alt} decoding="async" loading="lazy" />
        {statusLabel && <span className={`badge badge--${p.status}`}>{statusLabel}</span>}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{p.title}</h3>
        <p className="product-card__desc">{p.desc}</p>
        <div className="product-card__actions">
          <a className="btn btn--small" href={`#${p.sectionId}`}
             onClick={(e)=>{e.preventDefault(); onNavigate(p.sectionId);}}>
            Ver detalles
          </a>
          <a className="btn btn--secondary btn--small" href="#distribuidores"
             onClick={(e)=>{e.preventDefault(); onNavigate('distribuidores');}}>
            Distribuidores
          </a>
        </div>
      </div>
    </article>
  );
}
