"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  return (
    <div>
      <div className="gallery-main">
        <Image
          className="gallery-image"
          src={selectedImage}
          alt={alt}
          width={1200}
          height={900}
          fetchPriority="high"
          loading="eager"
          sizes="(max-width: 760px) 100vw, 55vw"
        />
      </div>
      <div className="gallery-thumbnails" aria-label="Choose product image">
        {images.map((image, index) => (
          <button
            className="thumbnail-button"
            key={`${image}-${index}`}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              className="gallery-image"
              src={image}
              alt=""
              width={1200}
              height={900}
              sizes="(max-width: 760px) 33vw, 18vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
