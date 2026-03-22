import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how DreamDuo collects, uses, and protects your information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how DreamDuo collects, uses, and protects your information.",
    url: "/privacy-policy",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description:
      "Learn how DreamDuo collects, uses, and protects your information.",
  },
};

const lastUpdated = "March 22, 2026";
const contactEmail = "support@dreamduo.app";

export default function PrivacyPolicyPage() {
  return (
    <>
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-slate-500 sm:text-base">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                DreamDuo ("DreamDuo," "we," "our," or "us") provides a mobile
                app, website, and related services designed to help couples and
                individuals manage goals, save memories, build habits, answer daily
                questions, and stay connected.
              </p>
              <p>
                This Privacy Policy explains what information we collect, how we
                use it, when we share it, and the choices available to you when you
                use DreamDuo&apos;s website, mobile application, and related services
                (collectively, the "Services").
              </p>
              <p>By using DreamDuo, you agree to this Privacy Policy.</p>
            </div>

            <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-600 sm:text-base">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  1. Information We Collect
                </h2>
                <p>We may collect the following categories of information:</p>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      A. Information You Provide Directly
                    </h3>
                    <p>
                      When you create or use a DreamDuo account, you may provide
                      information such as:
                    </p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      <li>your name</li>
                      <li>email address</li>
                      <li>profile photo or avatar</li>
                      <li>password, if you sign up with email and password</li>
                      <li>relationship start date</li>
                      <li>timezone and onboarding details</li>
                      <li>
                        goals, milestones, progress updates, notes, reminders,
                        messages, daily question answers, check-ins, moods, and
                        other content you create in the app
                      </li>
                      <li>photos, documents, and other files you upload</li>
                      <li>
                        information you provide when inviting, linking, or
                        connecting with a partner
                      </li>
                      <li>
                        feedback, support requests, or other communications you
                        send to us
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      B. Information Collected Automatically
                    </h3>
                    <p>
                      When you use the Services, we may automatically collect
                      certain technical and usage information, such as:
                    </p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      <li>device type</li>
                      <li>operating system</li>
                      <li>app version</li>
                      <li>IP address</li>
                      <li>log data and diagnostic information</li>
                      <li>usage activity and session information</li>
                      <li>notification token or device token for push notifications</li>
                      <li>
                        timestamps relating to account activity and feature usage
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      C. Information from Third Parties
                    </h3>
                    <p>
                      If you sign in or interact with DreamDuo through a
                      third-party provider, such as Google, we may receive basic
                      account information from that provider, such as your name,
                      email address, and profile image, subject to the permissions
                      you grant.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  2. Camera, Photos, and Files
                </h2>
                <p>
                  DreamDuo may request access to your device camera, photo library,
                  media, or files only when you choose to use features that
                  require them, such as:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>taking a photo inside the app</li>
                  <li>uploading a profile image</li>
                  <li>attaching progress photos</li>
                  <li>uploading documents, memories, or other files</li>
                </ul>
                <p>
                  You may deny these permissions, but some features may not
                  function properly without them.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  3. How We Use Your Information
                </h2>
                <p>We may use your information to:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>create and manage your account</li>
                  <li>authenticate you and keep your account secure</li>
                  <li>connect you with your partner or process partner invitations</li>
                  <li>
                    provide goal tracking, milestones, daily questions, check-ins,
                    reminders, shared spaces, and other DreamDuo features
                  </li>
                  <li>store and display content you upload</li>
                  <li>
                    send service-related notifications, reminders, updates, and
                    alerts
                  </li>
                  <li>personalize the app experience</li>
                  <li>operate, maintain, troubleshoot, and improve the Services</li>
                  <li>
                    monitor performance, detect bugs, prevent abuse, and protect
                    the security of the Services
                  </li>
                  <li>comply with legal obligations and enforce our terms and policies</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  4. Shared Couple Features
                </h2>
                <p>
                  DreamDuo includes features designed for shared use between
                  linked partners. If you connect your account with a partner,
                  certain content you create may be visible to that partner within
                  your shared DreamDuo space.
                </p>
                <p>This may include, depending on the feature:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>shared goals and milestones</li>
                  <li>progress updates</li>
                  <li>messages and support-related interactions</li>
                  <li>daily question participation</li>
                  <li>check-ins and streak-related activity</li>
                  <li>files or images intentionally shared within the couple space</li>
                  <li>
                    hidden messages, notes, or milestone-based content when
                    unlocked by the feature design
                  </li>
                </ul>
                <p>
                  Please only upload or share content that you are comfortable
                  sharing with your linked partner.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  5. Notifications
                </h2>
                <p>
                  If you enable notifications, DreamDuo may send push notifications
                  related to:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>reminders</li>
                  <li>goal updates</li>
                  <li>milestone events</li>
                  <li>daily questions</li>
                  <li>partner activity</li>
                  <li>other app-related alerts</li>
                </ul>
                <p>
                  You can manage notification preferences through your device
                  settings and, where available, inside the app.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  6. How We Store and Protect Information
                </h2>
                <p>
                  We use reasonable administrative, technical, and organizational
                  safeguards to help protect your information. However, no method
                  of transmission over the internet or method of electronic
                  storage is completely secure, and we cannot guarantee absolute
                  security.
                </p>
                <p>
                  Your content and account information may be stored and processed
                  on secure servers and cloud infrastructure used to operate
                  DreamDuo.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  7. When We Share Information
                </h2>
                <p>We may share information in the following situations:</p>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      A. With Your Linked Partner
                    </h3>
                    <p>
                      If you use couple or shared features, content associated with
                      those features may be visible to your linked partner as part
                      of the intended functionality of the Services.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      B. With Service Providers
                    </h3>
                    <p>
                      We may use third-party service providers to help us operate
                      DreamDuo, such as providers for:
                    </p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      <li>authentication</li>
                      <li>cloud hosting and storage</li>
                      <li>databases</li>
                      <li>file handling</li>
                      <li>notifications</li>
                      <li>analytics</li>
                      <li>error monitoring</li>
                      <li>customer support</li>
                      <li>payment processing</li>
                    </ul>
                    <p>
                      These providers may process information on our behalf only as
                      needed to provide their services to us.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      C. For Legal Reasons
                    </h3>
                    <p>
                      We may disclose information if required to do so by law,
                      regulation, legal process, or governmental request, or when we
                      believe disclosure is necessary to protect our rights, users,
                      or the public.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-slate-700">
                      D. Business Transfers
                    </h3>
                    <p>
                      If DreamDuo is involved in a merger, acquisition, financing,
                      restructuring, asset sale, or similar transaction, user
                      information may be transferred as part of that transaction,
                      subject to applicable law.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  8. Data Retention
                </h2>
                <p>We retain information for as long as reasonably necessary to:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>provide the Services</li>
                  <li>maintain your account</li>
                  <li>support couple and shared features</li>
                  <li>comply with legal, tax, accounting, or security obligations</li>
                  <li>resolve disputes</li>
                  <li>enforce agreements</li>
                  <li>prevent fraud and abuse</li>
                </ul>
                <p>
                  If you request deletion of your account, we will take reasonable
                  steps to delete or anonymize your information, except where
                  retention is required by law or reasonably necessary for
                  legitimate business or security purposes.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  9. Your Choices and Rights
                </h2>
                <p>
                  Depending on your location and applicable law, you may have the
                  right to:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>access certain personal information we hold about you</li>
                  <li>request correction of inaccurate information</li>
                  <li>request deletion of your account or certain information</li>
                  <li>object to or restrict certain processing</li>
                  <li>withdraw consent where processing is based on consent</li>
                </ul>
                <p>You may also:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>update some profile information inside the app</li>
                  <li>control device permissions through your phone settings</li>
                  <li>manage notification preferences through app or device settings</li>
                </ul>
                <p>
                  To make a privacy-related request, contact us at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-rose-500 hover:text-rose-600"
                  >
                    {contactEmail}
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  10. Third-Party Services
                </h2>
                <p>
                  DreamDuo may rely on third-party services such as sign-in
                  providers, payment providers, cloud providers, analytics
                  services, app stores, and notification services. Your use of
                  those third-party services may also be subject to their own terms
                  and privacy policies.
                </p>
                <p>
                  If you make a purchase through the Apple App Store or Google Play,
                  the applicable app store may process your payment information.
                  DreamDuo does not receive your full payment card details from the
                  app store.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  11. International Data Processing
                </h2>
                <p>
                  Your information may be processed and stored in countries other
                  than your own. By using the Services, you understand that your
                  information may be transferred to and processed in jurisdictions
                  where privacy laws may differ from those in your location.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  12. Children&apos;s Privacy
                </h2>
                <p>
                  DreamDuo is not intended for children under the age of 13, and we
                  do not knowingly collect personal information from children under
                  13. If you believe that a child has provided personal information
                  to us, please contact us so we can take appropriate action.
                </p>
                <p>
                  If a higher minimum age applies under the law in your
                  jurisdiction, we will comply with that law.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  13. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. If we make
                  material changes, we may notify you by updating the date above,
                  posting the revised policy on our website, through the app, or by
                  other appropriate means.
                </p>
                <p>
                  Your continued use of DreamDuo after an updated Privacy Policy
                  becomes effective means you acknowledge the updated policy.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  14. Contact Us
                </h2>
                <p>
                  If you have questions, concerns, or requests related to this
                  Privacy Policy, contact us at:
                </p>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:px-6">
                  <p className="font-semibold text-slate-800">DreamDuo</p>
                  <p className="text-slate-600">Guwahati, Assam, India</p>
                  <p className="text-slate-600">
                    Email:{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="font-semibold text-rose-500 hover:text-rose-600"
                    >
                      {contactEmail}
                    </a>
                  </p>
                  <p className="text-slate-600">
                    Website:{" "}
                    <a
                      href="https://dreamduo.app"
                      className="font-semibold text-rose-500 hover:text-rose-600"
                    >
                      https://dreamduo.app
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
