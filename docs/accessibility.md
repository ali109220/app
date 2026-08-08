# Tayseer Accessibility & UX Baseline

## Target

The public Tayseer website targets WCAG 2.2 Level AA. Automated Lighthouse/axe checks are part of validation, but manual keyboard, screen-reader, zoom, motion and responsive checks are required before release.

## Keyboard behavior

- A visible-on-focus skip link moves focus to `#main-content`.
- Desktop navigation is fully keyboard reachable.
- The Solutions submenu opens on focus and supports Arrow Down, Arrow Up, Home, End and Escape.
- Escape closes the submenu and returns focus to the Solutions trigger.
- Mobile navigation traps focus while open, closes with Escape, and returns focus to the menu button.
- All interactive controls use a consistent `:focus-visible` indicator.

## Landmarks and semantics

- One `header`, primary `nav`, `main` and `footer` landmark are used per page shell.
- Breadcrumbs are semantic navigation links.
- Decorative SVGs/icons are hidden from assistive technology where they do not convey content.
- Marquee content has a static screen-reader equivalent.
- Animated counters expose their final value as the accessible name.

## Forms

Homepage contact, shared contact, Connect and Careers forms provide explicit labels, autocomplete hints, suitable input modes, required-state semantics and live submission status. Submit controls expose disabled/loading states to prevent duplicate submissions. Careers file upload remains keyboard focusable and labelled.

## Motion

`prefers-reduced-motion: reduce` disables Lenis smooth scrolling, CSS entrance animations, marquee movement, reveal transitions and animated counting. The shared motion primitives also react if the operating-system preference changes while the page is open.

## Responsive and touch UX

- Primary touch controls target a minimum height/width of 44 CSS pixels.
- Mobile navigation is vertically scrollable when viewport height is constrained.
- Inputs/selects/textareas use a minimum 16px font size below 640px to avoid unwanted mobile browser zoom.
- Content uses overflow-safe wrapping and should be checked at 320, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 CSS-pixel viewport widths.
- Manual zoom validation is required at 200%.

## Release validation matrix

Before release, validate current Chrome, Edge, Firefox and Safari where available. Cover desktop plus representative mobile emulation/device testing. Confirm:

1. Tab and Shift+Tab follow the visual reading order.
2. No hidden or off-screen element receives focus.
3. Menus can be opened, navigated and dismissed without a pointer.
4. Focus remains visible in normal and forced-colors/high-contrast modes.
5. Every form can be completed using keyboard only and errors remain understandable.
6. 200% zoom does not clip text, controls or navigation.
7. Reduced-motion mode removes non-essential movement.
8. 320px-wide layouts do not create horizontal scrolling for page content.
9. 404 and application-error states provide clear recovery paths.
10. Lighthouse Accessibility is run on Home, Connect, Careers, Solutions and at least one Blog article.

## Current automated baseline

The clean Lighthouse run captured during Phase 4/5 validation reported 100 Accessibility, 100 Best Practices and 100 SEO on the homepage. Performance is intentionally tracked separately and will be revisited during the final optimization pass.
