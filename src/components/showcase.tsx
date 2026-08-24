import {
  ArrowRight,
  Target,
  EyeOff,
  Lock,
  MessageCircleHeart,
  Bell,
  Trophy,
  Gift,
  Camera,
  Activity,
  FolderOpen,
  TrendingUp,
  BarChart3,
  Brain,
  Flame,
  Award,
  Zap,
  CheckCircle,
  Users,
  Heart,
  // Layers,
  // ArrowLeft,
  // Home,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { FloatingCard } from "@/components/floating-card";

type AccentKey =
  | "emerald"
  | "violet"
  | "rose"
  | "amber"
  | "teal"
  | "sky"
  | "indigo"
  | "orange"
  | "sunset";

/* Per-card accent classes (literal strings so Tailwind keeps them). */
const ACCENTS: Record<
  AccentKey,
  { glow: string; badge: string; chip: string; bg: string; border: string }
> = {
  emerald: { glow: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-600", chip: "text-emerald-500", bg: "from-emerald-100 via-white to-lime-50", border: "border-emerald-100" },
  violet: { glow: "bg-violet-400", badge: "bg-violet-50 text-violet-600", chip: "text-violet-500", bg: "from-violet-100 via-white to-purple-50", border: "border-violet-100" },
  rose: { glow: "bg-rose-400", badge: "bg-rose-50 text-rose-600", chip: "text-rose-500", bg: "from-rose-100 via-white to-pink-50", border: "border-rose-100" },
  amber: { glow: "bg-amber-400", badge: "bg-amber-50 text-amber-600", chip: "text-amber-500", bg: "from-amber-100 via-white to-yellow-50", border: "border-amber-100" },
  teal: { glow: "bg-teal-400", badge: "bg-teal-50 text-teal-600", chip: "text-teal-500", bg: "from-teal-100 via-white to-cyan-50", border: "border-teal-100" },
  sky: { glow: "bg-sky-400", badge: "bg-sky-50 text-sky-600", chip: "text-sky-500", bg: "from-sky-100 via-white to-indigo-50", border: "border-sky-100" },
  indigo: { glow: "bg-indigo-400", badge: "bg-indigo-50 text-indigo-600", chip: "text-indigo-500", bg: "from-indigo-100 via-white to-blue-50", border: "border-indigo-100" },
  orange: { glow: "bg-orange-400", badge: "bg-orange-50 text-orange-600", chip: "text-orange-500", bg: "from-orange-100 via-white to-red-50", border: "border-orange-100" },
  sunset: { glow: "bg-rose-400", badge: "bg-rose-50 text-rose-600", chip: "text-rose-500", bg: "from-rose-100 via-white to-amber-50", border: "border-rose-100" },
};

type FloatingChip = {
  emoji?: string;
  icon?: LucideIcon;
  iconClassName: string;
  title: string;
  subtitle: string;
  position: string;
};

interface ShowcaseItem {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  visual: React.ReactNode;
  icon: LucideIcon;
  color: AccentKey;
  /** Grid span classes for the bento layout. */
  span: string;
  /** "large"/"wide" render the full visual; "small"/"medium" render highlight chips. */
  size: "large" | "medium" | "small" | "wide";
  /** Optional decorative floating notification chip (large cards only). */
  float?: FloatingChip;
  /** Optional full-width image rendered below the card's text/infographic row. */
  image?: { src: string; alt: string };
  /** Optional full-bleed background photo — renders this card as a dark photo card instead of the light gradient style. */
  photo?: { src: string; alt: string };
}

/* ─── Visual 1: Build Together ─── */
function BuildTogetherVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-emerald-100/20 sm:rounded-3xl sm:p-7">
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-500 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-slate-700 sm:text-sm">
              Our Dreams
            </span>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-500 sm:text-xs">
            3 Active
          </span>
        </div>

        {/* Shared goals */}
        <div className="space-y-2.5 sm:space-y-3">
          <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 sm:text-sm">House Deposit</div>
              <div className="text-xs font-bold text-emerald-500 sm:text-sm">$45,200</div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-emerald-100">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 sm:text-xs">
              <span>Numeric tracking</span>
              <span>72% of $63,000</span>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-3.5 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 sm:text-sm">Wedding Planning</div>
              <div className="text-xs font-bold text-pink-500 sm:text-sm">18/24</div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-pink-100">
              <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-pink-400 to-rose-400" />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 sm:text-xs">
              <span>Task tracking</span>
              <span>75% complete</span>
            </div>
          </div>
        </div>

        {/* Private goal hint */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-dashed border-slate-200 p-3 sm:mt-4 sm:p-3.5">
          <EyeOff className="h-4 w-4 shrink-0 text-slate-300 sm:h-5 sm:w-5" />
          <div>
            <div className="text-[10px] font-bold text-slate-500 sm:text-xs">Private Dream</div>
            <div className="text-[10px] text-slate-400">Only you can see this</div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* ─── Visual 2: Daily Deck ─── */}
{/* function DailyDeckVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] sm:max-w-sm">
      ...
    </div>
  );
} */}

/* ─── Visual 3: Surprise Each Other ───
   Light frosted-glass panel that overlaps the bottom edge of the photo in
   PhotoBentoCard, so it needs its own opaque-ish surface (not fully
   transparent) to stay legible against the image behind it. */
function SurpriseVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/70 bg-white/90 p-4 shadow-md shadow-rose-100/40 backdrop-blur-md sm:rounded-3xl sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700 sm:text-sm">Japan Trip Fund</span>
        <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-rose-500 sm:text-xs">
          62%
        </span>
      </div>

      {/* Progress bar with milestones */}
      <div className="relative mt-3">
        <div className="h-2.5 rounded-full bg-rose-100">
          <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-rose-400 to-amber-400" />
        </div>
        {/* Milestone markers */}
        <div className="absolute -top-0.5 left-[25%] -translate-x-1/2">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm">
            <CheckCircle className="h-2.5 w-2.5" />
          </div>
        </div>
        <div className="absolute -top-0.5 left-[50%] -translate-x-1/2">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm">
            <CheckCircle className="h-2.5 w-2.5" />
          </div>
        </div>
        <div className="absolute -top-0.5 left-[75%] -translate-x-1/2">
          <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-amber-300 bg-white">
            <Lock className="h-2 w-2 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Unlocked milestone message */}
      <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/80 p-3 sm:p-3.5">
        <div className="flex items-center gap-2">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 sm:text-xs">
            50% Milestone Unlocked
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">
          &ldquo;Halfway to Japan! I&apos;ve been secretly saving from my lunch money. We&apos;re doing this!&rdquo;
        </p>
      </div>

      {/* Hidden contribution */}
      <div className="mt-2.5 flex items-center gap-3 rounded-xl bg-rose-50/70 p-3 sm:p-3.5">
        <EyeOff className="h-4 w-4 shrink-0 text-rose-400" />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] text-rose-400 sm:text-xs">Hidden contribution</div>
          <div className="text-sm font-bold text-rose-700 sm:text-base">+$500</div>
        </div>
        <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-[9px] font-bold text-rose-600 sm:text-[10px]">
          Reveals at 75%
        </span>
      </div>
    </div>
  );
}

