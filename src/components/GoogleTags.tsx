import Script from "next/script";
import { GTAG_ID } from "@/lib/tags";

// Loads gtag.js for the Google Ads tag (ID from src/lib/tags.ts, overridable via NEXT_PUBLIC_GTAG_ID).
export default function GoogleTags() {
  const id = GTAG_ID;
  if (!id || !/^(AW|G|GT)-[A-Z0-9]+$/.test(id)) return null; // also keeps the inline script safe
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
