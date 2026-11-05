"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

/**
 * A plain horizontally-scrollable track plus page dots.
 *
 * The track is a default overflow scroller — no scroll-snap — so swipe,
 * trackpad, keyboard and screen-reader scrolling all behave natively. How
 * many cards fit per view is decided purely by CSS on the children
 * (`basis-full lg:basis-1/3` etc.), so the static HTML is already correct at
 * every width with no viewport check in JS.
 *
 * Page boundaries are measured from the children themselves rather than
 * computed from a breakpoint: each page starts at the first card that did not
 * fit in the previous page. That stays exact whatever the gap and card basis
 * are, which dividing clientWidth would not — with a 2rem gap, card N sits at
 * N * (width + 32px), so paging by clientWidth alone drifts one gap per page.
 *
 * The scroll listener only ever changes which dot is highlighted (a color
 * swap, no motion, no reveal) and reads nothing from the DOM — offsets are
 * measured on mount/resize only, so it cannot force a reflow.
 */
export default function Carousel({
  children,
  trackClassName,
  label,
}: {
  children: ReactNode;
  trackClassName: string;
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // Scroll offset of each page's first card.
  const [pageOffsets, setPageOffsets] = useState<number[]>([]);
  const [activePage, setActivePage] = useState(0);

  const nearestPage = useCallback((offsets: number[], scrollLeft: number) => {
    let best = 0;
    for (let i = 1; i < offsets.length; i++) {
      if (
        Math.abs(offsets[i] - scrollLeft) < Math.abs(offsets[best] - scrollLeft)
      ) {
        best = i;
      }
    }
    return best;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offsets: number[] = [];

    const measure = () => {
      const items = Array.from(track.children) as HTMLElement[];
      if (!items.length) return;

      // Measure against the content box, not the border box: the track is
      // padded (px-2), so without this page 0 would land at the padding
      // instead of 0 and nudge the whole row sideways on the first dot click.
      const style = getComputedStyle(track);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const padRight = parseFloat(style.paddingRight) || 0;
      const view = track.clientWidth - padLeft - padRight;
      if (view <= 0) return;

      const contentLeft =
        track.getBoundingClientRect().left + track.scrollLeft + padLeft;
      // Scroll offset that brings each card's left edge to the content edge.
      const lefts = items.map(
        (item) => item.getBoundingClientRect().left - contentLeft,
      );
      const rights = items.map(
        (item, i) => lefts[i] + item.getBoundingClientRect().width,
      );

      const next: number[] = [];
      let i = 0;
      while (i < items.length) {
        const start = lefts[i];
        next.push(start);
        let j = i;
        // Advance past every card that fits fully in this page (1px slack
        // absorbs sub-pixel layout rounding).
        while (j < items.length && rights[j] <= start + view + 1) j++;
        i = Math.max(j, i + 1);
      }

      offsets = next;
      setPageOffsets(next);
      setActivePage(nearestPage(next, track.scrollLeft));
    };

    const onScroll = () => {
      if (offsets.length < 2) return;
      const next = nearestPage(offsets, track.scrollLeft);
      setActivePage((current) => (current === next ? current : next));
    };

    measure();
    // ResizeObserver for sizing only — it reports the track's own box, so
    // page boundaries stay correct at any width without watching the viewport.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", onScroll);
    };
  }, [nearestPage]);

  const goTo = (page: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    track.scrollTo({
      left: pageOffsets[page] ?? 0,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div ref={trackRef} className={trackClassName}>
        {children}
      </div>

      {/* Page Dots. The visual dot stays small; a padded hit area brings the
          actual tap target to a touch-friendly size without changing how the
          dots look. */}
      {pageOffsets.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {pageOffsets.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${label} page ${i + 1}`}
              aria-current={i === activePage}
              className="relative p-2.5"
            >
              <span
                className={`block h-2 rounded-full ${
                  i === activePage ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
