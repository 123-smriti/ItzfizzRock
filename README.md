ITZFIZZ — Scroll-Driven Rocket Landing Page

A single-page, scroll-driven hero for a digital marketing agency. As you scroll, a rocket loops around four key stats, grows and flies off the screen, the WELCOME ITZFIZZ headline types in, and a small rocket sweeps across the page revealing each stat as it passes. The whole story is pinned and scrubbed to the scroll position.

Fully responsive: desktop shows the stats in one row, mobile shows a 2×2 grid with the rocket sweeping once per row.

Features
Pinned, scrubbed GSAP timeline (about 25 timeline units, ~11,500px of scroll on desktop)
Rocket intro: rises on load, loops through the four corners, straightens, scales up and exits
Letter-by-letter headline reveal with a per-letter gradient on "ITZFIZZ"
Stat cards that appear exactly when the rocket flies over them (timing is computed from each card's real position)
Smooth scrolling via Lenis, driven by GSAP's ticker
Pastel gradient background blobs, no blur filters (cheap to render)
Original inline SVG rocket with a flickering CSS flame
prefers-reduced-motion support: no pinning or scrubbing, everything shown as a static page
Tech Stack
	
UI	           |React 18
Build	         |Vite 5
Styling	       |Tailwind CSS 4
Animation	     |GSAP + ScrollTrigger
Smooth scroll  |Lenis



How the Animation Works

useScrollAnimation.js builds one GSAP timeline and pins the hero (h-svh) while it plays. Breakpoints are handled with gsap.matchMedia():

Load: only the upright rocket fades and rises in.
Loop: on scroll, the rocket flies top-left → top-right → bottom-right → bottom-left. Each corner stat appears as the rocket arrives.
Launch: the rocket returns to centre, straightens, scales up and flies up off-screen.
Headline: the letters of "WELCOME ITZFIZZ" reveal one by one, then the tagline.
Sweep: a small rocket flies in from the left. Each stat card pops in as the rocket passes its centre. On mobile the rocket sweeps once per row of cards.
Close: a small upright rocket rises from the bottom and rests under the stats.

Elements that GSAP reveals carry the .anim-hide class (opacity: 0) so that a resize or reverted state never shows everything stacked at once.
