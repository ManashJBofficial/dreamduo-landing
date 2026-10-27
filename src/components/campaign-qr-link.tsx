"use client";

import { DownloadQrCode } from "@/components/download-qr-code";
import { QrVisibility } from "@/components/qr-visibility";
import { useCampaign } from "@/lib/campaign-attribution";
import { getDownloadQrUrl } from "@/lib/download-links";

export function CampaignQrLink({ placement, size, className, label }: {
  placement: string;
  size: number;
  className?: string;
  label?: string;
}) {
  const url = getDownloadQrUrl(useCampaign(placement));
  return <QrVisibility>
    <a href={url} className={className} aria-label="Download DreamDuo: one QR code for iPhone and Android">
      <DownloadQrCode value={url} size={size} />
      {label && <span className="home-small">{label}</span>}
    </a>
  </QrVisibility>;
}
