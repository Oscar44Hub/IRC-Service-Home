import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Página no encontrada | IRC Service";

    // Una 404 nunca debe indexarse.
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    const previous = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, follow");

    return () => {
      if (previous) robots?.setAttribute("content", previous);
    };
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Esta página no existe.</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          El enlace que has seguido no lleva a ninguna parte. Vuelve al inicio para ver nuestros
          servicios de reforma en Torrejón de Ardoz y Madrid, o escríbenos y te ayudamos.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground text-sm font-medium px-5 py-3 hover:bg-foreground/85 transition-colors"
          >
            Volver al inicio
          </a>
          <a
            href="/#contacto"
            className="inline-flex items-center justify-center border border-hairline text-sm font-medium px-5 py-3 hover:bg-surface-alt transition-colors"
          >
            Pedir presupuesto
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
