import { MapPin } from "lucide-react";

const areas = [
  "Torrejón de Ardoz",
  "Alcalá de Henares",
  "San Fernando de Henares",
  "Coslada",
  "Madrid capital",
  "Mejorada del Campo",
  "Velilla de San Antonio",
  "Paracuellos del Jarama",
  "Loeches",
  "Rivas-Vaciamadrid",
];

export default function Areas() {
  return (
    <section id="zonas" className="py-24 md:py-32 bg-surface-dark text-surface-dark-foreground">
      <div className="container-edge grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-4 text-white/60">Zonas atendidas</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Madrid y Corredor del Henares.
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed max-w-md">
            Con sede en Torrejón de Ardoz, hacemos reformas integrales, de cocinas, de baños y de
            locales comerciales en toda la Comunidad de Madrid. Si tu zona no aparece, consúltanos.
          </p>
        </div>
        <div className="lg:col-span-7">
          <ul className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {areas.map((a) => (
              <li key={a} className="bg-surface-dark px-5 py-4 flex items-center gap-3">
                <MapPin className="h-4 w-4 text-white/40" strokeWidth={1.5} />
                <span className="text-sm">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
