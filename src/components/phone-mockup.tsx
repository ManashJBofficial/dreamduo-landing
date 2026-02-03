import {
  Heart,
  Home,
  LayoutGrid,
  Plus,
  Monitor,
  User,
  Bell,
  CheckCircle,
  Flame,
  MoreHorizontal,
} from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="animate-float">
      <div className="relative w-[260px] rounded-[2.2rem] border border-slate-200/60 bg-white p-2.5 shadow-2xl shadow-pink-200/40 sm:w-[300px] sm:rounded-[2.5rem] sm:p-3 md:w-[340px]">
        {/* Inner frame */}
        <div className="overflow-hidden rounded-[1.8rem] bg-slate-50 sm:rounded-[2rem]">
          {/* Header */}
          <div className="px-4 pt-3 sm:px-5 sm:pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex -space-x-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-400 text-[9px] font-bold text-white ring-2 ring-white sm:h-7 sm:w-7 sm:text-[10px]">
                    A
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-[9px] font-bold text-white ring-2 ring-white sm:h-7 sm:w-7 sm:text-[10px]">
                    S
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                  Overview
                </span>
              </div>
              <Bell className="h-4 w-4 text-slate-400 sm:h-[18px] sm:w-[18px]" />
            </div>
          </div>

          {/* Streak card */}
          <div className="mx-3 mt-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-3 sm:mx-4 sm:mt-4 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 sm:text-[10px]">
                  Current Streak
                </div>
                <div className="mt-0.5 flex items-center gap-1 sm:mt-1 sm:gap-1.5">
                  <span className="text-xl font-bold text-white sm:text-2xl">
                    12 Days
                  </span>
                  <Flame className="h-4 w-4 text-orange-400 sm:h-5 sm:w-5" />
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-rose-400 sm:h-10 sm:w-10">
                <CheckCircle className="h-4 w-4 text-rose-400 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>

          {/* Priority Goal card */}
          <div className="mx-3 mt-2.5 rounded-xl bg-white p-3 shadow-sm sm:mx-4 sm:mt-3 sm:rounded-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[9px] font-bold text-rose-500 sm:px-2.5 sm:text-[10px]">
                Priority Goal
              </span>
              <MoreHorizontal className="h-3.5 w-3.5 text-slate-300 sm:h-4 sm:w-4" />
            </div>
            <div className="mt-2 flex items-center gap-2.5 sm:mt-3 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9 sm:rounded-xl">
                <span className="text-sm sm:text-base">🏝️</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700 sm:text-sm">
                  Bali Trip 🌴
                </div>
                <div className="text-[10px] text-slate-400 sm:text-[11px]">
                  Target: Aug 2026
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[10px] sm:mt-3 sm:text-[11px]">
              <span className="font-semibold text-slate-600">$3,450 saved</span>
              <span className="text-slate-400">of $5,000</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 sm:mt-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500"
                style={{ width: "69%" }}
              />
            </div>
          </div>

          {/* Daily Question card */}
          <div className="mx-3 mb-2 mt-2.5 rounded-xl bg-white p-3 shadow-sm sm:mx-4 sm:mt-3 sm:rounded-2xl sm:p-4">
            <div className="flex flex-col items-center py-1 sm:py-2">
              <Heart className="h-4 w-4 text-pink-300 sm:h-5 sm:w-5" />
              <div className="mt-1.5 text-xs font-bold text-slate-700 sm:mt-2 sm:text-sm">
                Daily Question
              </div>
              <div className="mt-0.5 text-center text-[10px] text-slate-400 sm:mt-1 sm:text-[11px]">
                &ldquo;What&apos;s one thing I did...&rdquo;
              </div>
            </div>
          </div>

          {/* Bottom nav */}
          <div className="relative border-t border-slate-100 bg-white px-4 py-2.5 sm:px-6 sm:py-3">
            <div className="flex items-center justify-between">
              <Home className="h-4 w-4 text-rose-400 sm:h-5 sm:w-5" />
              <LayoutGrid className="h-4 w-4 text-slate-300 sm:h-5 sm:w-5" />
              <div className="flex h-8 w-8 -translate-y-1.5 items-center justify-center rounded-full bg-slate-800 shadow-lg sm:h-10 sm:w-10 sm:-translate-y-2">
                <Plus className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <Monitor className="h-4 w-4 text-slate-300 sm:h-5 sm:w-5" />
              <User className="h-4 w-4 text-slate-300 sm:h-5 sm:w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
