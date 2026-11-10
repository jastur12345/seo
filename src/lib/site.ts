// Business facts used across landing pages. Every claim here is published on
// jasonturtoga.com (checked 2026-11-10) — keep it that way; ads and LPs must agree.

const phone = process.env.NEXT_PUBLIC_PHONE ?? "+639626707683";

export const SITE = {
  name: "Jason Turtoga Digital",
  url: "https://jasonturtoga.com",
  // Override per deploy with NEXT_PUBLIC_PHONE / NEXT_PUBLIC_PHONE_DISPLAY.
  phoneHref: `tel:${phone}`,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+ (63) 962 670 7683",
} as const;

/** Absolute link to a page on the main WordPress site. */
export const wp = (path: string) => `${SITE.url}${path}`;

export const BUDGETS = [
  "$3,000 – $5,000 / mo",
  "$5,000 – $10,000 / mo",
  "$10,000 – $25,000 / mo",
  "$25,000 – $50,000 / mo",
  "$50,000+ / mo",
] as const;
