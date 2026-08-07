import type { Metadata } from "next";
import ConnectClient from "@/next/ConnectClient";

export const metadata: Metadata = {
  title: "Connect",
  description: "Contact Tayseer Innovations in Saudi Arabia and the UAE to discuss banking technology, AI and digital transformation requirements.",
  alternates: { canonical: "/connect" }
};

export default function ConnectPage() {
  return <ConnectClient />;
}
