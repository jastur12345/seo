"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

// Fires the Google Ads conversion once gtag is ready. Only fires when the URL carries a
// lead id (set by LeadForm after a successful /api/lead), and passes it as transaction_id
// so Google drops duplicates if the page is refreshed or revisited.
export default function ConversionPing() {
  useEffect(() => {
    const lid = new URLSearchParams(window.location.search).get("lid");
    if (!lid) return;
    let tries = 0;
    const t = window.setInterval(() => {
      if (trackConversion(lid) || ++tries > 40) window.clearInterval(t); // up to ~10s for gtag to load
    }, 250);
    return () => window.clearInterval(t);
  }, []);
  return null;
}
