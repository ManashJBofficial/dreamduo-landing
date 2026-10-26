import Script from "next/script";

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;

  return (
    <>
      <script
        id="google-analytics-init"
        dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${id}');` }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    </>
  );
}
