export default function StatCard({ value, title,description, color, innerRef, className = "" }) {
  const pct = parseInt(value, 10) / 100;
  return (
    <article
      ref={innerRef}
      className={`anim-hide relative rounded-2xl border bg-white/60 px-3 pb-5 pt-5 text-center md:px-5 md:pb-5 md:pt-5 shadow-[0_10px_30px_rgba(99,102,241,.10)] backdrop-blur-sm ${className}`}
      style={{ borderColor: color.border }}
    >
      <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full" style={{ background: color.bar }} />
      <p className="text-4xl font-extrabold" style={{ color: color.text }}>{value}</p>
      <h3 className="mt-1 text-[13px] font-medium text-slate-500 md:text-sm">{title}</h3>
      <p className="mt-1 text-[13px] font-medium text-slate-300 md:text-sm">{description}</p>
      <div className="mt-3 h-1 overflow-hidden md:mt-4 rounded-full bg-black/[0.06]">
        <div className="h-full origin-left rounded-full" style={{ background: color.bar, transform: `scaleX(${pct})` }} />
      </div>
    </article>
  );
}
