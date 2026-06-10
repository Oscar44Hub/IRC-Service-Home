import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Reviews from "@/components/landing/Reviews";
import Areas from "@/components/landing/Areas";
import FAQ from "@/components/landing/FAQ";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

const Index = () => {
  useEffect(() => {
    document.title = "IRC Service · Reformas integrales con garantía en Torrejón y Madrid";
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "Reformas integrales con garantía en Torrejón de Ardoz y Madrid. 4,9/5 en Google con 99 reseñas. Plazos cumplidos, acabados impecables, presupuesto cerrado."
    );
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <TrustBar />
      <Services />
      <Process />
      <Reviews />
      <Areas />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
