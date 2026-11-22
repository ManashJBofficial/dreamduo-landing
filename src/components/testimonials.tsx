import styles from "@/components/testimonials.module.css";

export function Testimonials() {
  return (
    <section id="story" aria-labelledby="story-heading" className={`home-section ${styles.section}`}>
      <div className="site-container">
        <div className={styles.note}>
          <h2 id="story-heading" className={`home-heading ${styles.heading}`}>
            For all the things we say we’ll do together.
          </h2>
          <p className={`home-body ${styles.description}`}>
            Some things start with “we should do that someday.” I built DreamDuo to help couples
            keep those plans in one place, break them into steps, and make them happen together.
          </p>
          <p className={styles.signature}>
            MJ Baruah · Founder, DreamDuo
          </p>
        </div>
      </div>
    </section>
  );
}
