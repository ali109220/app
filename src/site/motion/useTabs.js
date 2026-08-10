"use client";

import { useRef } from "react";

/**
 * ARIA tab semantics and keyboard navigation for the site's selectors.
 *
 * Every selector on the site is the same shape — a row or column of options and
 * ONE panel that changes — so they share one implementation rather than each
 * hand-rolling `role="tab"` and getting a different half of it right. Before
 * this hook the three existing selectors declared `role="tab"` with no
 * `tabpanel`, no `aria-controls` and no arrow-key handling, which is a worse
 * experience for a screen-reader user than plain buttons would have been.
 *
 * Selection follows focus (automatic activation). That is the APG's default for
 * panels that are cheap to swap, and it is the behaviour the interaction layer
 * wants anyway: arrowing along the options should make the site respond, not
 * make the visitor press Enter to find out what an option does.
 *
 * Both arrow axes move the selection regardless of `orientation`. The
 * horizontal selectors all stack vertically at small widths, so binding only
 * one axis would leave the arrangement on screen and the keys that drive it
 * disagreeing.
 *
 * `value` may be absent from `items` — that is the "nothing selected yet" state
 * the architecture diagrams start in. No option is `aria-selected`, and the
 * first one holds the roving tabindex so the group is still reachable by Tab.
 *
 * @param id           prefix for the generated element ids; must be unique per page
 * @param items        option ids, in DOM order. Used verbatim in element ids,
 *                     so they must be attribute-safe (slugs, not labels).
 * @param value        the selected option id, or null/undefined for none
 * @param onChange     called with the newly selected option id
 * @param orientation  reported as aria-orientation; does not restrict the keys
 */
export function useTabs({ id, items, value, onChange, orientation = "horizontal" }) {
  // Populated by the tab elements' own ref callbacks, so moving focus after an
  // arrow key does not need a query selector or a layout read.
  const nodes = useRef(new Map());

  const selectedIndex = items.indexOf(value);
  // Which option is Tab-reachable. With no selection that is simply the first.
  const focusIndex = selectedIndex === -1 ? 0 : selectedIndex;

  const moveTo = (index) => {
    const next = items[(index + items.length) % items.length];
    if (next === undefined) return;
    onChange(next);
    // The option elements are not re-created by a selection change — only their
    // attributes change — so the node is already in the map and focusable now.
    nodes.current.get(next)?.focus();
  };

  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (step) {
      event.preventDefault();
      moveTo(focusIndex + step);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      moveTo(items.length - 1);
    }
  };

  const tabId = (item) => `${id}-tab-${item}`;
  const panelId = `${id}-panel`;

  return {
    tablistProps: { role: "tablist", "aria-orientation": orientation },

    getTabProps: (item) => ({
      type: "button",
      role: "tab",
      id: tabId(item),
      "aria-selected": item === value,
      "aria-controls": panelId,
      tabIndex: items.indexOf(item) === focusIndex ? 0 : -1,
      // Block body, so nothing is returned: React 19 reads a returned value from
      // a ref callback as a cleanup function.
      ref: (node) => {
        if (node) nodes.current.set(item, node);
        else nodes.current.delete(item);
      },
      onClick: () => onChange(item),
      onKeyDown,
    }),

    /**
     * The single panel every option points at. Spread it onto whatever element
     * actually changes. Add `tabIndex={0}` yourself if that element contains no
     * focusable descendant of its own.
     */
    panelProps: {
      id: panelId,
      role: "tabpanel",
      "aria-labelledby": tabId(items[focusIndex]),
    },
  };
}

export default useTabs;
