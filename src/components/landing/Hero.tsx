import { Star, ArrowRight, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import { RATING, REVIEWS, WHATSAPP_URL } from "@/lib/contact";

export default function Hero() {
  return (
    <section id="top" className="relative pt-16">
      <div className="container-edge pt-16 md:pt-24 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 fade-up">
          <div className="eyebrow mb-6">Reformas integrales · Torrejón de Ardoz</div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
            Reformamos tu hogar con<br />
            <span className="italic">garantía</span> y plazos cumplidos.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Equipo propio especializado en reformas integrales en Madrid. Acabados impecables, presupuesto cerrado y entrega en la fecha pactada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-sm font-medium hover:bg-foreground/85 transition-colors"
            >
              Solicitar presupuesto gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-6 py-3.5 text-sm font-medium hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 pt-8 border-t border-hairline">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">{RATING.toString().replace(".", ",")}/5</span>
              <span className="text-muted-foreground"> · {REVIEWS} reseñas verificadas en Google</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative fade-up">
          <div className="aspect-[4/5] overflow-hidden bg-surface-alt">
            <img
              src={heroImg}
              alt="Salón reformado por IRC Service en Madrid con acabados impecables"
              width={1920}
              height={1080}
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          <div className="hidden md:block absolute -bottom-6 -left-6 bg-background border border-hairline px-6 py-5 max-w-xs">
            <div className="eyebrow mb-2">Garantía por escrito</div>
            <p className="text-sm leading-relaxed">Cada reforma incluye contrato, plazo cerrado y garantía post-obra.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
