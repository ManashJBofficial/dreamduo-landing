import type { MetadataRoute } from "next";
import { HOMEPAGE_DESCRIPTION } from "@/lib/homepage-copy";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DreamDuo",
    short_name: "DreamDuo",
    description: HOMEPAGE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fff9f9",
    theme_color: "#e91e7b",
    icons: [
      {
        src: "/dreamduo-logo.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
