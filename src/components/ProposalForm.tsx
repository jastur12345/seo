"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ATTRIBUTION_KEYS, captureAttribution, type Attribution } from "@/lib/attribution";
import { BUDGETS } from "@/lib/site";

const nonEmpty = (o: Record<string, string>) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== ""));

// Looks like the site's one-line FluentForm ("Enter your website" + "Get My FREE Proposal").
// First submit expands it in place to 3 more fields (name, work email, budget) — 4 total.
// Hidden: gclid / gbraid / wbraid, 5 UTMs, landing page, referrer, plus a honeypot.

const HIDDEN_KEYS = [...ATTRIBUTION_KEYS, "landing_page", "referrer"] as const;

export default function ProposalForm({
  label,
  variant = "light",
  id,
}: {
  label: string;
  variant?: "light" | "dark";
  id?: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const attrRef = useRef<Attribution>({});

  // Fill the hidden inputs from the URL (or stored attribution) once, in the browser.
  // The inputs are left uncontrolled (no value/defaultValue prop) so React re-renders —
  // e.g. when the form expands — never reset them; attrRef is a second copy for the payload.
  useEffect(() => {
    const attr = captureAttribution();
    attrRef.current = attr;
    for (const k of HIDDEN_KEYS) {
      const el = formRef.current?.elements.namedItem(k);
      if (el instanceof HTMLInputElement) el.value = attr[k] ?? "";
    }
  }, []);

  useEffect(() => {
    if (open) nameRef.current?.focus();
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...attrRef.current, ...nonEmpty(data), form: label }),
      });
      const body = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok || !body.id) throw new Error(body.error || "Something went wrong.");
      router.push(`/thank-you/?label=${encodeURIComponent(label)}&lid=${encodeURIComponent(body.id)}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const submitText = status === "sending" ? "Sending…" : "Get My FREE Proposal";

  return (
    <form ref={formRef} id={id} onSubmit={onSubmit} className={`pf pf--${variant}${open ? " is-open" : ""}`}>
      <div className="pf-row">
        <label className="sr-only" htmlFor={`${label}-website`}>
          Your website
        </label>
        <input
          id={`${label}-website`}
          name="website"
          required
          inputMode="url"
          autoComplete="url"
          placeholder="Enter your website"
          maxLength={200}
          className="pf-input"
        />
        {!open && (
          <button type="submit" className="pf-btn">
            {submitText}
          </button>
        )}
      </div>

      {open && (
        <div className="pf-more">
          <label className="sr-only" htmlFor={`${label}-name`}>
            Full name
          </label>
          <input ref={nameRef} id={`${label}-name`} name="name" required autoComplete="name" maxLength={100} placeholder="Full name" className="pf-input" />
          <label className="sr-only" htmlFor={`${label}-email`}>
            Work email
          </label>
          <input id={`${label}-email`} name="email" type="email" required autoComplete="email" maxLength={200} placeholder="Work email" className="pf-input" />
          <label className="sr-only" htmlFor={`${label}-budget`}>
            Monthly SEO budget
          </label>
          <select id={`${label}-budget`} name="budget" required defaultValue="" className="pf-input">
            <option value="" disabled>
              Monthly SEO budget
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <button type="submit" disabled={status === "sending"} className="pf-btn pf-btn--full">
            {submitText}
          </button>
          <p className="pf-note">No obligation. Just a clear, custom plan with no hidden fees.</p>
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="pf-error">
          {error}
        </p>
      )}

      {HIDDEN_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} />
      ))}
      <div aria-hidden className="pf-hp">
        <label>
          Company fax
          <input type="text" name="company_fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </form>
  );
}