/* ─── Visual 3: Stay Connected ───
   Real couple avatars (only 2 people, reused across all 3 notifications so it
   reads as one couple, not three strangers), no card borders — depth comes
   from a soft "lifted" shadow instead, like real mobile notification
   banners. */
function NotificationAvatar({
  src,
  alt,
  icon: Icon,
}: {
  src: string;
  alt: string;
  icon: LucideIcon;
}) {
  return (
    <div className="relative shrink-0">
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        loading="lazy"
        sizes="40px"
        className="h-9 w-9 rounded-full object-cover shadow-sm sm:h-10 sm:w-10"
      />
      <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 ring-2 ring-white">
        <Icon className="h-2 w-2 text-white" />
      </div>
    </div>
  );
}

function StayConnectedVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl bg-white p-5 shadow-[0_24px_48px_-16px_rgba(244,63,94,0.28)] sm:rounded-3xl sm:p-7">
        {/* Daily question */}
        <div className="mb-3.5 flex items-center gap-2 sm:mb-4">
          <MessageCircleHeart className="h-4 w-4 text-rose-400 sm:h-5 sm:w-5" />
          <span className="text-xs font-bold text-slate-700 sm:text-sm">Daily Question</span>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 p-3.5 text-center sm:rounded-2xl sm:p-4">
          <p className="font-serif text-sm font-medium text-slate-700 sm:text-base">
            &ldquo;What made you smile today?&rdquo;
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="rounded-full bg-rose-200/60 px-2 py-0.5 text-[9px] font-semibold text-rose-500">Both answered</span>
            <span className="rounded-full bg-amber-200/60 px-2 py-0.5 text-[9px] font-semibold text-amber-600">Tap to reveal</span>
          </div>
        </div>

        {/* Nudges — realistic stacked notification list, borderless + lifted */}
        <div className="mt-3.5 space-y-2.5 sm:mt-4 sm:space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.22)] sm:p-3.5">
            <NotificationAvatar src="/avatar-1.webp" alt="Jake" icon={Bell} />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 sm:text-sm">Jake sent a nudge</div>
              <div className="text-[10px] text-slate-400 sm:text-xs">&ldquo;Thinking of you &hearts;&rdquo;</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.22)] sm:p-3.5">
            <NotificationAvatar src="/avatar-2.webp" alt="Mia" icon={MessageCircleHeart} />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 sm:text-sm">Mia answered today&apos;s question</div>
              <div className="text-[10px] text-slate-400 sm:text-xs">Tap to reveal your answer</div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.22)] sm:p-3.5">
            <NotificationAvatar src="/avatar-1.webp" alt="Jake" icon={Bell} />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 sm:text-sm">Jake kept the streak alive</div>
              <div className="text-[10px] text-slate-400 sm:text-xs">12-day streak going strong &#128293;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 4: Celebrate Progress ─── */
function CelebrateVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl bg-white p-5 shadow-[0_24px_48px_-16px_rgba(245,158,11,0.3)] sm:rounded-3xl sm:p-7">
        {/* Celebration banner — raised off the card */}
        <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 text-center shadow-[0_16px_32px_-12px_rgba(249,115,22,0.55)] sm:rounded-2xl sm:p-5">
          <Trophy className="mx-auto h-8 w-8 text-white sm:h-10 sm:w-10" />
          <div className="mt-2 text-lg font-bold text-white sm:text-xl">75% Complete!</div>
          <div className="mt-1 text-xs text-white/80 sm:text-sm">House Deposit Dream</div>
        </div>

        {/* Locked message revealed */}
        <div className="mt-4 rounded-xl bg-amber-50 p-3.5 shadow-sm sm:mt-5 sm:rounded-2xl sm:p-4">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 sm:text-xs">
              Partner&apos;s secret message
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm">
            &ldquo;I&apos;m so proud of us. Remember when this felt impossible?&rdquo;
          </p>
        </div>

        {/* Photo + Activity row */}
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-sky-50 p-3 shadow-sm sm:rounded-2xl sm:p-3.5">
            <Camera className="h-4 w-4 shrink-0 text-sky-500" />
            <div>
              <div className="text-[10px] font-bold text-slate-700 sm:text-xs">12 Photos</div>
              <div className="text-[9px] text-slate-400 sm:text-[10px]">Journey timeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 shadow-sm sm:rounded-2xl sm:p-3.5">
            <Activity className="h-4 w-4 shrink-0 text-emerald-500" />
            <div>
              <div className="text-[10px] font-bold text-slate-700 sm:text-xs">Activity</div>
              <div className="text-[9px] text-slate-400 sm:text-[10px]">Live couple feed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 5: Stay Organized ─── */
