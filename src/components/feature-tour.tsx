"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { DeferredFeatureImage } from "@/components/deferred-feature-image";
import styles from "@/components/showcase.module.css";

const chapters = [
  {
    id: "milestones",
    label: "Dreams & milestones",
    mobileLabel: "Dreams",
    description: "Make a shared checklist for anything from dinners to big plans. See what's next and what you've finished.",
    image: "/app-screens/food-checklist.webp",
    optimizedId: "food-checklist",
    width: 640,
    height: 1321,
    alt: "DreamDuo Food to Try checklist showing shared cooking tasks and progress",
  },
  {
    id: "files",
    label: "Files & links",
    mobileLabel: "Files",
    description: "Keep saved links, photos, and files with the plan they belong to.",
    image: "/app-screens/trip-resources.webp",
    optimizedId: "trip-resources",
    width: 640,
    height: 1322,
    alt: "DreamDuo trip resources tab showing saved Pinterest and YouTube links for Japan",
  },
  {
    id: "nudges",
    label: "Nudges",
    mobileLabel: "Nudges",
    description: "Send a hug, a quick poll, or a little “miss you” when you're apart.",
    image: "/app-screens/nudge-hub.webp",
    optimizedId: "nudge-hub",
    width: 640,
    height: 1321,
    alt: "DreamDuo Nudge Hub with Miss you, Hug, Kiss, photo, sound, and poll options",
  },
  {
    id: "conversations",
    label: "Conversations",
    mobileLabel: "Questions",
    description: "Answer a daily question privately, then see both answers once you've both replied.",
    image: "/dreamduo-daily-conversations.webp",
    optimizedId: "conversations",
    width: 633,
    height: 1280,
    alt: "DreamDuo daily conversation showing a question and both partners' answers",
  },
] as const;

function subscribeLayout(listener: () => void) {
  const query = window.matchMedia("(min-width: 768px)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}

function isVerticalLayout() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function serverLayout() {
  return true;
}

export function FeatureTour() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const vertical = useSyncExternalStore(subscribeLayout, isVerticalLayout, serverLayout);

  function selectChapter(index: number, focus = false) {
    setActive(index);
    const button = buttons.current[index];
    if (!button) return;
    if (focus) {
      button.focus({ preventScroll: true });
      if (vertical) button.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) next = (index + 1) % chapters.length;
    else if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) next = (index - 1 + chapters.length) % chapters.length;
    else if (!vertical && (event.key === "ArrowDown" || event.key === "ArrowUp")) next = (index + 2) % chapters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = chapters.length - 1;
    else return;
    event.preventDefault();
    selectChapter(next, true);
  }

  return (
    <div className={styles.tour}>
      <div className={styles.tabs} role="tablist" aria-label="Explore DreamDuo features"
        aria-orientation={vertical ? "vertical" : "horizontal"}>
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            ref={(element) => { buttons.current[index] = element; }}
            type="button"
            role="tab"
            id={`feature-tab-${chapter.id}`}
            aria-label={chapter.label}
            aria-describedby={vertical && active === index ? `feature-description-${chapter.id}` : undefined}
            aria-controls={`feature-panel-${chapter.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => selectChapter(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            className={styles.tab}
          >
            <span className={styles.tabLabel}>{chapter.label}</span>
            <span className={styles.mobileLabel} aria-hidden="true">{chapter.mobileLabel}</span>
            <span id={`feature-description-${chapter.id}`} hidden={active !== index} className={styles.rowDescription}>
              {chapter.description}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            role="tabpanel"
            id={`feature-panel-${chapter.id}`}
            aria-labelledby={`feature-tab-${chapter.id}`}
            hidden={active !== index}
            tabIndex={0}
            className={styles.panel}
          >
            <div className={styles.mobileCopy}>
              <p className={styles.mobileDescription}>{chapter.description}</p>
            </div>
            {active === index && (
              <figure className={styles.figure}>
                <div className={styles.imageStage}>
                  <DeferredFeatureImage
                    id={chapter.optimizedId}
                    src={chapter.image}
                    alt={chapter.alt}
                    width={chapter.width}
                    height={chapter.height}
                    className={styles.phone}
                  />
                </div>
              </figure>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
