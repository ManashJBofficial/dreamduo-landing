import styles from "@/components/feature-highlights.module.css";

function RepliesIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M29 24h21a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-3l-8 7v-7H29a8 8 0 0 1-8-8V32a8 8 0 0 1 8-8Z" fill="#c4a4e6" />
      <path d="M13 7h21a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H23l-10 8v-8a9 9 0 0 1-9-9V16a9 9 0 0 1 9-9Z" fill="#75499b" />
      <path d="M13 18h19m-19 8h12" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="m39 40 4 4 7-8" fill="none" stroke="#462261" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NudgeIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path d="M32 9c10 0 17 8 17 18v7c0 5 2 8 6 12H9c4-4 6-7 6-12v-7c0-10 7-18 17-18Z" fill="#f6b9d1" stroke="#a82c61" strokeWidth="3" strokeLinejoin="round" />
      <path d="M26 53a6 6 0 0 0 12 0" fill="none" stroke="#a82c61" strokeWidth="3" strokeLinecap="round" />
      <path d="m32 38-8-8a5.5 5.5 0 0 1 8-7 5.5 5.5 0 0 1 8 7Z" fill="#a82c61" />
    </svg>
  );
}

function PlansIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect x="9" y="15" width="44" height="39" rx="8" fill="#f3cdac" />
      <path d="M17 15h28a8 8 0 0 1 8 8v4H9v-4a8 8 0 0 1 8-8Z" fill="#b46d40" />
      <path d="M20 10v10m22-10v10" fill="none" stroke="#793f27" strokeWidth="4" strokeLinecap="round" />
      <path d="m20 39 5 5 10-10" fill="none" stroke="#793f27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="47" r="9" fill="#b46d40" />
      <path d="M50 52c-2-2-5-4-5-6a3 3 0 0 1 5-2 3 3 0 0 1 5 2c0 2-3 4-5 6Z" fill="#fff0e5" />
    </svg>
  );
}

const highlights = [
  { icon: RepliesIcon, title: "Daily questions", description: "Answer a question privately, then see what you both wrote." },
  { icon: NudgeIcon, title: "Little nudges", description: "Send a hug or a quick “miss you” when you’re apart." },
  { icon: PlansIcon, title: "Shared plans", description: "Save date ideas, plan trips, and track your goals together." },
];

export function FeatureHighlights() {
  return (
    <section aria-labelledby="feature-highlights-heading" className={styles.section}>
      <h2 id="feature-highlights-heading" className="sr-only">What you can do in DreamDuo</h2>
      <div className="site-container">
        <ul role="list" className={styles.list}>
          {highlights.map(({ icon: Icon, title, description }) => (
            <li key={title} className={styles.item}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
