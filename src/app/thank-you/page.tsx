import type { Metadata } from "next";
import CallButton from "@/components/CallButton";
import { SITE } from "@/lib/site";
import ConversionPing from "./ConversionPing";

export const metadata: Metadata = {
  title: `Thanks — ${SITE.name}`,
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <ConversionPing />
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint text-brand-dark">
          <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={3}>
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-ink">Thanks — your request is in.</h1>
        <p className="mt-4 text-lg text-muted">
          We&apos;ll review your site and get in touch to book a short call. After the call you&apos;ll get a
          custom SEO proposal with clear scope and pricing.
        </p>
        <p className="mt-8 text-sm text-muted">Prefer to talk now?</p>
        <CallButton
          placement="thank_you"
          className="mt-2 inline-flex items-center gap-2 rounded-md bg-brand-dark px-5 py-3 font-semibold text-white hover:bg-brand-deep"
        />
        <p className="mt-10">
          <a href={`${SITE.url}/case-studies/`} className="text-brand-dark underline underline-offset-4">
            Browse our SEO case studies while you wait
          </a>
        </p>
      </div>
    </main>
  );
}
