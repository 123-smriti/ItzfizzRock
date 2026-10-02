// Soft pastel blobs (pink, periwinkle, peach). Radial gradients, slow CSS drift.
export default function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#f7f7fc]">
      <div className="blob absolute -left-[12%] -top-[12%] h-[75vh] w-[55vw] bg-[radial-gradient(closest-side,rgba(244,114,128,.40),transparent)]" />
      <div className="blob absolute -right-[14%] top-[15%] h-[85vh] w-[55vw] bg-[radial-gradient(closest-side,rgba(129,140,248,.36),transparent)] [animation-delay:-6s]" />
      <div className="blob absolute -bottom-[28%] left-[20%] h-[65vh] w-[50vw] bg-[radial-gradient(closest-side,rgba(251,191,134,.45),transparent)] [animation-delay:-12s]" />
    </div>
  );
}
