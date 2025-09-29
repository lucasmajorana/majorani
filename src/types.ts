export type SectionId =
  | "home" | "proyecto" | "productos" | "trucks" | "especificaciones"
  | "kingpin" | "gorros" | "faq" | "team" | "distribuidores" | "comunidad" | "contacto";

export interface SectionLink { id: SectionId; label: string }

export interface Product {
  id: "trucks" | "gorros" | "kingpin";
  title: string;
  desc: string;
  image: string;
  alt: string;
  sectionId: Exclude<SectionId, "home" | "proyecto" | "productos">;
  category: "hardware" | "merch" | "accesorios";
  status: "nuevo" | "en_stock" | "proximamente";
}

export interface SpecItem { k: string; v: string }
export interface FaqItem  { q: string; a: string }
