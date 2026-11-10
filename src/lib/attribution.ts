// Captures Google Ads click IDs + UTMs from the landing URL and keeps them for 90 days
// (Google's max click-through conversion window), so a visitor who browses around
// or comes back later is still attributed to the click when they submit the form.

export const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey | "landing_page" | "referrer", string>>;

const STORAGE_KEY = "jtd_attribution";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

function readStored(): Attribution {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const { savedAt, data } = JSON.parse(raw) as { savedAt: number; data: Attribution };
    return Date.now() - savedAt < TTL_MS ? data : {};
  } catch {
    return {};
  }
}

/**
 * Returns attribution for this visit. If the current URL carries any click ID or UTM,
 * it replaces what was stored (last paid touch wins — same as Google Ads attribution).
 */
export function captureAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Attribution = {};
  for (const k of ATTRIBUTION_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v.slice(0, 500);
  }

  if (Object.keys(fromUrl).length === 0) {
    const stored = readStored();
    return {
      landing_page: window.location.pathname,
      referrer: document.referrer.slice(0, 500),
      ...stored,
    };
  }

  const data: Attribution = {
    ...fromUrl,
    landing_page: window.location.pathname,
    referrer: document.referrer.slice(0, 500),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Private mode / blocked storage: hidden fields still get this page's values.
  }
  return data;
}
