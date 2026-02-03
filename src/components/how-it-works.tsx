import { UserPlus, Target, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Connect With Your Partner",
    description:
      "Create your DreamDuo account and invite your partner with a single link. Once they join, your shared space is ready.",
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    number: "02",
    icon: Target,
    title: "Set Dreams Together",
    description:
      "Add your first shared goal — a trip, savings target, or fitness plan. Both partners commit with their \"why\" to make it real.",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Watch Progress Grow",
    description:
      "Track milestones, celebrate wins, and stay connected with daily check-ins. Your streak keeps you both accountable.",
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-l from-pink-50/80 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500 sm:text-sm">
            How It Works
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:mt-4 sm:text-4xl md:text-5xl">
            Three Steps to Your <br className="hidden sm:block" />
            Shared Future
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:mt-5 sm:text-lg">
            Getting started is simple. Your dream life together is closer than
            you think.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-10">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-[4.5rem] hidden h-px w-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent md:block" />
              )}

              <div className="group relative rounded-2xl border border-slate-100/80 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-100/30 sm:rounded-3xl sm:p-8 md:p-10">
                {/* Step number */}
                <div className="mb-5 inline-flex items-center justify-center sm:mb-6">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.bgColor} transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16`}
                  >
                    <step.icon
                      className={`h-7 w-7 ${step.iconColor} sm:h-8 sm:w-8`}
                    />
                  </div>
                </div>

                {/* Step label */}
                <div
                  className={`mb-3 inline-block rounded-full bg-gradient-to-r ${step.color} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs`}
                >
                  Step {step.number}
                </div>

                <h3 className="text-lg font-bold text-slate-800 sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500 sm:mt-3 sm:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
