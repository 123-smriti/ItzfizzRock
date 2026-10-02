# ITZFIZZ — Scroll-Driven Rocket Landing Page

A single-page, scroll-driven hero for a digital marketing agency. As you scroll, a rocket loops around four key stats, grows and flies off the screen, the **WELCOME ITZFIZZ** headline types in, and a small rocket sweeps across the page revealing each stat as it passes. The whole story is pinned and scrubbed to the scroll position.


## Tech Stack

| UI            | React 18 |
| Build         | Vite 5 |
| Styling       | Tailwind CSS 4 |
| Animation     | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |


## How the Animation Works

1. **Load:** only the upright rocket fades and rises in.
2. **Loop:** on scroll, the rocket flies top-left → top-right → bottom-right → bottom-left. Each corner stat appears as the rocket arrives.
3. **Launch:** the rocket returns to centre, straightens, scales up and flies up off-screen.
4. **Headline:** the letters of "WELCOME ITZFIZZ" reveal one by one, then the tagline.
5. **Sweep:** a small rocket flies in from the left. Each stat card pops in as the rocket passes its centre. On mobile the rocket sweeps once per row of cards.
6. **Close:** a small upright rocket rises from the bottom and rests under the stats.


Live URL:- https://123-smriti.github.io/ItzfizzRock/







