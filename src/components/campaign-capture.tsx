"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureCampaign } from "@/lib/campaign-attribution";

export function CampaignCapture() {
  const pathname = usePathname();
  const params = useSearchParams();
  useEffect(() => { captureCampaign(); }, [pathname, params]);
  return null;
}
