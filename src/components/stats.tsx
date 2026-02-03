import { Heart, Lock, Sparkles } from "lucide-react";

const highlights = [
  { icon: Heart, text: "Built for Couples" },
  { icon: Sparkles, text: "Free Forever" },
  { icon: Lock, text: "Encrypted & Secure" },
];

export function Stats() {
  return (
    <section className="border-y border-white/5 bg-slate-900 py-6 sm:py-8">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:gap-x-12 md:gap-x-16">
        {highlights.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <item.icon className="h-4 w-4 text-rose-400 sm:h-[18px] sm:w-[18px]" />
            <span className="text-sm font-medium text-slate-300 sm:text-base">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
