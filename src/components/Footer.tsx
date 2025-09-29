import { NAV_LOGO } from "../data/constants";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src={NAV_LOGO} alt="Majorani" height={24} />
          <p>© {new Date().getFullYear()} Majorani — Hecho en Argentina</p>
        </div>
        <nav className="footer__links" aria-label="Redes">
          <a href="https://www.instagram.com/majorani" target="_blank" rel="noreferrer">Instagram</a>
          <a href="mailto:hola@majorani.com">hola@majorani.com</a>
        </nav>
      </div>
    </footer>
  );
}
