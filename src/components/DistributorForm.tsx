import { useRef, useState } from "react";

export function DistributorForm({ endpoint = "" }: { endpoint?: string }) {
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('submitting');

    const fd = new FormData(formRef.current || undefined);

    // Honeypot
    if (fd.get('company')) { setStatus('success'); return; }

    const required = ['store','country','email'];
    for (const k of required) {
      if (!String(fd.get(k) || '').trim()) {
        setStatus('error');
        setError('Completá los campos requeridos.');
        return;
      }
    }

    const payload = Object.fromEntries(fd.entries());

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('No se pudo enviar');
        setStatus('success');
        formRef.current?.reset();
      } else {
        window.location.href =
          `mailto:hola@majorani.com?subject=Distribuidor%20Majorani&body=${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
        setStatus('success');
      }
    } catch {
      setStatus('error');
      setError('Hubo un problema al enviar. Probá de nuevo o escribinos a hola@majorani.com');
    }
  };

  return (
    <div className="formcard">
      {status === 'success' ? (
        <div className="formcard__success" role="status">
          <h3>¡Gracias!</h3>
          <p>Te vamos a responder a la brevedad. Mientras tanto, podés escribirnos a <a href="mailto:hola@majorani.com">hola@majorani.com</a>.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} data-distributor-form>
          <div className="form__grid">
            <div className="form__field">
              <label htmlFor="store">Tienda <span aria-hidden="true">*</span></label>
              <input id="store" name="store" type="text" placeholder="Nombre de tu tienda" required />
            </div>
            <div className="form__field">
              <label htmlFor="country">País <span aria-hidden="true">*</span></label>
              <input id="country" name="country" type="text" placeholder="Argentina, Chile…" required />
            </div>
            <div className="form__field">
              <label htmlFor="name">Contacto</label>
              <input id="name" name="name" type="text" placeholder="Tu nombre" />
            </div>
            <div className="form__field">
              <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" placeholder="tienda@mail.com" required />
            </div>
            <div className="form__field">
              <label htmlFor="instagram">Instagram</label>
              <input id="instagram" name="instagram" type="text" placeholder="@mitienda" />
            </div>
            <div className="form__field">
              <label htmlFor="website">Web</label>
              <input id="website" name="website" type="url" placeholder="https://" />
            </div>
            <div className="form__field form__full">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" rows={4} placeholder="Contanos sobre tu tienda y dónde operás" />
            </div>
            {/* Honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" />
          </div>
          {error && <p className="form__error" role="alert">{error}</p>}
          <div className="form__actions">
            <button className="btn" disabled={status==='submitting'}>
              {status==='submitting' ? 'Enviando…' : 'Enviar solicitud'}
            </button>
            <a className="btn btn--secondary" href="mailto:hola@majorani.com?subject=Distribuidor%20Majorani">
              Escribir por email
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
