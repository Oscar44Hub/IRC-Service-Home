import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Reformas integrales",
    desc: "Transformamos viviendas completas: distribución, instalaciones, acabados y decoración llave en mano.",
  },
  {
    n: "02",
    title: "Cocinas y baños",
    desc: "Reformas exprés de cocinas y baños con materiales de primeras marcas y plazos ajustados.",
  },
  {
    n: "03",
    title: "Locales comerciales",
    desc: "Acondicionamos tu local desde cero: licencias, obra y diseño adaptado a tu negocio.",
  },
  {
    n: "04",
    title: "Pintura y acabados",
    desc: "Trabajos parciales con la misma exigencia: pintura, alicatado, suelos y carpintería.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32">
      <div className="container-edge">
        <div className="max-w-2xl mb-16">
          <div className="eyebrow mb-4">Servicios</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Lo que hacemos, lo hacemos bien.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline">
          {services.map((s) => (
            <a
              key={s.n}
              href="#contacto"
              className="group p-8 border-r border-b border-hairline hover:bg-surface-alt transition-colors flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="text-xs font-mono text-muted-foreground mb-6">{s.n}</div>
                <h3 className="font-display text-xl leading-snug mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                Pedir información
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
