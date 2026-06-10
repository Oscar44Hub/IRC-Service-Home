import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const totalPhotos = 18;
const photos = Array.from({ length: totalPhotos }, (_, i) => ({
  src: new URL(`../assets/apartamento/foto-${String(i + 1).padStart(2, "0")}.jpg`, import.meta.url).href,
  alt: `Apartamento en Madrid · foto ${i + 1}`,
}));

function Lightbox({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + totalPhotos) % totalPhotos), []);
  const next = useCallback(() => setCurrent((c) => (c + 1) % totalPhotos), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <span className="text-white/60 text-sm font-medium tracking-widest uppercase">
          Apartamento en Madrid
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm">{current + 1} / {totalPhotos}</span>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 px-16">
        <button
          onClick={prev}
          className="absolute left-4 h-12 w-12 grid place-items-center text-white/60 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <img
          key={current}
          src={photos[current].src}
          alt={photos[current].alt}
          className="max-h-full max-w-full object-contain"
        />

        <button
          onClick={next}
          className="absolute right-4 h-12 w-12 grid place-items-center text-white/60 hover:text-white transition-colors"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex-shrink-0 px-6 py-4 overflow-x-auto">
        <div className="flex gap-2 justify-center">
          {photos.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 h-14 w-14 overflow-hidden transition-all ${
                i === current ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"
              }`}
            >
              <img src={p.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ApartamentoGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer group overflow-hidden"
        onClick={() => setLightboxOpen(true)}
      >
        {/* Cover image — grayscale, color on hover */}
        <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
          <img
            src={photos[0].src}
            alt="Apartamento en Madrid — portada"
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="text-center text-white">
            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform mb-3">
              <Images className="h-7 w-7 text-foreground" />
            </div>
            <span className="text-sm font-medium tracking-wider">Ver {totalPhotos} fotos</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 px-1">
        <h3 className="font-display font-semibold text-base leading-snug">Apartamento en Madrid</h3>
      </div>

      {lightboxOpen && (
        <Lightbox startIndex={0} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}
