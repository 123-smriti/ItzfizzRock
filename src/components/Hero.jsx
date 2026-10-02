import { useRef } from "react";
import Rocket from "./Rocket";
import ImpactStats from "./ImpactStats";
import StatCard from "./StatCard";
import BackgroundEffects from "./BackgroundEffects";
import { stats } from "../data/stats";
import useScrollAnimation from "../hooks/useScrollAnimation";

// Per-letter colours for ITZFIZZ (indigo -> violet -> magenta -> pink -> violet)
const gradient = ["#6366f1", "#7c5cf0", "#9a58ee", "#b653e0", "#d24fbf", "#e5489d", "#a855f0"];

export default function Hero() {
  const refs = {
    heroRef: useRef(null),
    introRef: useRef(null), // load: rocket rises in
    bigRef: useRef(null), // scroll: loop around the stats, straighten, grow, fly up
    introStatsRef: useRef([]),
    finalStatsRef: useRef([]),
    sweepRef: useRef(null), // small rocket sweeping left -> right under the headline
    riseRef: useRef(null), // small rocket rising from the bottom at the very end
  };
  useScrollAnimation(refs);

  const letters = (word, colors) =>
    word.split("").map((c, i) => (
      <span key={i} data-char className="anim-hide inline-block" style={colors ? { color: colors[i % colors.length] } : undefined}>{c}</span>
    ));

  return (
    <section id="top" ref={refs.heroRef} className="relative h-svh w-full overflow-hidden bg-[#f7f7fc] text-[#161a33]">
      <BackgroundEffects />

      {/* Brand mark and hint: appear when scrolling starts */}
      <span data-top className="anim-hide absolute left-5 top-[3vh] z-30 text-sm font-extrabold tracking-wide opacity-0 md:left-10 md:text-base">ITZFIZZ</span>
      <span data-top aria-hidden="true" className="anim-hide rm-hide absolute right-5 top-[3vh] z-30 text-[11px] text-slate-500 opacity-0 md:right-10 md:text-xs">Scroll to launch ↓</span>

      {/* Final composition: headline, tagline, then the stats row (revealed last, one by one) */}
      <div className="rm-static absolute inset-x-0 top-[16vh] md:top-[18vh] z-10 flex flex-col items-center px-4 text-center">
        <div>
          <h1 aria-label="WELCOME ITZFIZZ" className="text-[clamp(2.4rem,14vw,4.5rem)] font-extrabold leading-[1.05] tracking-[0.01em] md:text-[clamp(3rem,7vw,8rem)]">
            <span aria-hidden="true" className="block md:mr-[0.3em] md:inline-block">{letters("WELCOME")}</span>
            <span aria-hidden="true" className="block md:inline-block">{letters("ITZFIZZ", gradient)}</span>
          </h1>
          <p data-sub className="mx-auto mt-5 max-w-md text-base text-slate-500 opacity-0 md:max-w-xl md:text-xl">
            India's fastest-growing digital marketing and growth agency
          </p>
        </div>

        <div className="relative mt-[5vh] w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {stats.map((s, i) => (
              <StatCard key={s.title} {...s} innerRef={(el) => (refs.finalStatsRef.current[i] = el)} />
            ))}
          </div>
          <div ref={refs.sweepRef} aria-hidden="true" className="anim-hide rm-hide pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <Rocket className="h-[clamp(80px,13vh,140px)]" />
          </div>
          <div ref={refs.riseRef} aria-hidden="true" className="anim-hide rm-hide pointer-events-none absolute left-1/2 top-full z-20 mt-[4vh] -translate-x-1/2">
            <Rocket className="h-[clamp(100px,15vh,160px)]" />
          </div>
        </div>
      </div>

      <ImpactStats statsRef={refs.introStatsRef} />

      {/* Big rocket: upright at first, loops around the four stats, straightens, grows, then flies up and away */}
      <div className="rm-hide pointer-events-none absolute inset-0 z-20 grid place-items-center">
        <div ref={refs.introRef} className="anim-hide">
          <div ref={refs.bigRef}>
            <Rocket className="h-[20vh] md:h-[min(34vh,320px)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
