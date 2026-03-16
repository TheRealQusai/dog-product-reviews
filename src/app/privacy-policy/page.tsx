import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for DogGearReviews.com — how we collect, use, and protect your data.",
  openGraph: {
    title: "Privacy Policy | DogGearReviews",
    description:
      "Privacy policy for DogGearReviews.com — how we collect, use, and protect your data.",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-12">
            Last updated: March 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Data Collection
              </h2>
              <p>
                DogGearReviews.com uses Google Analytics to collect anonymous
                usage data such as pages visited, session duration, and
                approximate geographic location. This data helps us understand
                how visitors use our site so we can improve our content and user
                experience.
              </p>
              <p className="mt-3">
                We use cookies and similar technologies to enable analytics, save
                your preferences (such as dismissing the affiliate disclosure
                banner), and ensure the site functions properly. You can control
                cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Affiliate Link Disclosure
              </h2>
              <p>
                DogGearReviews.com is a participant in the Amazon Services LLC
                Associates Program, an affiliate advertising program designed to
                provide a means for sites to earn advertising fees by advertising
                and linking to Amazon.com. When you click an affiliate link and
                make a purchase, we may earn a commission at no additional cost
                to you.
              </p>
              <p className="mt-3">
                Affiliate relationships never influence our editorial content,
                product ratings, or recommendations. Our reviews are based on
                independent testing and research.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Third-Party Services
              </h2>
              <p>We may use the following third-party services:</p>
              <ul className="mt-3 list-disc list-inside space-y-2">
                <li>
                  <strong>Google Analytics</strong> — for website traffic
                  analysis
                </li>
                <li>
                  <strong>Amazon Associates</strong> — for affiliate link
                  tracking and commissions
                </li>
                <li>
                  <strong>Email service providers</strong> — for newsletter
                  delivery (if you subscribe)
                </li>
              </ul>
              <p className="mt-3">
                Each third-party service operates under its own privacy policy.
                We encourage you to review their policies for details on how they
                handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Information We Do Not Collect
              </h2>
              <p>
                We do not collect personal information such as your name, email
                address, or payment information unless you voluntarily provide it
                (e.g., by subscribing to our newsletter). We do not sell, trade,
                or rent your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Rights
              </h2>
              <p>
                You have the right to request access to, correction of, or
                deletion of any personal data we may hold. You may also opt out
                of analytics tracking by using browser extensions such as Google
                Analytics Opt-Out or by enabling &quot;Do Not Track&quot; in your
                browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-orange-600 hover:underline"
                >
                  {siteConfig.contactEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
