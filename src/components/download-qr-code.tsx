"use client";

import dynamic from "next/dynamic";
import { getDownloadQrUrl } from "@/lib/download-links";
import { useQrDevice } from "@/components/qr-visibility";

const QRCodeSVG = dynamic(() => import("qrcode.react").then(module => module.QRCodeSVG), { ssr: false });

export function DownloadQrCode({ value = getDownloadQrUrl(), size = 144 }: { value?: string; size?: number }) {
  const device = useQrDevice();
  // Reserve the same square during hydration. Phones never download or execute
  // the QR encoder, while tablet/desktop codes retain campaign attribution.
  return (
    <span className="download-qr" style={{ display: "block", width: size, aspectRatio: "1", background: "#fff" }}>
      {device !== "unknown" && device !== "phone" && <QRCodeSVG
        value={value}
        size={size}
        level="M"
        marginSize={4}
        bgColor="#ffffff"
        fgColor="#28152b"
        title="Scan to download DreamDuo on iPhone or Android"
        role="img"
        style={{ width: "100%", height: "auto", display: "block" }}
      />}
    </span>
  );
}
