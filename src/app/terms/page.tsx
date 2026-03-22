import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Review the Terms and Conditions for using DreamDuo.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms and Conditions",
    description: "Review the Terms and Conditions for using DreamDuo.",
    url: "/terms",
    siteName: "DreamDuo",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions",
    description: "Review the Terms and Conditions for using DreamDuo.",
  },
};

const effectiveDate = "March 22, 2026";
const lastUpdated = "March 22, 2026";

export default function TermsPage() {
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
              Terms and Conditions
            </h1>
            <p className="mt-4 text-sm text-slate-500 sm:text-base">
              Effective date: {effectiveDate}
            </p>
            <p className="text-sm text-slate-500 sm:text-base">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              <p>
                These Terms and Conditions ("Terms") govern your access to and use
                of the DreamDuo website, mobile application, and related services
                (collectively, the "Services").
              </p>
              <p>
                DreamDuo is operated by [Your Full Legal Name or Business Name],
                doing business as DreamDuo ("DreamDuo," "we," "our," or "us").
              </p>
              <p>
                By accessing or using DreamDuo, you agree to be bound by these
                Terms and our Privacy Policy. If you do not agree to these Terms,
                do not use the Services.
              </p>
            </div>

            <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-600 sm:text-base">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  1. Eligibility
                </h2>
                <p>You must be at least 18 years old to use DreamDuo.</p>
                <p>By using the Services, you represent and warrant that:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>you are legally capable of entering into a binding agreement</li>
                  <li>the information you provide is accurate and current</li>
                  <li>
                    your use of the Services complies with these Terms and
                    applicable law
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  2. About DreamDuo
                </h2>
                <p>
                  DreamDuo is a platform designed to help couples and individuals
                  manage goals, milestones, habits, shared memories, reflections,
                  prompts, check-ins, and related content.
                </p>
                <p>
                  DreamDuo is intended as a productivity and relationship-support
                  tool only. DreamDuo does not provide medical, mental health,
                  legal, financial, or professional relationship counseling
                  services, and nothing in the Services should be treated as
                  professional advice.
                </p>
                <p>
                  DreamDuo is not an emergency service. If you believe you or
                  someone else is in immediate danger, contact your local emergency
                  services immediately.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  3. Your Account
                </h2>
                <p>
                  You may need to create an account to use some or all features of
                  the Services.
                </p>
                <p>You agree to:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>provide true, accurate, and complete information</li>
                  <li>keep your login credentials secure</li>
                  <li>promptly update your information if it changes</li>
                  <li>
                    accept responsibility for activity that occurs under your
                    account
                  </li>
                </ul>
                <p>
                  You must not share your account with others or allow unauthorized
                  access to it.
                </p>
                <p>
                  We may suspend or terminate accounts that violate these Terms or
                  create risk or harm to DreamDuo, other users, or third parties.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  4. Couple Linking and Shared Spaces
                </h2>
                <p>
                  Certain DreamDuo features are designed for linked partners or
                  shared spaces.
                </p>
                <p>If you choose to connect your account with another user:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    some content may become visible within your shared DreamDuo
                    space
                  </li>
                  <li>
                    shared goals, milestones, prompts, updates, uploaded files, and
                    related activity may be visible to the linked partner depending
                    on the feature
                  </li>
                  <li>you are responsible for the content you choose to share</li>
                  <li>
                    you should only share content you are comfortable making
                    available within that shared experience
                  </li>
                </ul>
                <p>
                  If a couple link is ended, removed, dissolved, or otherwise
                  changed, access to some shared content may change. DreamDuo may
                  retain certain records as reasonably necessary to operate the
                  Services, comply with legal obligations, enforce these Terms,
                  prevent fraud or abuse, and protect users.
                </p>
                <p>
                  DreamDuo is not responsible for disputes, misunderstandings, or
                  emotional consequences arising from content shared between linked
                  users.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  5. Privacy
                </h2>
                <p>Your use of DreamDuo is also governed by our Privacy Policy.</p>
                <p>
                  Please read it carefully to understand how we collect, use, and
                  handle information.
                </p>
                <p className="font-semibold text-slate-700">
                  https://dreamduo.app/privacy-policy
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  6. Subscriptions, Billing, and Paid Features
                </h2>
                <p>
                  DreamDuo may offer free and paid plans, including one-time
                  purchases, recurring subscriptions, promotional access, founder
                  access, or other premium features.
                </p>
                <p>If you purchase a subscription or paid feature:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    you authorize the applicable payment provider or app store to
                    charge the stated price, taxes, and any applicable fees
                  </li>
                  <li>
                    subscriptions may renew automatically unless canceled before the
                    renewal date
                  </li>
                  <li>
                    pricing, billing periods, and included features may be shown in
                    the app, website, or checkout flow
                  </li>
                  <li>
                    we may change pricing or plan features prospectively, as
                    permitted by law
                  </li>
                </ul>
                <p>If you purchased through the Apple App Store or Google Play:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    billing, renewals, cancellations, and refunds may be handled by
                    the applicable app store under its own terms and policies
                  </li>
                  <li>
                    you may need to manage your subscription through your Apple or
                    Google account, not directly through DreamDuo
                  </li>
                </ul>
                <p>
                  If you purchased directly from DreamDuo, cancellation and refund
                  eligibility will be governed by the purchase flow, these Terms,
                  and applicable law.
                </p>
                <p>
                  Unless required by applicable law or expressly stated otherwise,
                  fees are non-refundable once charged.
                </p>
                <p>
                  We may offer promotional codes, trials, or limited-time offers.
                  Those may be subject to additional terms and may be modified or
                  discontinued at any time.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  7. License to Use the Services
                </h2>
                <p>
                  Subject to these Terms, DreamDuo grants you a limited,
                  non-exclusive, non-transferable, revocable license to access and
                  use the Services for your personal, non-commercial use.
                </p>
                <p>You may not:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>
                    copy, modify, distribute, sell, lease, sublicense, or
                    commercially exploit the Services
                  </li>
                  <li>
                    reverse engineer, decompile, disassemble, or attempt to extract
                    source code except where applicable law does not allow that
                    restriction
                  </li>
                  <li>interfere with the operation, security, or integrity of the Services</li>
                  <li>use the Services in a way that violates law or these Terms</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  8. User Content
                </h2>
                <p>
                  "User Content" means content you submit, upload, create, store,
                  transmit, or otherwise make available through DreamDuo, including
                  text, profile information, photos, files, messages, goal data,
                  responses, reflections, and other materials.
                </p>
                <p>You retain ownership of your User Content.</p>
                <p>
                  However, by submitting User Content through the Services, you
                  grant DreamDuo a non-exclusive, worldwide, royalty-free,
                  transferable, sublicensable license to host, store, reproduce,
                  process, adapt, display, and use that User Content solely as
                  necessary to:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>operate and provide the Services</li>
                  <li>display content within the intended product experience</li>
                  <li>secure, maintain, troubleshoot, and improve the Services</li>
                  <li>comply with law and enforce these Terms</li>
                </ul>
                <p>
                  This license ends when your content is deleted from the Services,
                  except to the extent that content:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>has been shared with another user as part of the intended functionality</li>
                  <li>
                    has been backed up or retained for security, legal,
                    fraud-prevention, or operational reasons
                  </li>
                  <li>must be retained under applicable law</li>
                </ul>
                <p>You represent and warrant that:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>you own or have the necessary rights to your User Content</li>
                  <li>
                    your User Content does not violate the rights of any person or
                    entity
                  </li>
                  <li>
                    your User Content complies with these Terms and applicable law
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  9. Acceptable Use and Prohibited Conduct
                </h2>
                <p>You agree not to use DreamDuo to:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>violate any law or regulation</li>
                  <li>harass, threaten, abuse, stalk, defame, or harm another person</li>
                  <li>
                    upload or share unlawful, infringing, misleading, hateful,
                    sexually exploitative, or abusive content
                  </li>
                  <li>
                    impersonate another person or misrepresent your identity or
                    relationship to someone else
                  </li>
                  <li>upload content you do not have permission to use</li>
                  <li>invade another person&apos;s privacy</li>
                  <li>send spam, phishing messages, or unauthorized promotions</li>
                  <li>interfere with another user&apos;s enjoyment of the Services</li>
                  <li>upload malware, viruses, or harmful code</li>
                  <li>
                    attempt to bypass security measures or gain unauthorized access
                    to systems or accounts
                  </li>
                  <li>use DreamDuo for any fraudulent or abusive purpose</li>
                </ul>
                <p>
                  We may investigate violations and remove content, restrict access,
                  suspend accounts, or terminate accounts at our discretion.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  10. Camera, Photos, Files, and Device Features
                </h2>
                <p>
                  DreamDuo may let you upload images, files, and other media or use
                  device features such as the camera, photo library, storage access,
                  or notifications.
                </p>
                <p>
                  You decide whether to use those features. If you grant
                  permissions, you are responsible for the content you capture or
                  upload and for ensuring you have the right to share it.
                </p>
                <p>
                  DreamDuo may reject, remove, or restrict content that violates
                  these Terms or creates legal, security, or operational risk.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  11. Intellectual Property
                </h2>
                <p>
                  DreamDuo and its Services, including the app, website, design,
                  branding, logos, software, text, graphics, interfaces, and other
                  non-user content, are owned by or licensed to DreamDuo and are
                  protected by intellectual property and other laws.
                </p>
                <p>
                  Except for the limited license expressly granted in these Terms,
                  no rights are granted to you.
                </p>
                <p>
                  "DreamDuo," the DreamDuo name, logo, and related branding may not
                  be used without prior written permission.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  12. Feedback
                </h2>
                <p>
                  If you provide feedback, suggestions, feature ideas, bug reports,
                  or other comments about DreamDuo, you grant us the right to use
                  them without restriction or compensation to you.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  13. Third-Party Services and Links
                </h2>
                <p>
                  DreamDuo may rely on or link to third-party services, including
                  app stores, payment providers, authentication providers, cloud
                  providers, analytics tools, notification services, or external
                  websites.
                </p>
                <p>
                  We do not control third-party services and are not responsible
                  for their content, availability, terms, privacy practices, or
                  actions.
                </p>
                <p>
                  Your use of third-party services may be subject to separate terms
                  and policies.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  14. Service Availability and Changes
                </h2>
                <p>
                  We may change, suspend, or discontinue any part of the Services
                  at any time, with or without notice, to the extent permitted by
                  law.
                </p>
                <p>
                  We do not guarantee that the Services will always be available,
                  uninterrupted, secure, or error-free, or that any data will never
                  be lost.
                </p>
                <p>
                  You are responsible for maintaining your own copies of important
                  content where appropriate.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  15. Termination
                </h2>
                <p>You may stop using DreamDuo at any time.</p>
                <p>
                  We may suspend or terminate your access to all or part of the
                  Services at any time, with or without notice, if:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>you violate these Terms</li>
                  <li>
                    we believe your use creates risk, harm, or possible legal
                    exposure
                  </li>
                  <li>we are required to do so by law</li>
                  <li>we detect fraud, abuse, or unauthorized activity</li>
                  <li>we discontinue the Services</li>
                </ul>
                <p>Upon termination:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>your right to use the Services will end immediately</li>
                  <li>
                    some or all of your content or account data may become
                    inaccessible
                  </li>
                  <li>
                    provisions that by their nature should survive termination will
                    survive, including provisions relating to ownership, payments,
                    disclaimers, limitation of liability, disputes, and enforcement
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  16. Disclaimers
                </h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED
                  ON AN "AS IS" AND "AS AVAILABLE" BASIS.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, DREAMDUO DISCLAIMS ALL
                  WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                  TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT, AND ANY WARRANTIES
                  ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE.
                </p>
                <p>WITHOUT LIMITING THE ABOVE, DREAMDUO DOES NOT WARRANT THAT:</p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>THE SERVICES WILL MEET YOUR REQUIREMENTS</li>
                  <li>THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE</li>
                  <li>ANY CONTENT OR RESULTS WILL BE ACCURATE OR RELIABLE</li>
                  <li>ANY DEFECTS WILL BE CORRECTED</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  17. Limitation of Liability
                </h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, DREAMDUO AND ITS OPERATOR
                  WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF
                  PROFITS, REVENUE, DATA, GOODWILL, OR USE, ARISING OUT OF OR
                  RELATING TO THE SERVICES OR THESE TERMS.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF
                  DREAMDUO ARISING OUT OF OR RELATING TO THE SERVICES OR THESE
                  TERMS WILL NOT EXCEED THE GREATER OF:
                </p>
                <p className="font-semibold text-slate-700">
                  (A) THE AMOUNT YOU PAID TO DREAMDUO IN THE 12 MONTHS BEFORE THE
                  EVENT GIVING RISE TO THE CLAIM; OR
                </p>
                <p className="font-semibold text-slate-700">(B) INR 1,000.</p>
                <p>
                  NOTHING IN THESE TERMS SHALL LIMIT OR EXCLUDE ANY LIABILITY THAT
                  CANNOT BE LIMITED OR EXCLUDED UNDER APPLICABLE LAW.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  18. Indemnity
                </h2>
                <p>
                  To the maximum extent permitted by law, you agree to defend,
                  indemnify, and hold harmless DreamDuo and its operator from and
                  against claims, liabilities, damages, losses, and expenses arising
                  out of or related to:
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>your use of the Services</li>
                  <li>your User Content</li>
                  <li>your violation of these Terms</li>
                  <li>your violation of any law or the rights of another person</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  19. Governing Law and Disputes
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with
                  the laws of India.
                </p>
                <p>
                  Subject to applicable law, the courts and forums at Guwahati,
                  Assam, India shall have exclusive jurisdiction over any dispute,
                  claim, or controversy arising out of or relating to these Terms
                  or the Services.
                </p>
                <p>
                  Before initiating formal proceedings, you agree to contact
                  DreamDuo at support@dreamduo.app and attempt to resolve the matter
                  informally in good faith.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  20. Changes to These Terms
                </h2>
                <p>We may update these Terms from time to time.</p>
                <p>
                  If we make material changes, we may provide notice by updating
                  the date above, posting the revised Terms on our website, through
                  the app, or by other reasonable means.
                </p>
                <p>
                  Your continued use of the Services after updated Terms become
                  effective means you agree to the updated Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  21. Severability
                </h2>
                <p>
                  If any provision of these Terms is held to be invalid, illegal,
                  or unenforceable, the remaining provisions will remain in full
                  force and effect.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  22. Entire Agreement
                </h2>
                <p>
                  These Terms, together with the Privacy Policy and any additional
                  terms presented to you for specific features, form the entire
                  agreement between you and DreamDuo regarding the Services and
                  supersede prior understandings relating to the Services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                  23. Contact Information
                </h2>
                <p>If you have questions about these Terms, contact:</p>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 sm:px-6">
                  <p className="font-semibold text-slate-800">DreamDuo</p>
                  <p className="text-slate-600">
                    Operated by{" "}
                    <span className="font-semibold text-slate-700">
                      [Your Full Legal Name or Business Name]
                    </span>
                  </p>
                  <p className="text-slate-600">Guwahati, Assam, India</p>
                  <p className="text-slate-600">Email: support@dreamduo.app</p>
                  <p className="text-slate-600">Website: https://dreamduo.app</p>
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
