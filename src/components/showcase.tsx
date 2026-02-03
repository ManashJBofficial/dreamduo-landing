import {
  ArrowRight,
  Target,
  EyeOff,
  Lock,
  MessageCircleHeart,
  Bell,
  Volume2,
  ImagePlus,
  SmilePlus,
  Vote,
  Trophy,
  Camera,
  Activity,
  FolderOpen,
  FileText,
  Shield,
  Upload,
  TrendingUp,
  BarChart3,
  Brain,
  Flame,
  Award,
  Zap,
  CheckCircle,
  Users,
  Heart,
} from "lucide-react";

interface ShowcaseItem {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  visual: React.ReactNode;
  reverse?: boolean;
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
              Our Goals
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
            <div className="text-[10px] font-bold text-slate-500 sm:text-xs">Private Goal</div>
            <div className="text-[10px] text-slate-400">Only you can see this</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 2: Surprise Each Other ─── */
function SurpriseVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-violet-100/20 sm:rounded-3xl sm:p-7">
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <span className="text-xs font-bold text-slate-700 sm:text-sm">Bali Trip Fund</span>
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-500 sm:text-xs">
            62%
          </span>
        </div>

        {/* Progress bar with milestones */}
        <div className="relative">
          <div className="h-3 rounded-full bg-violet-100">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-violet-400 to-purple-500" />
          </div>
          {/* Milestone markers */}
          <div className="absolute -top-1 left-[25%] -translate-x-1/2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-bold text-white shadow-sm">
              <CheckCircle className="h-3 w-3" />
            </div>
          </div>
          <div className="absolute -top-1 left-[50%] -translate-x-1/2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-bold text-white shadow-sm">
              <CheckCircle className="h-3 w-3" />
            </div>
          </div>
          <div className="absolute -top-1 left-[75%] -translate-x-1/2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-violet-300 bg-white">
              <Lock className="h-2.5 w-2.5 text-violet-400" />
            </div>
          </div>
        </div>

        {/* Unlocked milestone message */}
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-3.5 sm:mt-6 sm:rounded-2xl sm:p-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 sm:text-xs">
              50% Milestone Unlocked
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm">
            &ldquo;Halfway to Bali! I&apos;ve been secretly saving from my lunch money. We&apos;re doing this!&rdquo;
          </p>
        </div>

        {/* Hidden contribution */}
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-3.5 sm:mt-3.5 sm:rounded-2xl sm:p-4">
          <EyeOff className="h-4 w-4 shrink-0 text-violet-400" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-violet-400 sm:text-xs">Hidden contribution</div>
            <div className="text-sm font-bold text-violet-600 sm:text-base">+$500</div>
          </div>
          <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-1 text-[9px] font-bold text-violet-600 sm:text-[10px]">
            Reveals at 75%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 3: Stay Connected ─── */
function StayConnectedVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-rose-100/20 sm:rounded-3xl sm:p-7">
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

        {/* Quick nudges + mood row */}
        <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-3">
          <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:rounded-2xl sm:p-3.5">
            <Bell className="h-4 w-4 text-amber-500" />
            <div className="mt-1.5 text-[10px] font-bold text-slate-700 sm:text-xs">Nudges</div>
            <div className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">Text, photo, sounds</div>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 p-3 sm:rounded-2xl sm:p-3.5">
            <SmilePlus className="h-4 w-4 text-sky-500" />
            <div className="mt-1.5 text-[10px] font-bold text-slate-700 sm:text-xs">Mood</div>
            <div className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">Track daily moods</div>
          </div>
        </div>

