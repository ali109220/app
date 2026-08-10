import { activityAlpha, activityGreen } from "./tokens";

/**
 * The "something is live" dot.
 *
 * Pings three times and then holds as a plain green dot — see
 * .motion-activity-halo in index.css. It marks a live surface; it is not an
 * ambient decoration, so it should only appear where a real state is being
 * reported (a live workspace, a current selection), never on a section label.
 *
 * Purely decorative to assistive tech and aria-hidden: the surrounding copy
 * always names the state in words, so nothing is lost.
 * Pure CSS, so it works in server components with no JS cost.
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
          style={{ background: activityAlpha(0.45) }}
        />
      )}
      <span className="relative inline-block h-full w-full rounded-full" style={{ background: activityGreen }} />
    </span>
  );
}
