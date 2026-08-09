import Link from "next/link";
import { T } from "@/site/theme";

const LINKS = [
  ["Transformation", "#transformation"],
  ["Solutions", "#solutions"],
  ["Fahim AI", "#fahim-ai"],
  ["Platform", "#platform"],
  ["Client proof", "#client-proof"],
  ["Insights", "#insights"],
  ["Contact", "#contact"],
];

export default function HomeSectionNav() {
  return (
    <nav aria-label="Homepage sections" className="border-b px-6 md:px-12" style={{ borderColor: T.border, background: T.bg }}>
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="mr-2 shrink-0 font-jbmono text-xs font-medium" style={{ color: T.muted }}>Jump to</span>
        {LINKS.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors hover:bg-white focus-visible:bg-white" style={{ borderColor: T.border, color: T.text }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
