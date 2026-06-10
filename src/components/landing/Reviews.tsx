import { Star } from "lucide-react";
import { RATING, REVIEWS } from "@/lib/contact";

const reviews = [
  {
    text: "Profesionalidad de principio a fin. Cumplieron los plazos al día y los acabados son perfectos. Volvería a contar con ellos sin dudarlo.",
    author: "Laura M.",
    location: "Torrejón de Ardoz",
  },
  {
    text: "Reformaron nuestro piso entero. Equipo educado, muy limpio y atento a cada detalle. Comunicación impecable durante toda la obra.",
    author: "Javier R.",
    location: "Alcalá de Henares",
  },
  {
    text: "Flexibles con los cambios que pedimos sobre la marcha y siempre con buena cara. El resultado supera lo que esperábamos.",
    author: "Marta G.",
    location: "Madrid",
  },
  {
    text: "Cocina y baño en tres semanas, sin retrasos y con un acabado impecable. Recomendados al 100%.",
    author: "Andrés P.",
    location: "Coslada",
  },
  {
    text: "Cuidaron muchísimo la limpieza y el orden mientras vivíamos en casa durante la reforma. Muy serios y responsables.",
    author: "Beatriz L.",
    location: "San Fernando de Henares",
  },
  {
    text: "Presupuesto cerrado y cero sorpresas. Buen trato, buen precio y trabajo bien hecho. Justo lo que buscábamos.",
    author: "Carlos D.",
    location: "Madrid",
  },
];

export default function Reviews() {
  return (
    <section id="opiniones" className="py-24 md:py-32">
      <div className="container-edge">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-4">Opiniones</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              {RATING.toString().replace(".", ",")}/5 sobre {REVIEWS} reseñas en Google.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Casi un centenar de familias y propietarios ya han confiado en IRC Service para reformar su hogar o local en Madrid. Esto es lo que dicen.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 border border-hairline px-4 py-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Verificado en Google</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {reviews.map((r, i) => (
            <figure key={i} className="bg-background p-7 flex flex-col gap-5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-foreground/90">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-hairline">
                <div className="text-sm font-medium">{r.author}</div>
                <div className="text-xs text-muted-foreground">{r.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
