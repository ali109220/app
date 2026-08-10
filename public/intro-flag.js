/* Tayseer entrance intro — runtime kill switch.
 *
 * This file is deliberately NOT part of the JS bundle. Edit it in place on the
 * host (or CDN) and purge its cache to turn the intro off without a rebuild or
 * a redeploy of the application. The site is a static export (`output: "export"`),
 * so a build-time env var would require a full redeploy — this does not.
 *
 *   true  -> intro may play, subject to the session gate, prefers-reduced-motion
 *            and 3D-capability checks in TayseerEntrance.
 *   false -> intro never plays; visitors go straight to the homepage.
 *
 * Serve this path with `Cache-Control: no-store` (see next.config.mjs) so the
 * switch takes effect on the next page load rather than after a cache TTL.
 */
window.__TAYSEER_INTRO_ENABLED__ = true;
