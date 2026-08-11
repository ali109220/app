/*
 * Tayseer entrance intro — server-rendered scene markup.
 *
 * No "use client", no hooks, no props: this is static HTML, always present
 * in the document. Visibility, timing, skip/escape and the tier/reduced-
 * motion variants are entirely owned by intro.css and /intro-gate.js (a
 * blocking <head> script) — see intro.css's header comment for the contract.
 *
 * The Skip button is a SIBLING of the scene rather than a descendant: a
 * focusable control inside an aria-hidden subtree is unreachable to
 * screen-reader users, which would defeat the point.
 */

export default function IntroScene() {
  return (
    <>
      <div id="intro" aria-hidden="true" role="presentation">
        <div className="backdrop" />

        {/* Plain wrapper. The scene fade lives here and NOT on any element that
            declares preserve-3d, because a non-1 opacity forces such an element
            back to `transform-style: flat`. */}
        <div className="sceneFade">
          <div className="stage">
            <div className="parallax">
              <div className="drift">
                <div className="world">
                  {/* ---- Exterior ground and the last two steps ---- */}
                  <div className="l ground" />
                  <div className="l riser1" />
                  <div className="l tread1" />
                  <div className="l riser2" />
                  <div className="l landing" />

                  {/* ---- Lobby: a genuine room behind the doors, visible
                          through the translucent leaves before they part.

                          It lives in its own 3D rendering context. Chrome sorts
                          a preserve-3d context with a BSP tree over infinite
                          planes, so the side walls at x = +/-450 would slice the
                          1130-wide facade panels into fragments and sort half of
                          each one in front of the room. Isolating the room means
                          its planes never enter the facade's sort; the room then
                          composites as a single quad at z = -1100, which the
                          facade at z = -700 occludes unambiguously.

                          The nested perspective is not an approximation. The eye
                          sits 2100 - dolly in front of this box, so a point at
                          box-local depth zl projects by P/(P - zl) locally and is
                          then scaled by 1000/P with the rest of the world:
                          the product is 1000/(P - zl), which is exactly the
                          projection it would have received in the outer context.
                          Every element keeps its specified world coordinates —
                          only the frame they are expressed in has changed. ---- */}
                  <div className="lobbyBox">
                    <div className="l lobbyFloor" />
                    <div className="l lobbyCeil" />
                    <div className="l lobbyBack" />
                    <div className="l lobbyWallL" />
                    <div className="l lobbyWallR" />
                    <div className="l counter">
                      <span className="counterAccent" />
                    </div>
                  </div>

                  {/* ---- Façade. CSS cannot cut a hole in a div, so the wall is
                          three pieces around a 340x460 opening at x +/-170,
                          y -240..220. ---- */}
                  <div className="l facadeL" />
                  <div className="l facadeR" />
                  <div className="l facadeH" />

                  {/* ---- Doors ---- */}
                  <div className="l doorFrame" />
                  <div className="l leaf leafL" />
                  <div className="l leaf leafR" />

                  <div className="l sensor">
                    <span className="led" />
                    <span className="ledPulse" />
                  </div>

                  {/* ---- Fascia sign: the real brand mark, on a backlit plaque
                          so it reads in its own colours. Not redrawn, not
                          recoloured, not reinterpreted. ---- */}
                  <div className="l sign">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo-light.svg" alt="" width={446} height={96} draggable={false} />
                  </div>

                  {/* ---- The man ---- */}
                  <div className="l man">
                    <div className="manRoll">
                      <svg viewBox="0 0 120 300" width="120" height="300" focusable="false">
                        <defs>
                          <linearGradient id="tsClothH" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#BFB9AB" />
                            <stop offset="0.34" stopColor="#FCFBF7" />
                            <stop offset="0.58" stopColor="#F2EEE4" />
                            <stop offset="1" stopColor="#BFB9AB" />
                          </linearGradient>
                          <linearGradient id="tsClothV" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0.38" stopColor="#6E6659" stopOpacity="0" />
                            <stop offset="1" stopColor="#6E6659" stopOpacity="0.42" />
                          </linearGradient>
                          <linearGradient id="tsGhutraG" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#D6D0C3" />
                            <stop offset="0.36" stopColor="#FFFFFF" />
                            <stop offset="0.7" stopColor="#F6F3EC" />
                            <stop offset="1" stopColor="#CAC3B4" />
                          </linearGradient>
                          <linearGradient id="tsCentre" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
                            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.3" />
                            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Rear three-quarter view: no face to render, no profile
                            stride to get wrong, and the back of a kandura and
                            ghutra is instantly recognisable at small scale. */}
                        <g className="fig">
                          {/* Sandals sit below the hem; the robe is drawn over
                              them, so a lifted heel reads as the sliver of foot
                              appearing and closing again. */}
                          <g className="footA">
                            <path d="M40 274h18v22q0 4-4 4h-10q-4 0-4-4z" fill="#2A2723" />
                          </g>
                          <g className="footB">
                            <path d="M62 274h18v22q0 4-4 4h-10q-4 0-4-4z" fill="#1E1B18" />
                          </g>

                          {/* Proportions come from the scale the geometry already
                              fixes: 300 units is a 1.73 m man, so one unit is
                              ~5.8 mm and a 40 cm shoulder breadth is ~74 units,
                              a kandura hem ~96. Drawn narrower than that he reads
                              as a bowling pin rather than a person. */}
                          <g className="hem">
                            <path
                              className="robe"
                              d="M23 78C20 130 16 208 12 282L108 282C104 208 100 130 97 78C88 62 32 62 23 78Z"
                              fill="url(#tsClothH)"
                            />
                            <path
                              d="M23 78C20 130 16 208 12 282L108 282C104 208 100 130 97 78C88 62 32 62 23 78Z"
                              fill="url(#tsClothV)"
                            />
                            <path d="M53 84L47 280L73 280L67 84Z" fill="url(#tsCentre)" />
                            {/* Sleeve seams: in rear view the arms are inside the
                                kandura, so they read only as where the sleeve
                                meets the body. */}
                            <g
                              fill="none"
                              stroke="#9C947F"
                              strokeOpacity="0.34"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M29 92C27 124 26 158 26 190" />
                              <path d="M91 92C93 124 94 158 94 190" />
                            </g>
                            <g
                              fill="none"
                              stroke="#A79F91"
                              strokeOpacity="0.5"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            >
                              <path d="M34 98C31 152 26 222 22 279" />
                              <path d="M48 95C46 154 43 225 40 281" />
                              <path d="M72 95C74 154 77 225 80 281" />
                              <path d="M86 98C89 152 94 222 98 279" />
                            </g>
                          </g>

                          {/* A broad drape from crown to mid-back: narrow at the
                              crown, spreading to just inside the shoulder line by
                              shoulder height so the silhouette steps out there
                              instead of reading as one continuous column. */}
                          <g className="ghutra">
                            <path
                              d="M60 11C47 11 41 21 40 34C39 46 39 54 39 62C36 76 31 90 30 106C29 122 30 137 32 147C40 153 50 156 60 156C70 156 80 153 88 147C90 137 91 122 90 106C89 90 84 76 81 62C81 54 81 46 80 34C79 21 73 11 60 11Z"
                              fill="url(#tsGhutraG)"
                            />
                            <g fill="none" stroke="#100E0B" strokeLinecap="round">
                              <path d="M40.5 31C48 25 72 25 79.5 31" strokeWidth="4.6" />
                              <path d="M40 41C48 35.5 72 35.5 80 41" strokeWidth="4" />
                            </g>
                          </g>
                        </g>

                        {/* Rim light. Outside .fig so the interior glow that is
                            dimming him does not dim his own back-lit edge. */}
                        <g className="rim" fill="none" stroke="#EAF6F8" strokeLinejoin="round">
                          <g className="hem">
                            <path
                              d="M23 78C20 130 16 208 12 282L108 282C104 208 100 130 97 78C88 62 32 62 23 78Z"
                              strokeWidth="3"
                            />
                          </g>
                          <g className="ghutra">
                            <path
                              d="M60 11C47 11 41 21 40 34C39 46 39 54 39 62C36 76 31 90 30 106C29 122 30 137 32 147C40 153 50 156 60 156C70 156 80 153 88 147C90 137 91 122 90 106C89 90 84 76 81 62C81 54 81 46 80 34C79 21 73 11 60 11Z"
                              strokeWidth="2.6"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Light. Outside the 3D context so none of it can flatten the
                world, but pinned to the same scaled stage frame so it stays
                registered with the doorway at any viewport size. ---- */}
        <div className="lightStage">
          <div className="cone" />
          <div className="rays" />
          <div className="flood" />
        </div>
        <div className="wash" />

        <div className="vignette" />
        <div className="grain" />
      </div>

      <button id="intro-skip" type="button">
        Skip intro
      </button>
    </>
  );
}
