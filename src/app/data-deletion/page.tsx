import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Data Deletion",
  description:
    "Learn how to delete your data from DreamDuo without deleting your account.",
  alternates: {
    canonical: "/data-deletion",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "DreamDuo data deletion",
    "delete relationship app data",
    "remove couples app content",
    "data export couples app",
  ],
  openGraph: {
    title: "Data Deletion",
    description:
      "Learn how to delete your data from DreamDuo without deleting your account.",
    url: "/data-deletion",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DreamDuo Data Deletion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Deletion",
    description:
      "Learn how to delete your data from DreamDuo without deleting your account.",
    images: ["/opengraph-image"],
  },
};

const lastUpdated = "June 2026";
const contactEmail = "support@dreamduo.app";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dreamduo.app" },
    { "@type": "ListItem", position: 2, name: "Data Deletion", item: "https://dreamduo.app/data-deletion" },
  ],
};

export default function DataDeletionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen bg-white px-2 pb-2 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4"
      >
        <Navbar />

        <section className="bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500">
              Legal
            </span>
            <h1 className="mt-3 font-serif text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
              Data Deletion
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
              You can delete your data from DreamDuo without permanently deleting
              your account. This page explains all available options.
            </p>

            {/* 1. Delete Individual Items */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                1. Delete Individual Items In-App
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                You can delete specific content directly within the DreamDuo app
                at any time:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 sm:text-base">
                <li>
                  <strong>Goals</strong> — Open any goal and tap the delete
                  option
                </li>
                <li>
                  <strong>Messages</strong> — Long-press any message to delete
                  it
                </li>
                <li>
                  <strong>Collections</strong> — Remove items from your saved
                  collections
                </li>
                <li>
                  <strong>Profile information</strong> — Edit or clear fields in
                  Settings → Profile
                </li>
                <li>
                  <strong>Uploaded files and photos</strong> — Remove them from
                  their respective sections in the app
                </li>
              </ul>
            </section>

            {/* 2. Export Your Data */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                2. Export Your Data First
              </h2>
              <div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-5 sm:px-7 sm:py-6">
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  Before deleting anything, we recommend exporting a copy of your
                  data so you don&apos;t lose anything important.
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 sm:text-base">
                  <li>
                    Go to <strong>Settings → Export Data → Personal Export</strong>
                  </li>
                  <li>You&apos;ll receive a ZIP file containing all your personal data</li>
                  <li>
                    Rate limit: <strong>Up to 3 exports per 24 hours</strong>
                  </li>
                  <li>
                    If you&apos;re connected to a partner, couple data export is
                    also available
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Full Account Deletion */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                3. Delete Your Account (Removes All Data)
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                To permanently remove all your data at once, you can delete your
                entire DreamDuo account. This triggers a 7-day grace period after
                which all data is permanently erased.
              </p>
              <Link
                href="/account-deletion"
                className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500 hover:text-rose-600 sm:text-base"
              >
                View account deletion instructions →
              </Link>
            </section>

            {/* 4. Contact Support */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                4. Request Data Deletion via Support
              </h2>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-5 sm:px-7 sm:py-6">
                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  If you need specific data deleted and cannot do it through the
                  app, email us at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-rose-500 hover:text-rose-600"
                  >
                    {contactEmail}
                  </a>{" "}
                  with details of what you&apos;d like removed. We will process
                  your request within 30 days.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                Data Retention
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                When you delete individual items in the app, they are removed from
                our systems promptly. Some anonymized or aggregated data may be
                retained for analytics purposes. For complete erasure of all
                personal data, please use the{" "}
                <Link
                  href="/account-deletion"
                  className="font-semibold text-rose-500 hover:text-rose-600"
                >
                  account deletion process
                </Link>
                .
              </p>
            </section>

            {/* Footer Note */}
            <p className="mt-10 border-t border-slate-100 pt-6 text-xs leading-relaxed text-slate-400 sm:text-sm">
              This page is provided in compliance with Google Play Store
              requirements and applicable data protection regulations including
              GDPR.{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-rose-500 hover:text-rose-600"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
