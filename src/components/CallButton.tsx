"use client";

import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

/** tel: link that records a phone_click event (placement = where on the page). */
export default function CallButton({
  className = "",
  label,
  placement,
  children,
}: {
  className?: string;
  label?: string;
  placement: string;
  children?: React.ReactNode;
}) {
  return (
    <a href={SITE.phoneHref} onClick={() => trackEvent("phone_click", { placement })} className={className}>
      {children ?? (
        <>
          <i aria-hidden className="fa-solid fa-phone" />
          <span>{label ?? SITE.phoneDisplay}</span>
        </>
      )}
    </a>
  );
}
