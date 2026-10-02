import StatCard from "./StatCard";
import { stats } from "../data/stats";


const spots = [
  "left-4 top-[12vh] md:left-[12%] md:top-[22vh]",
  "right-4 top-[12vh] md:right-[12%] md:top-[22vh]",
  "right-4 bottom-[7vh] md:right-[12%] md:bottom-[17vh]",
  "left-4 bottom-[7vh] md:left-[12%] md:bottom-[17vh]",
];

export default function ImpactStats({ statsRef }) {
  return (
    <div aria-hidden="true" className="rm-hide pointer-events-none absolute inset-0 z-10">
      {stats.map((s, i) => (
        <div key={s.title} className={`absolute w-[42%] md:w-52 ${spots[i]}`}>
          <StatCard {...s} innerRef={(el) => (statsRef.current[i] = el)} />
        </div>
      ))}
    </div>
  );
}
