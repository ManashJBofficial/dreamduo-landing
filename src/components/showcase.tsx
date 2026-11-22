import { FeatureTour } from "@/components/feature-tour";
import styles from "@/components/showcase.module.css";

export function Showcase() {
  return (
    <section id="features" aria-labelledby="features-heading" className={styles.section}>
      <div className={styles.container}>
        <h2 id="features-heading" className="home-heading text-center">Inside DreamDuo</h2>
        <FeatureTour />
      </div>
    </section>
  );
}
