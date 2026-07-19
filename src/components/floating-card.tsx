import type { LucideIcon } from "lucide-react";

type FloatingCardProps = {
  /** Optional Lucide icon shown in a tinted chip on the left. */
  icon?: LucideIcon;
  /** Optional emoji shown instead of / alongside the icon. */
  emoji?: string;
  /** Tailwind classes for the icon chip (bg + text color), e.g. "bg-rose-50 text-rose-500". */
  iconClassName?: string;
  title: string;
  subtitle?: string;
  /** Absolute-position + float-animation classes applied to the outer wrapper. */
  className?: string;
};

/**
 * Small frosted-glass "notification" card used as a decorative floating flourish
 * around the hero phone and over the largest bento cards (Flighty-style).
 * Purely decorative — always aria-hidden.
 */
export function FloatingCard({
  icon: Icon,
  emoji,
  iconClassName = "bg-rose-50 text-rose-500",
  title,
  subtitle,
  className = "",
}: FloatingCardProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
    >
      <div className="flex items-center gap-2.5 rounded-2xl border border-white/60 bg-white/70 px-3.5 py-2.5 shadow-lg shadow-slate-900/5 backdrop-blur-md">
        {(Icon || emoji) && (
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base ${iconClassName}`}
          >
            {emoji ? <span>{emoji}</span> : Icon ? <Icon className="h-4 w-4" /> : null}
          </div>
        )}
        <div className="min-w-0">
          <div className="whitespace-nowrap text-xs font-bold text-slate-800">
            {title}
          </div>
          {subtitle ? (
            <div className="whitespace-nowrap text-[10px] text-slate-400">
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
