import Script from "next/script";

// Loads gtag.js for the Google Ads tag. Renders nothing until NEXT_PUBLIC_GTAG_ID is set
// (written by the conversion-tracking SOP into .env.local).
export default function GoogleTags() {
  const id = process.env.NEXT_PUBLIC_GTAG_ID;
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
