import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { LEGAL, faltanDatosLegales } from "@/lib/legal";

type Props = {
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
};

/**
 * Marco común de las páginas legales.
 *
 * Se marcan como noindex: no aportan nada en búsqueda y compiten por
 * presupuesto de rastreo, pero deben ser accesibles y enlazables (lo exigen
 * la LSSI-CE y el RGPD, y Google las lee como señal de fiabilidad).
 */
export default function LegalLayout({ titulo, descripcion, children }: Props) {
  useEffect(() => {
    document.title = `${titulo} | ${LEGAL.nombreComercial}`;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      const anterior = el.getAttribute("content");
      el.setAttribute("content", content);
      return () => { if (anterior) el?.setAttribute("content", anterior); };
    };

    const restaurarRobots = setMeta("robots", "noindex, follow");
    const restaurarDesc = setMeta("description", descripcion);

    return () => {
      restaurarRobots();
      restaurarDesc();
    };
  }, [titulo, descripcion]);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="container-edge pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-2xl">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </a>

          <h1 className="mt-8 font-display text-3xl md:text-5xl leading-tight">{titulo}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Última actualización: {LEGAL.ultimaActualizacion}
          </p>

          {faltanDatosLegales() && (
            <div className="mt-8 border border-hairline bg-surface-alt p-5 text-sm leading-relaxed">
              <strong className="font-display">Borrador pendiente de datos.</strong> Este texto
              todavía contiene campos sin rellenar (razón social, NIF y proveedor de alojamiento).
              Complétalos en <code className="text-xs">src/lib/legal.ts</code> antes de publicar la
              web: un aviso legal incompleto no cumple el artículo 10 de la LSSI-CE.
            </div>
          )}

          <div className="legal-prose mt-12">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
