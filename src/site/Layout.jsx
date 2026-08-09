import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SmoothScroll from "./SmoothScroll";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/components/ui/sonner";
import { T } from "./theme";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <SmoothScroll>
      <div style={{ background: T.bg, color: T.text }} className="min-h-screen font-instrument antialiased">
        <Header />
        <main data-testid="page-main">
          <Outlet />
        </main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" richColors />
      </div>
    </SmoothScroll>
  );
}
