// Thin wrappers around gtag. Every function is a safe no-op when the tag isn't
// configured (NEXT_PUBLIC_GTAG_ID unset) or is blocked by an ad blocker.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires the Google Ads lead conversion. transactionId dedupes refreshes of /thank-you. */
export function trackConversion(transactionId?: string): boolean {
  const sendTo = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  if (!sendTo || typeof window === "undefined" || !window.gtag) return false;
  window.gtag("event", "conversion", {
    send_to: sendTo,
    ...(transactionId ? { transaction_id: transactionId } : {}),
  });
  return true;
}

/** Generic event (e.g. phone_click). Not a conversion unless you import it as one. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