        {/* Poll */}
        <div className="mt-3 rounded-xl border border-slate-100 p-3 sm:mt-3.5 sm:p-3.5">
          <div className="flex items-center gap-2">
            <Vote className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-[10px] font-bold text-slate-600 sm:text-xs">Quick Poll</span>
          </div>
          <div className="mt-2 text-xs text-slate-600 sm:text-sm">&ldquo;Sushi or pizza tonight?&rdquo;</div>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 rounded-lg bg-indigo-50 py-1.5 text-center text-[10px] font-bold text-indigo-500 sm:text-xs">
              Sushi 65%
            </div>
            <div className="flex-1 rounded-lg bg-slate-50 py-1.5 text-center text-[10px] font-bold text-slate-400 sm:text-xs">
              Pizza 35%
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
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-amber-100/20 sm:rounded-3xl sm:p-7">
        {/* Celebration banner */}
        <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 text-center sm:rounded-2xl sm:p-5">
          <Trophy className="mx-auto h-8 w-8 text-white sm:h-10 sm:w-10" />
          <div className="mt-2 text-lg font-bold text-white sm:text-xl">75% Complete!</div>
          <div className="mt-1 text-xs text-white/80 sm:text-sm">House Deposit Goal</div>
        </div>

        {/* Locked message revealed */}
        <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3.5 sm:mt-5 sm:rounded-2xl sm:p-4">
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
          <div className="flex items-center gap-2 rounded-xl bg-sky-50 p-3 sm:rounded-2xl sm:p-3.5">
            <Camera className="h-4 w-4 shrink-0 text-sky-500" />
            <div>
              <div className="text-[10px] font-bold text-slate-700 sm:text-xs">12 Photos</div>
              <div className="text-[9px] text-slate-400 sm:text-[10px]">Journey timeline</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 sm:rounded-2xl sm:p-3.5">
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
function OrganizedVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-teal-100/20 sm:rounded-3xl sm:p-7">
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-teal-500 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-slate-700 sm:text-sm">Document Vault</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[9px] font-bold text-emerald-500 sm:text-[10px]">Encrypted</span>
          </div>
        </div>

