const rawWaitlistFlag =
  process.env.NEXT_PUBLIC_WAITLIST_ENABLED?.toLowerCase().trim() ?? "";

export const WAITLIST_ENABLED =
  rawWaitlistFlag === "true" || rawWaitlistFlag === "1" || rawWaitlistFlag === "yes";
