"use client";

// Temporary Phase 2 bridge: Home still contains interactive motion and form logic.
// The route itself is native App Router; this wrapper keeps the page client-owned
// until the final React Router import cleanup removes the webpack compatibility alias.
import Home from "@/pages/Home";

export default function HomeClient() {
  return <Home />;
}