        {/* Folder structure */}
        <div className="space-y-2 sm:space-y-2.5">
          <div className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 p-3 sm:rounded-2xl sm:p-3.5">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-teal-500" />
              <span className="text-xs font-bold text-slate-700 sm:text-sm">House Goal</span>
            </div>
            <div className="ml-6 mt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-500 sm:text-xs">Financial Documents (4)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-500 sm:text-xs">Property Search (7)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-500 sm:text-xs">Closing Docs (2)</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 p-3 sm:rounded-2xl sm:p-3.5">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-pink-500" />
              <span className="text-xs font-bold text-slate-700 sm:text-sm">Wedding</span>
            </div>
            <div className="ml-6 mt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-500 sm:text-xs">Vendors &amp; Contracts (5)</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] text-slate-500 sm:text-xs">Guest List (1)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upload bar */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-teal-200 p-3 sm:mt-4 sm:p-3.5">
          <Upload className="h-4 w-4 text-teal-400" />
          <span className="text-[10px] font-medium text-teal-500 sm:text-xs">
            Drop files here &mdash; PDFs, photos, documents
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 6: Know Your Journey ─── */
function InsightsVisual() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-indigo-100/20 sm:rounded-3xl sm:p-7">
        {/* Smart insight alert */}
        <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 p-3.5 sm:rounded-2xl sm:p-4">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 sm:text-xs">
              Smart Insight
            </span>
          </div>
          <p className="mt-2 text-xs font-medium text-slate-700 sm:text-sm">
            You&apos;re 3 days ahead of schedule on your House Deposit goal!
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-2.5">
          <div className="rounded-xl bg-rose-50 p-2.5 text-center sm:rounded-2xl sm:p-3">
            <div className="text-base font-bold text-rose-500 sm:text-lg">547</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Days Together</div>
          </div>
          <div className="rounded-xl bg-emerald-50 p-2.5 text-center sm:rounded-2xl sm:p-3">
            <div className="text-base font-bold text-emerald-500 sm:text-lg">12</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Goals Done</div>
          </div>
          <div className="rounded-xl bg-amber-50 p-2.5 text-center sm:rounded-2xl sm:p-3">
            <div className="text-base font-bold text-amber-500 sm:text-lg">$23k</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Total Saved</div>
          </div>
        </div>

        {/* Mini trend */}
        <div className="mt-3.5 rounded-xl border border-slate-100 p-3 sm:mt-4 sm:p-3.5">
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
                  className={`w-full rounded-sm ${i === 5 ? "bg-indigo-400" : "bg-indigo-200"}`}
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
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-orange-100/20 sm:rounded-3xl sm:p-7">
        {/* Week grid */}
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5" />
            <span className="text-xs font-bold text-slate-700 sm:text-sm">Couple Streak</span>
          </div>
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-500 sm:text-xs">
            42 Days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={day + i} className="flex flex-col items-center gap-1.5 sm:gap-2">
              <span className="text-[10px] font-medium text-slate-400 sm:text-xs">{day}</span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm sm:h-11 sm:w-11 sm:rounded-2xl sm:text-base ${
                  i <= 5
                    ? "bg-gradient-to-br from-orange-400 to-amber-500 font-bold text-white shadow-md shadow-orange-200/50"
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
            <div className="flex flex-1 flex-col items-center gap-1.5 rounded-xl bg-amber-50 p-2.5 sm:rounded-2xl sm:p-3">
              <Award className="h-5 w-5 text-amber-500 sm:h-6 sm:w-6" />
              <span className="text-[9px] font-bold text-amber-600 sm:text-[10px]">30-Day</span>
              <span className="text-[8px] text-slate-400">Rare</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1.5 rounded-xl bg-violet-50 p-2.5 sm:rounded-2xl sm:p-3">
              <Heart className="h-5 w-5 text-violet-500 sm:h-6 sm:w-6" />
              <span className="text-[9px] font-bold text-violet-600 sm:text-[10px]">Bond</span>
              <span className="text-[8px] text-slate-400">Epic</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-1.5 rounded-xl bg-emerald-50 p-2.5 sm:rounded-2xl sm:p-3">
              <Target className="h-5 w-5 text-emerald-500 sm:h-6 sm:w-6" />
              <span className="text-[9px] font-bold text-emerald-600 sm:text-[10px]">5 Goals</span>
              <span className="text-[8px] text-slate-400">Common</span>
            </div>
          </div>
        </div>

        {/* Streak shield */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 sm:mt-4 sm:rounded-2xl sm:p-3.5">
          <Zap className="h-4 w-4 shrink-0 text-amber-400 sm:h-5 sm:w-5" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-white sm:text-xs">Streak Shield Active</div>
            <div className="text-[9px] text-slate-400 sm:text-[10px]">Miss a day? Your streak is protected</div>
          </div>
          <span className="shrink-0 text-[10px] font-bold text-amber-400">2x</span>
        </div>
      </div>
    </div>
  );
}

