import type { CSSProperties } from "react";
import { getArticleArt } from "@/lib/article-art";

/** Plain SVG primitives also render in Next.js social cards. No image requests. */
export function AbstractPattern({ seed, className, style }: { seed: string; className?: string; style?: CSSProperties }) {
  const { ink, accent, soft, background, variant } = getArticleArt(seed);
  return (
    <svg viewBox="0 0 640 420" fill="none" aria-hidden="true" focusable="false" className={className} style={style}>
      {variant === 0 && <g>
        <path d="M260 470V170a130 130 0 0 1 260 0v300h-85V170a45 45 0 0 0-90 0v300Z" fill={ink} />
        <path d="M135-60v310a130 130 0 0 0 260 0V-60h-85v310a45 45 0 0 1-90 0V-60Z" fill={accent} />
        <circle cx="560" cy="325" r="42" fill={soft} />
      </g>}
      {variant === 1 && <g>
        <circle cx="390" cy="190" r="186" fill={ink} />
        <circle cx="390" cy="190" r="106" fill={background} />
        <path d="M110 460V252a100 100 0 0 1 200 0v208h-68V252a32 32 0 0 0-64 0v208Z" fill={accent} />
        <circle cx="390" cy="190" r="42" fill={soft} />
        <circle cx="594" cy="380" r="55" fill={accent} />
      </g>}
      {variant === 2 && <g>
        <path d="M240 30h170v170H240a85 85 0 0 1 0-170Z" fill={accent} />
        <path d="M425 30h170v170H425a85 85 0 0 0 0-170Z" fill={ink} />
        <path d="M155 215h170v170H155a85 85 0 0 1 0-170Z" fill={ink} />
        <path d="M340 215h170v170H340a85 85 0 0 0 0-170Z" fill={soft} />
        <circle cx="555" cy="300" r="40" fill={accent} />
      </g>}
      {variant === 3 && <g transform="rotate(-24 360 210)">
        <rect x="120" y="-65" width="155" height="460" rx="77.5" fill={accent} />
        <rect x="298" y="85" width="155" height="460" rx="77.5" fill={ink} />
        <rect x="476" y="-160" width="155" height="460" rx="77.5" fill={soft} />
        <circle cx="375" cy="164" r="34" fill={background} />
      </g>}
    </svg>
  );
}
