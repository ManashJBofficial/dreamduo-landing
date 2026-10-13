import Image from "next/image";
import photos from "@/content/assets/couples-bucket-list-photos.json";
import { getLocalImageSize } from "@/lib/images";

/** The manifest keeps replacement photos and their credits together. */
export function BucketListPhoto({ id }: { id: string }) {
  if (!(id in photos)) throw new Error(`Unknown bucket-list photo: ${id}`);
  const photo = photos[id as keyof typeof photos];
  const src = `/blog/couples-bucket-list/${photo.file}`;
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <Image
        src={src}
        alt={photo.alt}
        {...getLocalImageSize(src)}
        sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1023px) 44rem, 54rem"
        loading="lazy"
        className="aspect-[8/5] h-auto w-full object-cover"
      />
      <figcaption className="px-4 py-2.5 text-xs leading-relaxed text-slate-600">
        Photo by <a href={photo.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-rose-700">{photo.credit} on Pexels</a>
      </figcaption>
    </figure>
  );
}
