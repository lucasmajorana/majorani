import { useEffect, useState } from "react";
import type { SectionId } from "../types";

export function useActiveSection(sectionIds: SectionId[]) {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(id); }),
        { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);
  return active;
}
