"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { StoreCTARow } from "@/components/store-cta-row";
import { dreamCategories } from "@/lib/goal-categories";
import styles from "@/components/goal-category-dialog.module.css";

export function GoalCategoryDialog({
  categoryIndex,
  open,
  onClose,
  onReturnFocus,
}: {
  categoryIndex: number;
  open: boolean;
  onClose: () => void;
  onReturnFocus: () => void;
}) {
  const category = dreamCategories[categoryIndex];
  const Icon = category.icon;

  return (
    <Dialog.Root open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          aria-modal="true"
          className={styles.dialog}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onReturnFocus();
          }}
        >
          <Dialog.Close className={styles.close} aria-label="Close dream details">
            <X size={20} aria-hidden="true" />
          </Dialog.Close>

          <div className={styles.body}>
            <div className={styles.copy}>
              <p className={styles.category}>
                <Icon size={18} strokeWidth={1.75} color={category.accent} aria-hidden="true" />
                {category.label}
              </p>
              <Dialog.Title className={styles.title}>{category.headline}</Dialog.Title>
              <Dialog.Description className={styles.description}>{category.description}</Dialog.Description>
            </div>

            <figure className={styles.figure}>
              <div className={styles.stage}>
                <Image
                  key={category.image.src}
                  src={category.image.src}
                  width={category.image.width}
                  height={category.image.height}
                  alt={category.image.alt}
                  sizes="(min-width: 768px) 360px, 320px"
                  loading="lazy"
                  className={styles.phone}
                />
              </div>
              <figcaption className={styles.caption}>
                {category.image.caption}
              </figcaption>
            </figure>
            <StoreCTARow variant="hero" placement="dream_modal" className={styles.stores} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
