import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// Mobile browsers resize the viewport when the address bar hides; don't rebuild the pinned timeline for that.
ScrollTrigger.config({ ignoreMobileResize: true });

const T = 1.5; // timeline time between one corner and the next
const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]]; // TL, TR, BR, BL (matches ImpactStats)
const headings = [-58, 88, 172, 262]; // clockwise degrees: nose along the direction of travel

export default function useScrollAnimation({ heroRef, introRef, bigRef, introStatsRef, finalStatsRef, sweepRef, riseRef }) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const { reduce, desktop } = ctx.conditions;
        const root = heroRef.current;
        const sub = root.querySelector("[data-sub]");
        const topBits = root.querySelectorAll("[data-top]");
        const chars = root.querySelectorAll("[data-char]");
        const introStats = introStatsRef.current;
        const finalStats = finalStatsRef.current;

        // Reduced motion: no pin, no scrub. Final composition as a readable static page.
        if (reduce) {
          gsap.to([sub, ...topBits], { opacity: 1, duration: 0.6 });
          return;
        }

        // ---------- Page load: only the upright rocket ----------
        gsap.set(chars, { opacity: 0, y: 24 });
        gsap.set(sweepRef.current, { rotation: 90, opacity: 1 }); // nose points right
        gsap.fromTo(introRef.current, { opacity: 0, scale: 0.75, y: 100 }, { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: "power3.out", delay: 0.3 });

        // ---------- Scroll: one slow, pinned, scrubbed story ----------
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: desktop ? "+=11500" : "+=8200",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        const big = bigRef.current;
        const W = () => window.innerWidth;
        const H = () => window.innerHeight;

        // Brand mark and hint appear as soon as scrolling starts
        tl.fromTo(topBits, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);

        // 1) The rocket loops TL -> TR -> BR -> BL; each stat appears when the rocket gets there.
        const spot = (i) => {
          const [sx, sy] = corners[i];
          const dx = (desktop ? (sx < 0 ? 0.22 : 0.21) : 0.22) * W();
          const dy = sy < 0 ? -(desktop ? 0.16 : 0.14) * H() : (desktop ? 0.23 : 0.14) * H();
          return { x: sx * dx, y: dy };
        };
        introStats.forEach((el, i) => {
          const t = 0.2 + i * T;
          tl.to(big, { x: () => spot(i).x, y: () => spot(i).y, rotation: headings[i], duration: 1.4, ease: "sine.inOut" }, t)
            .fromTo(el, { opacity: 0, x: corners[i][0] * 60, scale: 0.92 }, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power2.out" }, t + 0.7);
        });

        // 2) Back to centre and upright, stats fade, rocket grows, then flies straight up and away.
        const backAt = 0.2 + 4 * T;
        tl.to(big, { x: 0, y: 0, rotation: 360, duration: 1.6, ease: "sine.inOut" }, backAt)
          .to(introStats, { opacity: 0, scale: 0.95, duration: 1.2, stagger: 0.1 }, backAt + 1.4)
          .to(big, { scale: desktop ? 2.2 : 2.4, duration: 1.6, ease: "power2.inOut" }, backAt + 1.6)
          .to(big, { y: "-115vh", duration: 1.6, ease: "power2.in" }, backAt + 3.6);

        // 3) Headline appears letter by letter, then the tagline.
        const revealAt = backAt + 5.4;
        tl.fromTo(chars, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 }, revealAt)
          .fromTo(sub, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, revealAt + 1.8);

        // 4) A small rocket sweeps left -> right under the tagline; each stat appears as it passes.
        const sweepAt = revealAt + 3;
        const D = 8; // slower sweep
        const sweep = sweepRef.current;
        const edge = () => W() / 2 + 100;
        const showStat = (el, at) =>
          tl.fromTo(el, { opacity: 0, y: 16, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" }, at);

        // Each card pops in exactly when the rocket flies over its centre.
        const grid = sweep.parentElement;
        const cx = (el) => el.offsetLeft + el.offsetWidth / 2 - grid.offsetWidth / 2; // card centre relative to the rocket's x=0
        const frac = (el) => Math.min(Math.max((cx(el) + edge()) / (2 * edge()), 0), 1); // 0..1 along the sweep

        if (desktop) {
          tl.fromTo(sweep, { x: () => -edge() }, { x: () => edge(), duration: D }, sweepAt);
          finalStats.forEach((el) => showStat(el, sweepAt + D * frac(el) - 0.2));
        } else {
          // Mobile: stats sit in two rows of two, so the rocket flies left -> right once per row, at that row's height.
          const rowY = (row) => () => ((row === 0 ? 0.25 : 0.75) - 0.5) * grid.getBoundingClientRect().height;
          const half = D / 2;
          [0, 1].forEach((row) => {
            const start = sweepAt + row * (half + 0.2);
            tl.fromTo(sweep, { x: () => -edge(), y: rowY(row) }, { x: () => edge(), y: rowY(row), duration: half }, start);
            [finalStats[row * 2], finalStats[row * 2 + 1]].forEach((el) => showStat(el, start + half * frac(el) - 0.15));
          });
        }

        // 5) Closing frame: a small upright rocket rises from the bottom and stays under the stats.
        const riseAt = sweepAt + D + 0.3;
        tl.fromTo(riseRef.current, { opacity: 0, y: 160 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, riseAt)
          .to({}, { duration: 0.8 }); // hold on the final frame
      },
      heroRef
    );

    return () => mm.revert();
  }, []);
}
