import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const bar = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bar.current, { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div aria-hidden="true" className="fixed right-5 top-1/2 z-40 hidden h-32 w-px -translate-y-1/2 bg-black/10 md:block">
      <div ref={bar} className="h-full w-full origin-top bg-indigo-500" />
    </div>
  );
}
