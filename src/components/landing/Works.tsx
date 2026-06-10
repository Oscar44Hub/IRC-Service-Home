import { useRef, useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import ApartamentoGallery from "./ApartamentoGallery";
import video1 from "@/assets/video-1.mp4";
import video2 from "@/assets/video-2.mp4";

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
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
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0 px-6 pb-6">
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          className="max-h-full max-w-full"
        />
      </div>
    </div>
  );
}

function VideoCard({ src, title }: { src: string; title: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer group overflow-hidden aspect-[4/3] bg-surface-dark"
        onClick={() => setModalOpen(true)}
      >
        <video
          src={src}
          muted
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
          <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="h-7 w-7 text-foreground fill-foreground ml-1" />
          </div>
        </div>
      </div>
      <div className="mt-4 px-1">
        <h3 className="font-display font-semibold text-base leading-snug">{title}</h3>
      </div>
      {modalOpen && <VideoModal src={src} title={title} onClose={() => setModalOpen(false)} />}
    </>
  );
}

const cards = [
  {
    id: "hld",
    component: <VideoCard src={video1} title="HLD Store Torrejón" />,
  },
  {
    id: "apartamento",
    component: <ApartamentoGallery />,
  },
  {
    id: "cataluna",
    component: <VideoCard src={video2} title="Reforma Piso Parque Cataluña, Torrejón" />,
  },
  // Aquí se añadirá el proyecto 4
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
