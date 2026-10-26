"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { detectQrDevice } from "@/lib/download-links";
import styles from "@/components/qr-visibility.module.css";

function subscribe() {
  return () => {};
}

function getDeviceSnapshot() {
  return detectQrDevice(navigator.userAgent, navigator.maxTouchPoints);
}

function getServerSnapshot() {
  return "unknown" as const;
}

export function QrVisibility({ children }: { children: ReactNode }) {
  const device = useSyncExternalStore<ReturnType<typeof detectQrDevice> | "unknown">(
    subscribe,
    getDeviceSnapshot,
    getServerSnapshot,
  );

  return <div className={styles.visibility} data-qr-device={device}>{children}</div>;
}
