import { PRODUCTS } from "../data/products";
import { ProductCard } from "./ProductCard";
import type { SectionId } from "../types";

export function ProductsBlock({ onNavigate }: { onNavigate: (id: SectionId)=>void }) {
  return (
    <div className="products-wrap">
      <div className="products-bleed">
        <div className="products-grid">
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} p={p} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}
