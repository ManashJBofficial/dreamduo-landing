import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DreamDuo - Build Your Dreams Together",
    short_name: "DreamDuo",
    description:
      "The goal tracker designed for couples who want more from life. Sync your savings, habits, and future in one beautiful space.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9f9",
    theme_color: "#e91e7b",
    icons: [
      {
        src: "/dreamduo_logo.webp",
        sizes: "any",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
