import { ShieldCheck, Clock, Sparkles, Users } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Garantía por escrito", desc: "Contrato y garantía post-obra incluidos." },
  { icon: Clock, title: "Plazos cumplidos", desc: "Fechas pactadas y respetadas." },
  { icon: Sparkles, title: "Acabados impecables", desc: "Atención al detalle en cada metro." },
  { icon: Users, title: "Equipo propio", desc: "Profesionales cualificados y educados." },
];

export default function TrustBar() {
  return (
    <section className="bg-surface-dark text-surface-dark-foreground">
      <div className="container-edge py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3">
              <Icon className="h-6 w-6" strokeWidth={1.25} />
              <div className="font-display text-lg leading-tight">{title}</div>
              <div className="text-sm text-white/60 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
