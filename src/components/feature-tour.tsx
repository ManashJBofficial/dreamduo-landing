"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "@/components/showcase.module.css";

const chapters = [
  {
    id: "dreams",
    label: "Dreams",
    title: "Start with a someday.",
    description:
      "Plan a trip, save for a home, or work on something just for you.",
    details: [
      "Amount, checklist, habit, or time",
      "Templates for shared or private dreams",
    ],
    image: "/dreamduo-dreams-phone.webp",
    width: 691,
    height: 864,
    alt: "DreamDuo Dreams screen with templates, collections, and shared plans",
  },
  {
    id: "milestones",
    label: "Milestones",
    title: "See the steps. Celebrate the progress.",
    description:
      "Track each step, add progress photos, and celebrate the wins together.",
    details: [
      "Notes that unlock at milestones",
      "Hidden contributions for a surprise later",
    ],
    image: "/dreamduo-milestones-phone.webp",
    width: 635,
    height: 1280,
    alt: "DreamDuo Food to Try dream with a progress bar and milestone timeline",
  },
  {
    id: "nudges",
    label: "Nudge Hub",
    title: "Miss them? Send a little love.",
    description:
      "Send a hug, kiss, or 'miss you' whenever your partner's on your mind.",
    details: [
      "Shake your phone to send a nudge",
      "Soundboard and image nudges",
      "Quick polls for your next decision",
    ],
    image: "/dreamduo-nudge-hub.webp",
    width: 596,
    height: 1200,
    alt: "DreamDuo Nudge Hub showing Miss you, Hug, Kiss, Love you, and Poke",
  },
  {
    id: "conversations",
    label: "Conversations",
    title: "Go beyond 'how was your day?'",
    description:
      "One question a day. Answer privately, then reveal your answers together.",
    details: [
      "Light, medium, or deep questions",
      "More question packs as your streak grows",
    ],
    image: "/dreamduo-daily-conversations.webp",
    width: 633,
    height: 1280,
    alt: "DreamDuo daily conversation showing a question and both partners' answers",
  },
  {
    id: "files",
    label: "Files",
    title: "Keep the good stuff together.",
    description:
      "Keep photos, links, and documents with the dream they belong to.",
    details: [
      "Save from Pinterest, YouTube, and other apps",
      "Hold and drag to reorder",
    ],
    image: "/dreamduo-files-phone.webp",
    width: 389,
    height: 768,
    alt: "DreamDuo Files screen with photos and saved Pinterest and YouTube links",
  },
] as const;

export function FeatureTour({ supporting }: { supporting: ReactNode }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function selectChapter(index: number, focus = false) {
    setActive(index);
    const button = buttons.current[index];
    const list = button?.parentElement;
    if (!button || !list) return;
    if (focus) button.focus({ preventScroll: true });
    const tabBounds = button.getBoundingClientRect();
    const listBounds = list.getBoundingClientRect();
    if (tabBounds.left < listBounds.left) list.scrollBy({ left: tabBounds.left - listBounds.left - 8 });
    else if (tabBounds.right > listBounds.right) list.scrollBy({ left: tabBounds.right - listBounds.right + 8 });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % chapters.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + chapters.length) % chapters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = chapters.length - 1;
    else return;
    event.preventDefault();
    selectChapter(next, true);
  }

  return (
    <div className={styles.tour}>
      <div className={styles.tabs} style={{ gridTemplateColumns: `repeat(${chapters.length}, minmax(0, 1fr))` }} role="tablist" aria-label="Explore DreamDuo features">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            ref={(element) => { buttons.current[index] = element; }}
            type="button"
            role="tab"
            id={`feature-tab-${chapter.id}`}
            aria-controls={`feature-panel-${chapter.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => selectChapter(index)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            className={`${styles.tab} home-tab`}
          >
            <span>{chapter.label}</span>
            <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
          </button>
        ))}
      </div>

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
          <div className={styles.copy}>
            <h3 className="home-subheading">{chapter.title}</h3>
            <p className={`${styles.description} home-body`}>{chapter.description}</p>
            <ul className={styles.details}>
              {chapter.details.map((detail) => <li key={detail} className="home-body">{detail}</li>)}
            </ul>
            <div className={styles.supporting}>{supporting}</div>
          </div>
          <figure className={`${styles.figure} ${styles[chapter.id]}`}>
            <div className={styles.imageStage}>
              <Image
                src={chapter.image}
                alt={chapter.alt}
                width={chapter.width}
                height={chapter.height}
                sizes="(max-width: 767px) 340px, (max-width: 1023px) 400px, 480px"
                loading="lazy"
                className={styles.phone}
              />
            </div>
          </figure>
        </div>
      ))}
    </div>
  );
}