function FilesVisual() {
  return (
    <div className="relative flex h-full w-full max-w-sm items-center justify-center lg:h-full">
      <Image
        src="/files.webp"
        alt="Phone screen showing photos, links, and documents organized by dream"
        width={1000}
        height={1250}
        loading="lazy"
        sizes="(max-width: 639px) 320px, 400px"
        className="h-auto max-h-[420px] w-auto max-w-[320px] drop-shadow-2xl sm:max-w-[400px] lg:h-full lg:max-h-[520px]"
      />
    </div>
  );
}

/* ─── Visual 6: Know Your Journey ─── */
function InsightsVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl bg-white p-5 shadow-[0_24px_48px_-16px_rgba(99,102,241,0.28)] sm:rounded-3xl sm:p-7">
        {/* Smart insight alert */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 p-3.5 shadow-sm sm:rounded-2xl sm:p-4">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 sm:text-xs">
              Smart Insight
            </span>
          </div>
          <p className="mt-2 text-xs font-medium text-slate-700 sm:text-sm">
            You&apos;re 3 days ahead of schedule on your House Deposit dream!
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-2.5">
          <div className="rounded-xl bg-rose-50 p-2.5 text-center shadow-sm sm:rounded-2xl sm:p-3">
            <div className="text-base font-bold text-rose-500 sm:text-lg">547</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Days Together</div>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2.5 text-center shadow-sm sm:rounded-2xl sm:p-3">
            <div className="text-base font-bold text-emerald-500 sm:text-lg">12</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Dreams Done</div>
          </div>
          <div className="rounded-xl bg-amber-50 p-2.5 text-center shadow-sm sm:rounded-2xl sm:p-3">
            <div className="text-base font-bold text-amber-500 sm:text-lg">$23k</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Total Saved</div>
          </div>
        </div>

        {/* Mini trend — borderless, lifted */}
        <div className="mt-3.5 rounded-xl bg-white p-3 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.18)] sm:mt-4 sm:p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-600 sm:text-xs">Weekly Activity</span>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-500 sm:text-[10px]">
              +18%
            </span>
          </div>
          {/* Simple bar chart */}
          <div className="mt-2.5 flex items-end gap-1.5 sm:gap-2">
            {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-md ${
                    i === 5
                      ? "bg-gradient-to-t from-indigo-500 to-indigo-400 shadow-sm"
                      : "bg-indigo-100"
                  }`}
                  style={{ height: `${h * 0.4}px` }}
                />
                <span className="text-[8px] text-slate-400">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro badge */}
        <div className="mt-3 flex items-center justify-center gap-1.5 sm:mt-3.5">
          <BarChart3 className="h-3 w-3 text-indigo-400" />
          <span className="text-[9px] font-semibold text-indigo-400 sm:text-[10px]">
            Unlock mood trends &amp; heatmaps with Pro
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 7: Streaks & Rewards ─── */
function StreaksVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
      <div className="rounded-2xl bg-white p-5 shadow-[0_24px_48px_-16px_rgba(249,115,22,0.3)] sm:rounded-3xl sm:p-7">
        {/* Week grid */}
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-slate-700 sm:text-sm">Couple Streak</span>
          </div>
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-500 shadow-sm sm:text-xs">
            42 Days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={day + i} className="flex flex-col items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-medium text-slate-400 sm:text-xs">{day}</span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base ${i <= 5
                  ? "bg-gradient-to-br from-orange-400 to-amber-500 font-bold text-white shadow-[0_8px_16px_-4px_rgba(249,115,22,0.5)]"
                  : "border-2 border-dashed border-orange-200 text-orange-300"
                  }`}
              >
                {i <= 5 ? "✓" : ""}
              </div>
            </div>
          ))}
        </div>

        {/* Badges earned */}
        <div className="mt-5 sm:mt-6">
          <div className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
            Recent Badges
          </div>
          <div className="flex gap-2 sm:gap-2.5">
            <div className="flex flex-1 flex-col items-center gap-1.5 rounded-xl bg-amber-50 p-2.5 shadow-sm sm:rounded-2xl sm:p-3">
              <Award className="h-5 w-5 text-amber-500 sm:h-6 sm:w-6" />
              <span className="text-[9px] font-bold text-amber-600 sm:text-[10px]">30-Day</span>
              <span className="text-[8px] text-slate-400">Rare</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1.5 rounded-xl bg-violet-50 p-2.5 shadow-sm sm:rounded-2xl sm:p-3">
              <Heart className="h-5 w-5 text-violet-500 sm:h-6 sm:w-6" />
              <span className="text-[9px] font-bold text-violet-600 sm:text-[10px]">Bond</span>
              <span className="text-[8px] text-slate-400">Epic</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1.5 rounded-xl bg-emerald-50 p-2.5 shadow-sm sm:rounded-2xl sm:p-3">
              <Target className="h-5 w-5 text-emerald-500 sm:h-6 sm:w-6" />
              <span className="text-[9px] font-bold text-emerald-600 sm:text-[10px]">5 Dreams</span>
              <span className="text-[8px] text-slate-400">Common</span>
            </div>
          </div>
        </div>

        {/* Streak shield */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 shadow-[0_12px_24px_-8px_rgba(15,23,42,0.45)] sm:mt-4 sm:rounded-2xl sm:p-3.5">
          <Zap className="h-4 w-4 shrink-0 text-amber-400 sm:h-5 sm:w-5" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-white sm:text-xs">Milestone Unlocked</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Day 30: a new question pack is yours</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const showcaseItems: ShowcaseItem[] = [
  {
    badge: "Build Together",
    title: "Shared Dreams, Private Ones, One Beautiful Space",
    description:
      "Create dreams together as a couple, or keep personal dreams private. Track with 4 dream types: amount, checklist, habit, and time. Start quickly with pre-built templates.",
    highlights: [
      "4 dream types: amount, checklist, habit, and time",
      "Pre-built templates to start faster",
      "Private dreams your partner never knows exist",
    ],
    visual: <BuildTogetherVisual />,
    icon: Users,
    color: "emerald",
    span: "md:col-span-2 lg:col-span-4",
    size: "large",
    float: {
      emoji: "✨",
      iconClassName: "bg-emerald-50 text-emerald-500",
      title: "Dream committed",
      subtitle: "Both partners in",
      position: "bottom-6 right-6",
    },
    image: { src: "/shared-dreams.webp", alt: "Couple planning shared dreams together" },
  },
  // {
  //   badge: "Daily Deck",
  //   title: "Swipe Through Your Goals, One Card at a Time",
  //   description:
  //     "A focused, distraction-free way to log daily progress. Your deck shows exactly what needs attention today — swipe right to save, left to skip. Toggle between Today's priorities and Anytime goals.",
  //   highlights: [
  //     "Swipeable cards for quick progress logging",
  //     "Today vs Anytime views keep you focused",
  //     "Quick-add chips for common amounts",
  //     "Streaks and celebrations built in",
  //   ],
  //   visual: <DailyDeckVisual />,
  //   reverse: true,
  // },
  {
    badge: "Surprise Each Other",
    title: "Hidden Contributions & Locked Milestone Messages",
    description:
      "Secretly add to any dream. Your partner won't see it until you're ready. Lock a personal message to 25%, 50%, 75%, or 100% milestones. When they hit it, your surprise reveals with a celebration.",
    highlights: [
      "Hidden contributions with custom reveal triggers",
      "Lock secret messages to any milestone",
      "Celebration animation on reveal with photos",
    ],
    visual: <SurpriseVisual />,
    icon: Gift,
    color: "sunset",
    span: "lg:col-span-2",
    size: "small",
    photo: { src: "/japan-trip.webp", alt: "Kyoto street at dusk near a pagoda" },
  },
  {
    badge: "Celebrate Progress",
    title: "Turn Every Milestone Into a Shared Memory",
    description:
      "Hit a milestone and get a full-screen celebration. Upload a progress photo, unlock your partner's secret message, and watch it all appear in your real-time activity feed.",
    highlights: [
      "Full-screen celebrations with confetti",
      "Progress photo timeline for every dream",
      "Real-time activity feed for both partners",
    ],
    visual: <CelebrateVisual />,
    icon: Trophy,
    color: "amber",
    span: "lg:col-span-2",
    size: "small",
  },
  {
    badge: "Stay Organized",
    title: "Every Photo, Link, and File in One Place",
    description:
      "Upload photos, save links from Pinterest, YouTube, or anywhere else, and drop in PDFs or docs. Everything groups automatically under the right dream, so nothing gets lost in your camera roll or bookmarks.",
    highlights: [
      "Photos, links, and docs, all in one place",
      "Save links straight from Pinterest, YouTube, and more",
      "Auto-grouped and organized by dream",
      "Hold and drag to reorder any photo, link, or doc",
      "Import directly from other apps into DreamDuo",
    ],
    visual: <FilesVisual />,
    icon: FolderOpen,
    color: "sky",
    span: "md:col-span-2 lg:col-span-4",
    size: "large",
  },
  {
    badge: "Stay Connected",
    title: "Daily Rituals That Deepen Your Bond",
    description:
      "One question a day. Both answer privately, then answers reveal together. Send quick nudges (text, photo, soundboard), track each other's mood, and make fast couple decisions with polls.",
    highlights: [
      "Daily questions: light, medium, or deep categories",
      "Nudges with text, photos, and fun sounds",
      "Quick polls and mood tracking",
    ],
    visual: <StayConnectedVisual />,
    icon: MessageCircleHeart,
    color: "rose",
    span: "lg:col-span-3",
    size: "medium",
  },
  {
    badge: "Know Your Journey",
    title: "Smart Insights That Keep You On Track",
    description:
      "See if you're ahead or behind schedule, get milestone alerts, and track couple stats: days together, dreams completed, total saved. Upgrade to Pro for mood trends and activity heatmaps.",
    highlights: [
      "On-track alerts and completion predictions",
      "Couple stats: days together, dreams, savings",
      "Pro: mood trends and activity heatmaps",
    ],
    visual: <InsightsVisual />,
    icon: Brain,
    color: "indigo",
    span: "lg:col-span-3",
    size: "medium",
  },
  {
    badge: "Streaks & Rewards",
    title: "Check In Daily, Unlock More, Never Break the Chain",
    description:
      "Track your individual and couple streak. As your couple streak grows, milestones at 3, 7, 14, 30, 60, and 100 days unlock new question packs to explore together.",
    highlights: [
      "Daily couple check-ins with streak tracking",
      "Couple milestones from day 3 to day 100",
      "Unlock new question packs as you go",
    ],
    visual: <StreaksVisual />,
    icon: Flame,
    color: "orange",
    span: "md:col-span-2 lg:col-span-6",
    size: "wide",
  },
];

