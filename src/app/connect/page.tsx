import type { Metadata } from "next";
import ConnectClient from "@/next/ConnectClient";

const title = "Contact Tayseer Innovations | Banking Technology & AI Solutions";
const description = "Contact Tayseer Innovations in Saudi Arabia and the UAE to discuss core banking, digital banking, AI, managed services and financial technology transformation requirements.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["contact Tayseer Innovations", "banking technology consultation", "digital banking partner Saudi Arabia", "FinTech partner UAE", "AI banking consultation"],
  alternates: { canonical: "/connect" },
  openGraph: {
    type: "website",
    url: "/connect",
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contact Tayseer Innovations" }]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
};

export default function ConnectPage() {
  return <ConnectClient />;
}
