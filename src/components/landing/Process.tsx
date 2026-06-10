const steps = [
  { n: "01", title: "Visita y medición", desc: "Te visitamos sin coste, escuchamos tus necesidades y tomamos medidas." },
  { n: "02", title: "Presupuesto cerrado", desc: "Te entregamos un presupuesto detallado, sin sorpresas y por escrito." },
  { n: "03", title: "Planificación", desc: "Definimos materiales, plazos y un calendario claro para toda la obra." },
  { n: "04", title: "Ejecución", desc: "Nuestro equipo propio ejecuta la reforma con limpieza y máxima atención." },
  { n: "05", title: "Entrega y garantía", desc: "Te entregamos la obra revisada y con garantía post-reforma." },
];

export default function Process() {
  return (
    <section id="proceso" className="py-24 md:py-32 bg-surface-alt">
      <div className="container-edge">
        <div className="max-w-2xl mb-16">
          <div className="eyebrow mb-4">Cómo trabajamos</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Un proceso claro, de principio a fin.
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-px bg-hairline border border-hairline">
          {steps.map((s) => (
            <div key={s.n} className="bg-background p-6 md:p-7 flex flex-col">
              <div className="font-display text-3xl text-foreground/15 mb-4">{s.n}</div>
              <h3 className="font-display text-lg mb-2 leading-snug">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
