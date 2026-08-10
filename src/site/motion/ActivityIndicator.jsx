import { GREEN, green } from "./tokens";

/**
 * The "something is live" dot.
 *
 * Purely decorative and aria-hidden: it carries no information a screen-reader
 * user would otherwise miss, and the surrounding copy always names the state in
 * words. Pure CSS, so it works in server components with no JS cost.
 */
export default function ActivityIndicator({ size = 6, className = "", halo = true }) {
  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {halo && (
        <span
          className="motion-activity-halo absolute inset-0 rounded-full"
          style={{ background: green(0.45) }}
        />
      )}
      <span className="relative inline-block h-full w-full rounded-full" style={{ background: GREEN }} />
    </span>
  );
}
