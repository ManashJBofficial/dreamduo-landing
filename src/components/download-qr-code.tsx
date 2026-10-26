"use client";

import { QRCodeSVG } from "qrcode.react";
import { getDownloadQrUrl } from "@/lib/download-links";

export function DownloadQrCode({ value = getDownloadQrUrl(), size = 144 }: { value?: string; size?: number }) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      level="M"
      marginSize={4}
      bgColor="#ffffff"
      fgColor="#28152b"
      title="Scan to download DreamDuo on iPhone or Android"
      role="img"
    />
  );
}
