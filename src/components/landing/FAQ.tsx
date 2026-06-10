import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Qué incluye la garantía de IRC Service?",
    a: "Toda nuestra obra se entrega con garantía por escrito sobre los trabajos ejecutados. Si aparece cualquier incidencia derivada de la reforma, volvemos a solucionarlo sin coste para ti.",
  },
  {
    q: "¿Cómo aseguráis los plazos de entrega?",
    a: "Antes de empezar firmamos un calendario detallado por fases. Contamos con equipo propio y coordinamos los gremios para cumplir la fecha de entrega pactada.",
  },
  {
    q: "¿El presupuesto es cerrado o puede subir?",
    a: "El presupuesto es cerrado. Detallamos cada partida por escrito y solo se modifica si tú decides añadir trabajos extra durante la obra.",
  },
  {
    q: "¿Os encargáis de las licencias y permisos?",
    a: "Sí. Nos encargamos de la gestión de licencias y permisos necesarios ante el ayuntamiento y la comunidad de propietarios.",
  },
  {
    q: "¿Podéis reformar con la vivienda habitada?",
    a: "Sí, somos especialmente cuidadosos con la limpieza y el orden. Planificamos la obra por zonas para que puedas seguir viviendo en casa siempre que sea posible.",
  },
  {
    q: "¿Cuánto tarda una reforma integral?",
    a: "Una reforma integral de una vivienda media suele ejecutarse entre 6 y 10 semanas, según la superficie y los acabados. Te damos un plazo exacto en la visita.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-4">Preguntas frecuentes</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Lo que más nos preguntan.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            ¿Tienes otra duda? Llámanos o escríbenos por WhatsApp y te respondemos el mismo día.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-hairline">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-hairline">
                <AccordionTrigger className="text-left text-base md:text-lg font-display font-semibold py-6 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
