"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageGalleryProps {
    title: string;
    images: string[];
    selectedImageIdx: number;
    onSelectImage: (idx: number) => void;
}

export function ProductImageGallery({
    title,
    images,
    selectedImageIdx,
    onSelectImage,
}: ProductImageGalleryProps) {
    const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
    const currentImage = images[selectedImageIdx] || images[0];

    const handleGalleryKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (images.length <= 1) return;
        if (e.key === "ArrowRight") {
            e.preventDefault();
            onSelectImage((selectedImageIdx + 1) % images.length);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            onSelectImage((selectedImageIdx - 1 + images.length) % images.length);
        }
    };

    return (
        <section
            aria-labelledby="gallery-heading"
            className="product-thumbnail product-gallery-col space-y-3"
        >
            <h2 id="gallery-heading" className="sr-only">
                Galeri Foto Produk
            </h2>
            <figure
                tabIndex={0}
                onKeyDown={handleGalleryKeyDown}
                aria-label={`Gambar produk ${title}. Gunakan tombol panah kiri atau kanan untuk mengganti foto.`}
                className="relative aspect-square w-full overflow-hidden rounded-2xl border border-mypeken-light-gray bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand"
            >
                <Image
                    src={currentImage}
                    alt={`${title} - Foto ${selectedImageIdx + 1}`}
                    fill
                    priority
                    onClick={() => setIsImageZoomed((prev) => !prev)}
                    className={`object-contain p-4 transition-transform duration-300 cursor-zoom-in ${
                        isImageZoomed ? "scale-125 cursor-zoom-out" : "hover:scale-105"
                    }`}
                />
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Foto sebelumnya"
                            onClick={() =>
                                onSelectImage((selectedImageIdx - 1 + images.length) % images.length)
                            }
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-mypeken-black shadow-md hover:bg-mypeken-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand cursor-pointer"
                        >
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            aria-label="Foto berikutnya"
                            onClick={() => onSelectImage((selectedImageIdx + 1) % images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-mypeken-black shadow-md hover:bg-mypeken-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand cursor-pointer"
                        >
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </>
                )}
                <figcaption className="sr-only">
                    Menampilkan foto {selectedImageIdx + 1} dari {images.length} untuk {title}
                </figcaption>
            </figure>

            {images.length > 1 && (
                <div
                    role="list"
                    aria-label="Pilih gambar thumbnail"
                    className="grid grid-cols-4 gap-2.5"
                >
                    {images.slice(0, 4).map((imgUrl, idx) => {
                        const isActive = idx === selectedImageIdx;
                        return (
                            <button
                                key={`${imgUrl}-${idx}`}
                                type="button"
                                role="listitem"
                                aria-label={`Tampilkan foto ke-${idx + 1}`}
                                aria-current={isActive ? "true" : undefined}
                                onClick={() => {
                                    onSelectImage(idx);
                                    setIsImageZoomed(false);
                                }}
                                className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-white p-1 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mypeken-brand ${
                                    isActive
                                        ? "border-mypeken-brand ring-2 ring-mypeken-brand/20"
                                        : "border-mypeken-light-gray opacity-75 hover:opacity-100 hover:border-mypeken-brand/50"
                                }`}
                            >
                                <Image
                                    src={imgUrl}
                                    alt={`${title} thumbnail ${idx + 1}`}
                                    fill
                                    className="object-contain p-1"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
