import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Account Deletion",
  description:
    "Learn how to permanently delete your DreamDuo account and all associated data.",
  alternates: {
    canonical: "/account-deletion",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "DreamDuo account deletion",
    "delete couples app account",
    "remove relationship app data",
    "account deletion request",
  ],
  openGraph: {
    title: "Account Deletion",
    description:
      "Learn how to permanently delete your DreamDuo account and all associated data.",
    url: "/account-deletion",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DreamDuo Account Deletion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Deletion",
    description:
      "Learn how to permanently delete your DreamDuo account and all associated data.",
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
    { "@type": "ListItem", position: 2, name: "Account Deletion", item: "https://dreamduo.app/account-deletion" },
  ],
};

export default function AccountDeletionPage() {
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
              Account Deletion
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
              We believe you should always be in control of your data. Follow the
              steps below to permanently delete your DreamDuo account and all
              associated data.
            </p>

            {/* How to Delete Your Account */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                How to Delete Your Account
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                Follow these steps in the DreamDuo app:
              </p>
              <ol className="space-y-4">
                {[
                  { title: "Open the DreamDuo app", desc: "Launch DreamDuo on your device and sign in to your account." },
                  { title: "Go to Settings", desc: "Tap the Settings icon in the bottom navigation bar, or tap your profile icon." },
                  { title: "Scroll to Account section", desc: "Scroll down until you find the \"Account\" heading in Settings." },
                  { title: "Tap Delete Account", desc: "Select the Delete Account option to begin the deletion process." },
                  { title: "Confirm by typing DELETE", desc: "When prompted, type DELETE in all caps to confirm you want to proceed." },
                  { title: "7-day grace period begins", desc: "Your account will enter a 7-day grace period before permanent deletion." },
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600 sm:size-9 sm:text-base">
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-1">
                      <p className="text-sm font-semibold text-slate-800 sm:text-base">
                        {step.title}
                      </p>
                      <p className="text-sm leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Grace Period Warning Box */}
            <section className="mt-10">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5 sm:px-7 sm:py-6">
                <h3 className="text-sm font-semibold text-amber-800 sm:text-base">
                  Important: 7-Day Grace Period
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-amber-700 sm:text-base">
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0">⏳</span>
                    <span>
                      After requesting deletion, your account enters a{" "}
                      <strong>7-day grace period</strong>.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0">↩️</span>
                    <span>
                      You can restore your account within these 7 days by opening
                      the app and tapping <strong>"Restore Account"</strong>.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0">⚠️</span>
                    <span>
                      After 7 days, your account and{" "}
                      <strong>all data is permanently and irreversibly deleted</strong>.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0">🚫</span>
                    <span>
                      Once permanently deleted, <strong>we cannot recover</strong>{" "}
                      your account or any of your data.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* What Data Gets Deleted */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                What Data Gets Deleted
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                All of the following is permanently deleted after the 7-day grace
                period:
              </p>
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-5 sm:px-7 sm:py-6">
                <ul className="space-y-3">
                  {[
                    "Your profile and personal information",
                    "All relationship questions answered",
                    "Goals and mood check-ins",
                    "Messages and couple connection history",
                    "Collections and saved content",
                    "Subscription information (managed via RevenueCat)",
                    "Push notification tokens",
                    "All couple connection data",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-emerald-800 sm:text-base">
                      <svg
                        className="mt-0.5 size-5 shrink-0 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Data You Can Export */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                Export Your Data Before Deleting
              </h2>
              <div className="rounded-2xl border border-rose-100 bg-rose-50 px-5 py-5 sm:px-7 sm:py-6">
                <ul className="space-y-3 text-sm text-slate-600 sm:text-base">
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-rose-500">📦</span>
                    <span>
                      Before deleting, you can{" "}
                      <strong>export your personal data</strong> as a ZIP file.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-rose-500">⚙️</span>
                    <span>
                      How: <strong>Settings → Export Data → Personal Export</strong>
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-rose-500">🔒</span>
                    <span>Rate limit: Up to <strong>3 exports per 24 hours</strong>.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-rose-500">💑</span>
                    <span>
                      Couple data export also available if still connected to a
                      partner.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Deletion Timeline */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                Data Deletion Timeline
              </h2>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-sm sm:text-base">
                  <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3 sm:px-6">Action</th>
                      <th className="px-4 py-3 sm:px-6">Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      {
                        action: "Account deletion requested",
                        timeline: "Immediately — all sessions invalidated",
                      },
                      {
                        action: "Grace period",
                        timeline: "7 days — account restorable",
                      },
                      {
                        action: "Permanent deletion",
                        timeline: "After 7 days — all data hard-deleted",
                      },
                      {
                        action: "Subscription cancellation",
                        timeline: "Managed separately via Google Play Store",
                      },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-medium text-slate-800 sm:px-6">
                          {row.action}
                        </td>
                        <td className="px-4 py-3 text-slate-600 sm:px-6">
                          {row.timeline}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Delete Data Without Deleting Account */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                Delete Data Without Deleting Your Account
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                You can delete individual content items (goals, messages,
                collections, photos, etc.) directly within the app without
                deleting your entire account.{" "}
                <Link
                  href="/data-deletion"
                  className="font-semibold text-rose-500 hover:text-rose-600"
                >
                  Learn more about data deletion options →
                </Link>
              </p>
            </section>

            {/* Contact Section */}
            <section className="mt-10 space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                Need Help?
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                If you have questions or need assistance with the deletion process,
                please contact us.
              </p>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:px-6">
                <p className="text-sm text-slate-600 sm:text-base">
                  Email:{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-rose-500 hover:text-rose-600"
                  >
                    {contactEmail}
                  </a>
                </p>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  If you cannot access the app to delete your account, email us
                  and we will manually process your deletion request within 30
                  days.
                </p>
              </div>
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
