import { Flame, ChartNoAxesCombined } from "lucide-react";
import { FeatureTour } from "@/components/feature-tour";
import styles from "@/components/showcase.module.css";

export function Showcase() {
  return (
    <section id="features" aria-labelledby="features-heading" className={styles.section}>
      <div className="site-container">
        <header className={styles.header}>
          <div>
            <p className="home-eyebrow">INSIDE DREAMDUO</p>
            <h2 id="features-heading" className="home-heading">Make a plan. Stay close along the way.</h2>
          </div>
        </header>

        <FeatureTour supporting={
          <dl className={styles.notes}>
            <div>
              <dt className="home-note-heading"><Flame size={19} strokeWidth={1.5} aria-hidden="true" />Keep your streak.</dt>
              <dd className="home-body">
                Build a couple streak and unlock new question packs.
              </dd>
            </div>
            <div>
              <dt className="home-note-heading"><ChartNoAxesCombined size={19} strokeWidth={1.5} aria-hidden="true" />See your progress.</dt>
              <dd className="home-body">
                Track dreams and savings. Pro adds mood trends and activity heatmaps.
              </dd>
            </div>
          </dl>
        } />
      </div>
    </section>
  );
}
