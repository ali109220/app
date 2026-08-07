import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tayseer Innovations",
    short_name: "Tayseer",
    description: "AI, digital banking and financial technology solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#090B0E",
    theme_color: "#090B0E"
  };
}