/* Light photo card: a pastel gradient (color-matched to the photo's own dusk
   palette) holds the text, a clean CONTAINED photo sits below it — not
   full-bleed — and the infographic panel sits below that with normal spacing
   (no overlap/mask trickery, which was producing a muddy shadow smear).
   Mirrors the simple, well-liked "Build Together" card's structure: text,
   then image, then a light panel — just layered plainly. Used instead of the
   light gradient-blush BentoCard when the item has a `photo`. */
function PhotoBentoCard({
  item,
  photo,
}: {
  item: ShowcaseItem;
  photo: { src: string; alt: string };
}) {
  const accent = ACCENTS[item.color];
  const Icon = item.icon;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl border ${accent.border} bg-gradient-to-b ${accent.bg} p-6 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-7 ${item.span}`}
    >
      <span
        className={`inline-flex w-fit items-center gap-2 rounded-full ${accent.badge} px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm sm:text-xs`}
      >
        <Icon className={`h-3.5 w-3.5 ${accent.chip}`} />
        {item.badge}
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold text-slate-800 sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        {item.description}
      </p>

      {/* Contained photo — inset, not full-bleed, clean rounded corners */}
      <div className="relative mt-6 overflow-hidden rounded-2xl shadow-md shadow-rose-200/40">
        <Image
          src={photo.src}
          alt={photo.alt}
          width={600}
          height={400}
          loading="lazy"
          sizes="(max-width: 639px) 100vw, 560px"
          className="h-56 w-full object-cover sm:h-64"
        />
      </div>

      {/* Light glass panel, normal spacing below the photo */}
      <div className="relative mt-5">{item.visual}</div>
    </div>
  );
}

function BentoCard({ item }: { item: ShowcaseItem }) {
  if (item.photo) {
    return <PhotoBentoCard item={item} photo={item.photo} />;
  }

  const accent = ACCENTS[item.color];
  const Icon = item.icon;
  // Large + wide cards lay text beside the infographic; the rest stack it below.
  const isLarge = item.size === "large" || item.size === "wide";
  // Cards with a dedicated supporting image skip the duplicate infographic.
  const showInfographic = !item.image;

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-3xl border ${accent.border} bg-gradient-to-br ${accent.bg} p-6 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-7 ${item.span}`}
    >
      {/* Gradient blush glows */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full ${accent.glow} opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-45`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full ${accent.glow} opacity-[0.15] blur-3xl`}
      />

      <div
        className={`relative flex flex-col ${
          showInfographic ? "flex-1" : ""
        } ${
          isLarge && showInfographic
            ? "lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8"
            : ""
        }`}
      >
        {/* Text */}
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full ${accent.badge} px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm sm:text-xs`}
          >
            <Icon className={`h-3.5 w-3.5 ${accent.chip}`} />
            {item.badge}
          </span>
          <h3 className="mt-4 font-serif text-xl font-bold text-slate-800 sm:text-2xl md:text-[1.7rem]">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {item.description}
          </p>

          {isLarge && (
            <ul className="mt-5 space-y-2.5">
              {item.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm text-slate-600"
                >
                  <ArrowRight
                    className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.chip}`}
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Infographic — skipped when the card has its own supporting image */}
        {showInfographic && (
          <div
            className={
              isLarge
                ? "mt-6 flex lg:mt-0 lg:h-full lg:items-center lg:justify-center"
                : "mt-6 flex justify-center"
            }
          >
            {item.visual}
          </div>
        )}
      </div>

      {/* Supporting image — absorbs the card's remaining height (the card is a
          flex column) and centers/scales within it, instead of sitting small
          at a fixed width regardless of how tall the card ends up. */}
      {item.image && (
        <div className="relative mt-6 flex flex-1 items-center justify-center">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={1200}
            height={1498}
            loading="lazy"
            sizes="(max-width: 639px) 340px, 400px"
            className="h-full max-h-[420px] w-auto max-w-full object-contain sm:max-h-[480px]"
          />
        </div>
      )}

      {/* Decorative floating chip (large cards) */}
      {item.float && (
        <FloatingCard
          emoji={item.float.emoji}
          icon={item.float.icon}
          iconClassName={item.float.iconClassName}
          title={item.float.title}
          subtitle={item.float.subtitle}
          className={`z-20 hidden lg:block ${item.float.position}`}
        />
      )}
    </div>
  );
}

export function Showcase() {
  return (
    <section
      id="features"
      className="relative scroll-mt-16 overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-white py-16 sm:py-20 md:py-24 lg:py-32"
    >
      {/* Subtle pattern backdrop */}
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 sm:text-sm">
            Why DreamDuo?
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:mt-4 sm:text-4xl md:text-5xl">
            Designed for Love &amp; Ambition
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:mt-5 sm:text-lg">
            Every feature is built to help you grow closer while you grow
            together. No spreadsheets, just connection.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-6">
          {showcaseItems.map((item) => (
            <BentoCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
