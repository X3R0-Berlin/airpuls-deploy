"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lens } from "@/components/ui/lens";
import type { ProductImage } from "@/lib/products";

export function ProductGallery({
  images,
  basePath,
}: {
  images: ProductImage[];
  basePath: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  return (
    <div className="sticky top-24">
      {/* Main Image */}
      <div
        className={cn(
          "relative aspect-square bg-[var(--brand-bg-cream)] rounded-2xl mb-4 cursor-crosshair transition-all duration-500",
        )}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Lens position={position} isHovering={isZoomed} zoomFactor={1.7}>
          <Image
            src={`${basePath}/${images[activeIndex].file}`}
            alt={images[activeIndex].alt}
            fill
            className={cn(
              "object-contain p-8 w-full h-full"
            )}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </Lens>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setIsZoomed(false);
            }}
            className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 p-1 bg-transparent",
              i === activeIndex
                ? "border-[var(--brand-text-dark)] opacity-100"
                : "border-black/15 opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={`${basePath}/${img.file}`}
              alt={img.alt}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
