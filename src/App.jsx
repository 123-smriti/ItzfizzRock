import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import useSmoothScroll from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f7fc]">
      <ScrollProgress />
      <Hero />
    </main>
  );
}
