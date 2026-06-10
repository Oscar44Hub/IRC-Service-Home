import { PHONE, PHONE_TEL, EMAIL, WEBSITE, ADDRESS, COMPANY } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="container-edge py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl">IRC</span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/60">Service</span>
          </div>
          <p className="mt-5 text-white/70 max-w-sm leading-relaxed text-sm">
            Reformas integrales con garantía en Torrejón de Ardoz y toda la Comunidad de Madrid.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-wider text-white/50 mb-4">Contacto</div>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${PHONE_TEL}`} className="hover:underline">{PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a></li>
            <li>{ADDRESS}</li>
            <li><a href={`https://${WEBSITE}`} className="hover:underline">{WEBSITE}</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-wider text-white/50 mb-4">Servicios</div>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Reformas integrales</li>
            <li>Cocinas y baños</li>
            <li>Locales comerciales</li>
            <li>Pintura y acabados</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-edge py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {COMPANY}. Todos los derechos reservados.</span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-white/80">Aviso legal</a>
            <a href="#" className="hover:text-white/80">Privacidad</a>
            <a href="#" className="hover:text-white/80">Cookies</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