const showcaseItems: ShowcaseItem[] = [
  {
    badge: "Build Together",
    title: "Shared Goals, Private Dreams, One Beautiful Space",
    description:
      "Create goals together as a couple — or keep personal goals completely private. Choose from 12 goal types (house, wedding, travel, health) and 7 tracking methods. Start in seconds with pre-built templates.",
    highlights: [
      "12 goal types with tailored templates",
      "7 tracking methods: numeric, tasks, habits, time, and more",
      "Private goals your partner never knows exist",
    ],
    visual: <BuildTogetherVisual />,
  },
  {
    badge: "Surprise Each Other",
    title: "Hidden Contributions & Locked Milestone Messages",
    description:
      "Secretly add to any goal — your partner won't see it until you're ready. Lock a personal message to 25%, 50%, 75%, or 100% milestones. When they hit it, your surprise reveals with a celebration.",
    highlights: [
      "Hidden contributions with custom reveal triggers",
      "Lock secret messages to any milestone",
      "Celebration animation on reveal with photos",
    ],
    visual: <SurpriseVisual />,
    reverse: true,
  },
  {
    badge: "Stay Connected",
    title: "Daily Rituals That Deepen Your Bond",
    description:
      "One question a day — both answer privately, then answers reveal together. Send quick nudges (text, photo, soundboard), track each other's mood, and make fast couple decisions with polls.",
    highlights: [
      "Daily questions: light, medium, or deep categories",
      "Nudges with text, photos, and fun sounds",
      "Quick polls and mood tracking",
    ],
    visual: <StayConnectedVisual />,
  },
  {
    badge: "Celebrate Progress",
    title: "Turn Every Milestone Into a Shared Memory",
    description:
      "Hit a milestone and get a full-screen celebration. Upload a progress photo, unlock your partner's secret message, and watch it all appear in your real-time activity feed.",
    highlights: [
      "Full-screen celebrations with confetti",
      "Progress photo timeline for every goal",
      "Real-time activity feed for both partners",
    ],
    visual: <CelebrateVisual />,
    reverse: true,
  },
  {
    badge: "Stay Organized",
    title: "Every Document, Encrypted & Beautifully Organized",
    description:
      "Upload files and they auto-organize by goal type — House: Financial, Search, Closing. Wedding: Vendors, Planning, Guests. Everything encrypted with AES-256-GCM. Preview in-app, search by name, export anytime.",
    highlights: [
      "Auto-organized folders by goal type",
      "AES-256-GCM encrypted storage",
      "PDFs, photos, docs with in-app preview",
    ],
    visual: <OrganizedVisual />,
  },
  {
    badge: "Know Your Journey",
    title: "Smart Insights That Keep You On Track",
    description:
      "See if you're ahead or behind schedule, get milestone alerts, and track couple stats — days together, goals completed, total saved. Upgrade to Pro for mood trends, activity heatmaps, and communication scores.",
    highlights: [
      "On-track alerts and completion predictions",
      "Couple stats: days together, goals, savings",
      "Pro: mood trends, heatmaps, communication score",
    ],
    visual: <InsightsVisual />,
    reverse: true,
  },
  {
    badge: "Streaks & Rewards",
    title: "Check In Daily, Earn Badges, Never Break the Chain",
    description:
      "Track your individual and couple streak. Earn badges at 7, 14, 30, 50, 100, and 365 days — from Common to Legendary. Streak shields protect you if you miss a day. Pro users earn at 2x speed.",
    highlights: [
      "Daily couple check-ins with streak tracking",
      "Badges: Common, Rare, Epic, Legendary",
      "Streak shields and multipliers",
    ],
    visual: <StreaksVisual />,
  },
];

export function Showcase() {
  return (
    <section id="features" className="scroll-mt-16 bg-gradient-to-b from-white via-slate-50/30 to-white py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 sm:text-sm">
            Why DreamDuo?
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:mt-4 sm:text-4xl md:text-5xl">
            Designed for Love & Ambition
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:mt-5 sm:text-lg">
            Every feature is built to help you grow closer while you grow
            together. No spreadsheets, just connection.
          </p>
        </div>

        {/* Showcase items */}
        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20 lg:mt-20 lg:space-y-28">
          {showcaseItems.map((item) => (
            <div
              key={item.title}
              className={`grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-16 ${
                item.reverse ? "lg:[direction:rtl]" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`mx-auto max-w-lg text-center lg:mx-0 lg:text-left ${
                  item.reverse ? "lg:[direction:ltr]" : ""
                }`}
              >
                <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-500 sm:px-4 sm:py-1.5 sm:text-xs">
                  {item.badge}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-bold text-slate-800 sm:mt-5 sm:text-3xl md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:mt-4 sm:text-base md:text-lg">
                  {item.description}
                </p>
                <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center justify-center gap-2.5 text-sm text-slate-600 sm:text-base lg:justify-start"
                    >
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-rose-400 sm:h-4 sm:w-4" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={item.reverse ? "lg:[direction:ltr]" : ""}>
                {item.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
