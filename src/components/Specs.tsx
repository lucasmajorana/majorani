import type { SpecItem } from "../types";

export function Specs({ items }: { items: SpecItem[] }) {
  return (
    <dl className="specs">
      {items.map((s,i)=> (
        <div className="specs__row" key={i}>
          <dt>{s.k}</dt>
          <dd>{s.v}</dd>
        </div>
      ))}
    </dl>
  );
}
