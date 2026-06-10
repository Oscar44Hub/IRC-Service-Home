import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

import f1 from "@/assets/chalet/foto-1.jpeg";
import f2 from "@/assets/chalet/foto-2.jpeg";
import f3 from "@/assets/chalet/foto-3.jpeg";
import f4 from "@/assets/chalet/foto-4.jpeg";
import f5 from "@/assets/chalet/foto-5.jpeg";
import f6 from "@/assets/chalet/foto-6.jpeg";
import f7 from "@/assets/chalet/foto-7.jpeg";
import f8 from "@/assets/chalet/foto-8.jpeg";
import f9 from "@/assets/chalet/foto-9.jpeg";
import f10 from "@/assets/chalet/foto-10.jpeg";
import f11 from "@/assets/chalet/foto-11.jpeg";
import f12 from "@/assets/chalet/foto-12.jpeg";
import f13 from "@/assets/chalet/foto-13.jpeg";
import f14 from "@/assets/chalet/foto-14.jpeg";
import f15 from "@/assets/chalet/foto-15.jpeg";

const photos = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15];
const totalPhotos = photos.length;

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
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0">
        <span className="text-white/60 text-sm font-medium tracking-widest uppercase">
          Chalet Soto Torrejón
        </span>
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm">{current + 1} / {totalPhotos}</span>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center relative min-h-0 px-16">
        <button onClick={prev} className="absolute left-4 h-12 w-12 grid place-items-center text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="h-8 w-8" />
        </button>
        <img key={current} src={photos[current]} alt={`Chalet Soto Torrejón · foto ${current + 1}`} className="max-h-full max-w-full object-contain" />
        <button onClick={next} className="absolute right-4 h-12 w-12 grid place-items-center text-white/60 hover:text-white transition-colors">
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="flex-shrink-0 px-6 py-4 overflow-x-auto">
        <div className="flex gap-2 justify-center">
          {photos.map((p, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`flex-shrink-0 h-14 w-14 overflow-hidden transition-all ${i === current ? "ring-2 ring-white opacity-100" : "opacity-40 hover:opacity-70"}`}>
              <img src={p} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChaletGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="relative cursor-pointer group overflow-hidden" onClick={() => setLightboxOpen(true)}>
        <div className="aspect-[4/3] overflow-hidden bg-surface-alt">
          <img
            src={photos[0]}
            alt="Chalet Soto Torrejón — portada"
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="text-center text-white">
            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform mb-3">
              <Images className="h-7 w-7 text-foreground" />
            </div>
            <span className="text-sm font-medium tracking-wider">Ver {totalPhotos} fotos</span>
          </div>
        </div>
      </div>
      <div className="mt-4 px-1">
        <h3 className="font-display font-semibold text-base leading-snug">Chalet Soto Torrejón</h3>
      </div>
      {lightboxOpen && <Lightbox startIndex={0} onClose={() => setLightboxOpen(false)} />}
    </>
  );
}
