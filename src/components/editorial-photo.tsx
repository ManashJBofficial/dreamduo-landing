import Image from "next/image";
import bucketPhotos from "@/content/assets/couples-bucket-list-photos.json";
import intimacyPhotos from "@/content/assets/long-distance-questions-photos.json";
import giftPhotos from "@/content/assets/care-package-photos.json";
import { getLocalImageSize } from "@/lib/images";

interface Photo { file: string; alt: string; credit: string; source?: string; kind?: string; caption?: string }
const collections: Record<string, { base: string; photos: Record<string, Photo> }> = {
  "bucket-list": { base: "/blog/couples-bucket-list", photos: bucketPhotos },
  intimacy: { base: "/blog/spicy-questions-long-distance-couples", photos: intimacyPhotos },
  gifting: { base: "/blog/long-distance-care-package-ideas", photos: giftPhotos },
};

export function EditorialPhoto({ id, collection = "bucket-list" }: { id: string; collection?: "bucket-list" | "intimacy" | "gifting" }) {
  const library = collections[collection];
  const photo = library?.photos[id];
  if (!photo) throw new Error(`Unknown editorial photo: ${collection}/${id}`);
  const src = `${library.base}/${photo.file}`;
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <Image src={src} alt={photo.alt} {...getLocalImageSize(src)} sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1023px) 44rem, 54rem" loading="lazy" className="aspect-[8/5] h-auto w-full object-cover" />
      <figcaption className="px-4 py-2.5 text-xs leading-relaxed text-slate-600">{photo.alt}</figcaption>
    </figure>
  );
}
