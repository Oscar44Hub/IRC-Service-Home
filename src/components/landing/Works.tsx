import { useRef, useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import ApartamentoGallery from "./ApartamentoGallery";
import ChaletGallery from "./ChaletGallery";
import video1 from "@/assets/video-1.mp4";
import video2 from "@/assets/video-2.mp4";
import poster1 from "@/assets/video-1-poster.jpg";
import poster2 from "@/assets/video-2-poster.jpg";

function VideoModal({ src, poster, title, onClose }: { src: string; poster: string; title: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    videoRef.current?.play();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <span className="text-white/60 text-sm font-medium tracking-widest uppercase">{title}</span>
        <button onClick={onClose} aria-label="Cerrar vídeo" className="text-white/60 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0 px-6 pb-6">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="max-h-full max-w-full"
        />
      </div>
    </div>
  );
}

function VideoCard({ src, poster, title, alt }: { src: string; poster: string; title: string; alt: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`Ver vídeo de la reforma: ${title}`}
        className="relative block w-full text-left cursor-pointer group overflow-hidden aspect-[4/3] bg-surface-dark"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={poster}
          alt={alt}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
          <span className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="h-7 w-7 text-foreground fill-foreground ml-1" />
          </span>
        </span>
      </button>
      <div className="mt-4 px-1">
        <h3 className="font-display font-semibold text-base leading-snug">{title}</h3>
      </div>
      {modalOpen && <VideoModal src={src} poster={poster} title={title} onClose={() => setModalOpen(false)} />}
    </>
  );
}

const cards = [
  {
    id: "hld",
    component: (
      <VideoCard
        src={video1}
        poster={poster1}
        title="HLD Store Torrejón"
        alt="Reforma de local comercial HLD Store en Torrejón de Ardoz ejecutada por IRC Service"
      />
    ),
  },
  {
    id: "apartamento",
    component: <ApartamentoGallery />,
  },
  {
    id: "cataluna",
    component: (
      <VideoCard
        src={video2}
        poster={poster2}
        title="Reforma Piso Parque Cataluña, Torrejón"
        alt="Reforma integral de piso en el barrio Parque Cataluña, Torrejón de Ardoz, con dormitorio y baño en suite"
      />
    ),
  },
  {
    id: "chalet",
    component: <ChaletGallery />,
  },
];

export default function Works() {
  return (
    <section id="trabajos" className="py-24 md:py-32">
      <div className="container-edge">
        <div className="mb-12">
          <div className="eyebrow mb-4">Nuestros trabajos</div>
          <h2 className="font-display text-3xl md:text-5xl leading-tight">
            Resultados que hablan<br />por sí solos.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
            Reformas integrales, locales comerciales y viviendas completas ejecutadas por IRC Service
            en Torrejón de Ardoz, Madrid capital y el Corredor del Henares. Estos son algunos de los
            proyectos que hemos entregado.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.id}>
              {card.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
