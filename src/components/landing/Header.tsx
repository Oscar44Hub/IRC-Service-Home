import { Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/contact";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Zonas", href: "#zonas" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/85 backdrop-blur border-b border-hairline">
      <div className="container-edge flex items-center justify-between h-16">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">IRC</span>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Service</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={`tel:${PHONE_TEL}`} className="hidden sm:flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 hover:bg-foreground/85 transition-colors"
          >
            Pedir presupuesto
          </a>
        </div>
      </div>
    </header>
  );
}
