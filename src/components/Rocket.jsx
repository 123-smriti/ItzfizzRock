import { useId } from "react";

export default function Rocket({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 120 240" className={`w-auto ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#12142b" /><stop offset=".45" stopColor="#262b52" /><stop offset="1" stopColor="#12142b" />
        </linearGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" /><stop offset=".5" stopColor="#fb923c" /><stop offset="1" stopColor="#fb923c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="flame">
        <path d="M46 164 C50 190 57 208 60 230 C63 208 70 190 74 164 Z" fill={`url(#${id}f)`} />
      </g>
      <path d="M32 112 C20 138 12 160 8 182 L36 170 Z" fill="#12142b" />
      <path d="M88 112 C100 138 108 160 112 182 L84 170 Z" fill="#12142b" />
      <path d="M60 14 C90 48 94 108 94 154 L26 154 C26 108 30 48 60 14 Z" fill={`url(#${id}b)`} />
      <path d="M60 14 C72 30 80 52 83 76 L37 76 C40 52 48 30 60 14 Z" fill="#ef5b5b" />
      <rect x="38" y="152" width="44" height="14" rx="4" fill="#0d0f22" />
      <circle cx="60" cy="102" r="19" fill="#fff" />
      <circle cx="60" cy="102" r="13" fill="#6d83e8" />
      <rect x="57" y="126" width="6" height="24" rx="3" fill="#fff" fillOpacity=".3" />
    </svg>
  );
}
