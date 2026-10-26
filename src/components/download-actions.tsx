"use client";

import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { StoreBadge } from "@/components/store-badge";
import { DownloadQrCode } from "@/components/download-qr-code";
import { QrVisibility } from "@/components/qr-visibility";
import { detectDownloadPlatform, getDownloadQrUrl, getDownloadStoreUrl, readCampaign } from "@/lib/download-links";
import { trackDownload } from "@/lib/download-analytics";
import styles from "@/components/download-page.module.css";

export function DownloadActions() {
  const params = useSearchParams();
  return <DownloadPanel query={params.toString()} ready />;
}

export function DownloadPanel({ query = "", ready = false }: { query?: string; ready?: boolean }) {
  const campaign = useMemo(() => readCampaign(new URLSearchParams(query)), [query]);
  const viaQr = new URLSearchParams(query).get("via") === "qr";
  const lastVisit = useRef<string | null>(null);

  useEffect(() => {
    if (!ready) return;
    const platform = detectDownloadPlatform(navigator.userAgent, navigator.maxTouchPoints);
    if (lastVisit.current !== query) {
      lastVisit.current = query;
      trackDownload("download_view", campaign, { platform, via: viaQr ? "qr" : "link" });
      if (viaQr) trackDownload("download_qr_visit", campaign, { platform });
    }
    if (!viaQr || platform === "desktop") return;

    // Fallback for an iPad using a desktop UA without its usual Mobile token.
    // Standard phone/tablet scans redirect in Proxy before this page renders.
    trackDownload("download_redirect", campaign, { platform, via: "qr" });
    window.location.replace(getDownloadStoreUrl(platform, campaign));
  }, [campaign, query, ready, viaQr]);

  return (
    <div id="get-the-app" className={styles.actions}>
      <div className={styles.storeButtons}>
        <a
          href={getDownloadStoreUrl("ios", campaign)}
          onClick={() => trackDownload("download_store_click", campaign, { store: "app_store", platform: "ios", via: viaQr ? "qr" : "link" })}
          className={styles.storeButton}
          aria-label="Download DreamDuo on the App Store"
        >
          <StoreBadge store="app_store" />
        </a>
        <a
          href={getDownloadStoreUrl("android", campaign)}
          onClick={() => trackDownload("download_store_click", campaign, { store: "google_play", platform: "android", via: viaQr ? "qr" : "link" })}
          className={styles.storeButton}
          aria-label="Get DreamDuo on Google Play"
        >
          <StoreBadge store="google_play" />
        </a>
      </div>
      <QrVisibility>
        <div className={styles.qrCard}>
          <a href={getDownloadQrUrl(campaign)} className={styles.qrLink} aria-label="Open the shared DreamDuo download QR link">
            <DownloadQrCode value={getDownloadQrUrl(campaign)} size={300} />
          </a>
        </div>
      </QrVisibility>
    </div>
  );
}
