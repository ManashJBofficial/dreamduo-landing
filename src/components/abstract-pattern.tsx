import type { CSSProperties } from "react";
import { getArticleArt } from "@/lib/article-art";

const heart = "M0 26C-25-10-73-3-73 37C-73 66-33 91 0 119C33 91 73 66 73 37C73-3 25-10 0 26Z";

/** Eight love-inspired vector compositions shared by pages and social cards. */
export function AbstractPattern({ seed, className, style, contained = false }: { seed: string; className?: string; style?: CSSProperties; contained?: boolean }) {
  const { ink, accent, soft, background, variant, topic } = getArticleArt(seed);
  if (topic !== "general") return (
    <svg viewBox={contained ? "292 40 348 360" : "0 0 640 420"} fill="none" aria-hidden="true" focusable="false" className={className} style={style}>
      {topic === "gifting" && <g>
        <rect x="320" y="178" width="280" height="166" rx="22" fill={soft} />
        <rect x="310" y="142" width="300" height="56" rx="12" fill={ink} />
        <rect x="444" y="142" width="32" height="202" fill={accent} />
        <path d="M460 142C410 142 348 126 364 86C380 56 426 92 460 142Z" fill={accent} />
        <path d="M460 142C510 142 578 126 562 86C546 56 494 92 460 142Z" fill={accent} />
        <rect x="350" y="220" width="64" height="78" rx="10" fill={background} transform="rotate(-8 382 259)" />
        <path d={heart} transform="translate(382 237) scale(.25)" fill={accent} />
      </g>}
      {topic === "questions" && <g>
        <path d="M352 70H550Q590 70 590 110V212Q590 252 550 252H462L414 292V252H352Q312 252 312 212V110Q312 70 352 70Z" fill={ink} />
        <path d="M416 208H586Q620 208 620 242V319Q620 353 586 353H562V382L517 353H416Q382 353 382 319V242Q382 208 416 208Z" fill={accent} />
        {[390, 445, 500].map(x => <circle key={x} cx={x} cy="160" r="11" fill={background} />)}
        <path d={heart} transform="translate(503 245) scale(.65)" fill={background} />
      </g>}
      {topic === "journey" && <g>
        <path d="M354 371V282Q354 237 418 237H508Q573 237 573 180V124Q573 68 520 68H370" stroke={soft} strokeWidth="30" strokeLinecap="round" />
        <path d="M354 371V282Q354 237 418 237H508Q573 237 573 180V124Q573 68 520 68H370" stroke={ink} strokeWidth="4" strokeDasharray="2 14" strokeLinecap="round" />
        {[{ x:354,y:337 },{ x:489,y:237 },{ x:416,y:68 }].map(({x,y},i) => <g key={i}><circle cx={x} cy={y} r="27" fill={i===2 ? ink : accent} /><path d={`M${x-11} ${y}l8 8 15-17`} stroke={background} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></g>)}
      </g>}
      {topic === "comparison" && <g>
        {[0,1,2,3,4].map(i => <g key={i} transform={`translate(${315+i*57} ${90+(i%2)*30})`}>
          <rect width="48" height="234" rx="15" fill={i===0 ? ink : i%2 ? accent : soft} />
          <rect x="10" y="20" width="28" height="28" rx="8" fill={background} />
          {[75,112,149,186].map(y => <path key={y} d={`M14 ${y}h20`} stroke={background} strokeWidth="5" strokeLinecap="round" />)}
        </g>)}
      </g>}
      {topic === "progress" && <g>
        {[{y:90,w:145},{y:186,w:205},{y:282,w:265}].map(({y,w},i) => <g key={y}>
          <rect x="315" y={y} width="275" height="56" rx="28" fill={soft} />
          <rect x="315" y={y} width={w} height="56" rx="28" fill={i===2 ? ink : accent} />
          <circle cx={315+w-28} cy={y+28} r="18" fill={background} />
          <path d={`M${315+w-36} ${y+28}l6 6 11-12`} stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>)}
      </g>}
    </svg>
  );
  return (
    <svg viewBox={contained ? "0 -240 820 900" : "0 0 640 420"} fill="none" aria-hidden="true" focusable="false" className={className} style={style}>
      {variant === 0 && <g>
        <path d={heart} transform="translate(440 -8) rotate(-12) scale(3.1)" fill={ink} />
        <path d="M210 267C265 176 342 166 422 220C496 270 568 286 666 238V470H210Z" fill={accent} />
        <path d="M320 347C405 286 514 358 648 305V450H320Z" fill={soft} />
      </g>}
      {variant === 1 && <g>
        <path d={heart} transform="translate(320 -105) rotate(16) scale(2.45)" fill={soft} />
        <path d={heart} transform="translate(544 28) rotate(-22) scale(2.3)" fill={ink} />
        <path d={heart} transform="translate(354 184) rotate(15) scale(2.35)" fill={accent} />
        <path d={heart} transform="translate(599 302) rotate(-24) scale(1.8)" fill={soft} />
      </g>}
      {variant === 2 && <g>
        <path d="M264 102C148 102 143 302 269 302C389 302 405 102 525 102C645 102 650 302 530 302C410 302 385 102 264 102Z" stroke={soft} strokeWidth="76" />
        <path d="M264 102C384 102 410 302 530 302C650 302 645 102 525 102" stroke={ink} strokeWidth="76" />
        <path d="M264 102C148 102 143 302 269 302C326 302 366 255 396 201" stroke={accent} strokeWidth="76" />
      </g>}
      {variant === 3 && <g>
        <path d={heart} transform="translate(450 -82) rotate(12) scale(4)" fill={ink} />
        <path d={heart} transform="translate(434 -7) rotate(12) scale(2.85)" fill={accent} />
        <path d={heart} transform="translate(414 68) rotate(12) scale(1.75)" fill={background} />
        <path d={heart} transform="translate(574 306) rotate(-18) scale(1.6)" fill={soft} />
      </g>}
      {variant === 4 && <g>
        <path d="M273-80C457 72 128 163 310 324C369 376 396 392 402 493" stroke={soft} strokeWidth="142" />
        <path d="M473-70C639 100 296 172 472 329C525 376 550 409 553 488" stroke={ink} strokeWidth="106" />
        <path d="M457-72C622 98 279 170 455 327C508 374 533 407 536 486" stroke={accent} strokeWidth="54" />
      </g>}
      {variant === 5 && <g>
        <path d={heart} transform="translate(429 27) rotate(-20) scale(3)" fill={accent} />
        <path d="M441 57C461 15 528 7 556 49C598 116 533 164 485 244L390 396L327 345Z" fill={ink} />
        <path d="M325 345L390 396L485 244L458 269Z" fill={soft} />
      </g>}
      {variant === 6 && <g>
        {Array.from({ length: 8 }, (_, index) => {
          const angle = index * Math.PI / 4;
          return <circle key={index} cx={430 + Math.cos(angle) * 104} cy={205 + Math.sin(angle) * 104} r="85" fill={index % 2 ? accent : soft} />;
        })}
        <circle cx="430" cy="205" r="112" fill={ink} />
        <path d={heart} transform="translate(430 147) scale(.95)" fill={background} />
      </g>}
      {variant === 7 && <g>
        <ellipse cx="434" cy="201" rx="215" ry="145" transform="rotate(-33 434 201)" stroke={soft} strokeWidth="42" />
        <ellipse cx="434" cy="201" rx="215" ry="145" transform="rotate(33 434 201)" stroke={accent} strokeWidth="24" />
        <path d={heart} transform="translate(434 70) rotate(-9) scale(2.05)" fill={ink} />
      </g>}
    </svg>
  );
}
