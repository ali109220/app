export default function Loading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[2px] overflow-hidden bg-transparent" role="status" aria-live="polite" aria-label="Loading page">
      <div className="h-full w-1/3 animate-[route-progress_0.9s_ease-in-out_infinite] bg-[#0D5A8C]" />
    </div>
  );
}
