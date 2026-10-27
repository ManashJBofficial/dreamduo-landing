"use client";

import { useCampaign } from "@/lib/campaign-attribution";
import { getDownloadStoreUrl } from "@/lib/download-links";
import { trackDownload } from "@/lib/download-analytics";

export function StoreTextLink({ platform, className, children }: {
  platform: "ios" | "android";
  className?: string;
  children: React.ReactNode;
}) {
  const campaign = useCampaign("footer");
  return <a href={getDownloadStoreUrl(platform, campaign)} target="_blank" rel="noopener" className={className}
    onClick={() => trackDownload("download_store_click", campaign, {
      placement: "footer", platform, store: platform === "ios" ? "app_store" : "google_play",
    })}>{children}</a>;
}
