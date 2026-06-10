import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface VideoItem {
  src: string;
  title: string;
  poster?: string;
}

const videos: VideoItem[] = [
  // Los vídeos se añadirán aquí
];

function VideoCard({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  return (
    <div className="relative flex-shrink-0 w-[320px] md:w-[400px] group cursor-pointer" onClick={handleClick}>
      <div className="relative overflow-hidden aspect-video bg-surface-dark">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          playsInline
          onEnded={() => setPlaying(false)}
          className={`w-full h-full object-cover transition-all duration-500 ${playing ? "grayscale-0" : "grayscale"}`}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
            <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="h-7 w-7 text-foreground fill-foreground ml-1" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 px-1">
        <h3 className="font-display font-semibold text-base leading-snug">{video.title}</h3>
      </div>
    </div>
  );
}

export default function Works() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === "right" ? 440 : -440, behavior: "smooth" });
  };

  if (videos.length === 0) return null;

  return (
    <section id="trabajos" className="py-24 md:py-32">
      <div className="container-edge">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="eyebrow mb-4">Nuestros trabajos</div>
            <h2 className="font-display text-3xl md:text-5xl leading-tight">
              Resultados que hablan<br />por sí solos.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="h-11 w-11 grid place-items-center border border-hairline hover:bg-surface-alt transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="h-11 w-11 grid place-items-center border border-hairline hover:bg-surface-alt transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((v, i) => (
            <div key={i} className="snap-start">
              <VideoCard video={v} />
            </div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-6">
          <button
            onClick={() => scroll("left")}
            className="h-11 w-11 grid place-items-center border border-hairline hover:bg-surface-alt transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-11 w-11 grid place-items-center border border-hairline hover:bg-surface-alt transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
