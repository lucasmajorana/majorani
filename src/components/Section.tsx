import { motion, useReducedMotion } from "framer-motion";
import type { SectionId } from "../types";

export function Section({
  id, title, children, media, dark
}: {
  id: SectionId; title: string; children: React.ReactNode;
  media?: React.ReactNode; dark?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced
    ? { initial: { opacity: 1, y: 0 }, in: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 18 }, in: { opacity: 1, y: 0 } };

  return (
    <section id={id} className={`section ${dark ? "section--dark" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <motion.header className="section__head" initial="initial" whileInView="in"
          viewport={{ once: true, amount: 0.5 }} variants={variants}>
          <h2 id={`${id}-title`} className="section__title">{title}</h2>
        </motion.header>

        <div className={"section__grid" + (media ? " has-media" : "")}>
          <motion.div initial="initial" whileInView="in" viewport={{ once: true, amount: 0.35 }} variants={variants}>
            <div className="section__content">{children}</div>
          </motion.div>

          {media && (
            <motion.figure className="section__media" initial="initial" whileInView="in"
              viewport={{ once: true, amount: 0.35 }} variants={variants}>
              {media}
            </motion.figure>
          )}
        </div>
      </div>
    </section>
  );
}
