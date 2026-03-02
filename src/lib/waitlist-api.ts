export type WaitlistStatus = "subscribed" | "pending" | "already";
type WaitlistSource = "landing" | "app" | "instagram" | "unknown";
type WaitlistPlatform = "web" | "android" | "ios" | "unknown";

interface WaitlistJoinRequestBody {
  email: string;
  source: WaitlistSource;
  platform: WaitlistPlatform;
  ref?: string;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
}

interface WaitlistJoinResponse {
  ok: boolean;
  status?: WaitlistStatus;
}

interface WaitlistCountResponse {
  count: number;
}

const WAITLIST_API_BASE_URL = (
  process.env.NEXT_PUBLIC_WAITLIST_API_BASE_URL ?? "/api"
).replace(/\/$/, "");

export async function joinWaitlist(input: {
  email: string;
  source?: WaitlistSource;
}): Promise<WaitlistStatus> {
  const email = input.email.trim().toLowerCase();
  if (!email) {
    throw new Error("invalid_email");
  }

  const response = await fetch(`${WAITLIST_API_BASE_URL}/v1/waitlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildJoinRequestBody(email, input.source ?? "landing"))
  });

  if (!response.ok) {
    throw new Error(`waitlist_request_failed_${response.status}`);
  }

  const payload = (await response.json()) as WaitlistJoinResponse;
  if (!payload.ok || !payload.status) {
    throw new Error("invalid_waitlist_response");
  }

  return payload.status;
}

export async function fetchWaitlistCount(): Promise<number> {
  const response = await fetch(`${WAITLIST_API_BASE_URL}/v1/waitlist/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`count_request_failed_${response.status}`);
  }

  const payload = (await response.json()) as WaitlistCountResponse;
  if (typeof payload.count !== "number" || Number.isNaN(payload.count)) {
    throw new Error("invalid_count_response");
  }

  return Math.max(0, Math.trunc(payload.count));
}

function buildJoinRequestBody(
  email: string,
  source: WaitlistSource
): WaitlistJoinRequestBody {
  const params = getQueryParams();
  const utm = pickUtm(params);
  const ref = params.get("ref")?.trim();

  return {
    email,
    source,
    platform: detectPlatform(),
    ...(ref ? { ref } : {}),
    ...(utm ? { utm } : {})
  };
}

function getQueryParams(): URLSearchParams {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
}

function pickUtm(params: URLSearchParams): WaitlistJoinRequestBody["utm"] {
  const utm = {
    utm_source: params.get("utm_source")?.trim(),
    utm_medium: params.get("utm_medium")?.trim(),
    utm_campaign: params.get("utm_campaign")?.trim(),
    utm_content: params.get("utm_content")?.trim(),
    utm_term: params.get("utm_term")?.trim()
  };

  const hasAny = Object.values(utm).some((value) => Boolean(value));
  return hasAny ? utm : undefined;
}

function detectPlatform(): WaitlistPlatform {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) {
    return "android";
  }

  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return "ios";
  }

  return "web";
}
