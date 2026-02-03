import {
  Handshake,
  Gift,
  Target,
  CalendarCheck,
  HeartHandshake,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  emoji: string;
}

const features: Feature[] = [
  {
    icon: Handshake,
    title: "Commitment Ceremony",
    description:
      'One partner dreams it. The other reviews it. A goal only becomes real when you\'re both in. Share your "why" and commit together.',
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    gradientFrom: "from-rose-100",
    gradientTo: "to-pink-50",
    emoji: "🤝",
  },
  {
    icon: Gift,
    title: "Hidden Surprises",
    description:
      "Make a secret contribution your partner can't see. Set it to reveal on a date or milestone. Watch their face light up when they see the jump.",
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    gradientFrom: "from-violet-100",
    gradientTo: "to-purple-50",
    emoji: "🎁",
  },
  {
    icon: Target,
    title: "Shared Goal Tracking",
    description:
      "Savings for a house, planning a wedding, or losing weight. One beautiful place for every ambition you share as a team.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    gradientFrom: "from-blue-100",
    gradientTo: "to-sky-50",
    emoji: "🎯",
  },
  {
    icon: CalendarCheck,
    title: "The Sunday Summit",
    description:
      "5 minutes every week. What went well? What's blocking you? Stay aligned on your life goals without the awkward \"we need to talk.\"",
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    gradientFrom: "from-amber-100",
    gradientTo: "to-yellow-50",
    emoji: "📅",
  },
  {
    icon: HeartHandshake,
    title: "Daily Connection",
    description:
      "One deep question a day. Both answer privately. Answers are revealed together. Small moments that keep your bond strong.",
    color: "text-red-400",
    bgColor: "bg-red-50",
    gradientFrom: "from-red-100",
    gradientTo: "to-rose-50",
    emoji: "💞",
  },
  {
    icon: Mail,
    title: "Future Letters",
    description:
      "Write a digital letter to your partner. Lock it until a specific date or when a major goal is completed. Emotional time travel.",
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    gradientFrom: "from-teal-100",
    gradientTo: "to-emerald-50",
    emoji: "💌",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100/30 sm:rounded-3xl">
      {/* Illustration area */}
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} sm:h-48 md:h-52`}
      >
        <span className="text-5xl transition-transform duration-500 group-hover:scale-125 sm:text-6xl">
          {feature.emoji}
        </span>
        {/* Decorative circles */}
        <div
          className={`absolute -bottom-3 -right-3 h-24 w-24 rounded-full ${feature.bgColor} opacity-40 blur-xl`}
        />
        <div
          className={`absolute -left-2 -top-2 h-16 w-16 rounded-full ${feature.bgColor} opacity-30 blur-lg`}
        />
      </div>

      {/* Content area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
        <div className="mb-3 flex items-center gap-3 sm:mb-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.bgColor} transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11`}
          >
            <Icon className={`h-5 w-5 ${feature.color} sm:h-5.5 sm:w-5.5`} />
          </div>
          <h3 className="text-base font-bold text-slate-800 sm:text-lg">
            {feature.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-500 sm:text-[15px]">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 lg:py-32">
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

        {/* Feature grid */}
        <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-7">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
