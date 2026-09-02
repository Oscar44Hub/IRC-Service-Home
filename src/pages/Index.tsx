import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import Services from "@/components/landing/Services";
import Works from "@/components/landing/Works";
import Process from "@/components/landing/Process";
import Reviews from "@/components/landing/Reviews";
import Areas from "@/components/landing/Areas";
import FAQ from "@/components/landing/FAQ";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";
import WhatsAppFloat from "@/components/landing/WhatsAppFloat";

// El <title>, la meta description y los datos estructurados viven en index.html:
// así están en el HTML servido y los leen tanto Google como los rastreadores de IA,
// que no ejecutan JavaScript.
const Index = () => (
  <main className="bg-background text-foreground">
    <Header />
    <Hero />
    <TrustBar />
    <Services />
    <Works />
    <Process />
    <Reviews />
    <Areas />
    <FAQ />
    <ContactForm />
    <Footer />
    <WhatsAppFloat />
  </main>
);

export default Index;
