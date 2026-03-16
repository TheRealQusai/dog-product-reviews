import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for DogGearReviews.com — affiliate disclaimer, accuracy of information, and more.",
  openGraph: {
    title: "Terms of Service | DogGearReviews",
    description:
      "Terms of service for DogGearReviews.com — affiliate disclaimer, accuracy of information, and more.",
  },
};

export default function TermsOfService() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-12">
            Last updated: March 2026
          </p>

          <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Affiliate Disclaimer
              </h2>
              <p>
                DogGearReviews.com is a participant in the Amazon Services LLC
                Associates Program, an affiliate advertising program designed to
                provide a means for sites to earn advertising fees by advertising
                and linking to Amazon.com. Some links on this site are affiliate
                links, meaning we may earn a commission if you click through and
                make a purchase, at no additional cost to you.
              </p>
              <p className="mt-3">
                Affiliate partnerships do not influence our product ratings,
                reviews, or editorial content. We only recommend products we
                genuinely believe offer value to dog owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Accuracy of Information
              </h2>
              <p>
                We strive to provide accurate, up-to-date product information
                including prices, ratings, and specifications. However, product
                details, availability, and pricing are subject to change at any
                time by the respective retailers and manufacturers. We cannot
                guarantee that all information on the site is current or
                error-free.
              </p>
              <p className="mt-3">
                Always verify product details on the retailer&apos;s website
                before making a purchase. If you notice inaccurate information,
                please contact us so we can correct it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <p>
                DogGearReviews.com and its authors are not liable for any
                damages, losses, or adverse outcomes resulting from your use of
                information on this site or your purchase of products linked from
                this site. All product recommendations are based on our research
                and testing, but individual results may vary.
              </p>
              <p className="mt-3">
                This site does not provide veterinary advice. Always consult with
                a qualified veterinarian before changing your dog&apos;s diet,
                supplements, or health-related products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                External Links Policy
              </h2>
              <p>
                Our site contains links to external websites including Amazon.com
                and other retailers. We are not responsible for the content,
                privacy policies, or practices of these third-party sites. Once
                you leave DogGearReviews.com via an external link, our Terms of
                Service and Privacy Policy no longer apply.
              </p>
              <p className="mt-3">
                We encourage you to review the terms and privacy policies of any
                external site you visit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                User Conduct
              </h2>
              <p>By using this site, you agree to:</p>
              <ul className="mt-3 list-disc list-inside space-y-2">
                <li>
                  Use the site for lawful purposes only and in compliance with
                  all applicable laws
                </li>
                <li>
                  Not attempt to disrupt, hack, or interfere with the
                  site&apos;s operation
                </li>
                <li>
                  Not reproduce, distribute, or republish our content without
                  prior written permission
                </li>
                <li>
                  Not use automated tools to scrape or extract data from the site
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Changes to These Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Service at any
                time. Changes will be posted on this page with an updated
                revision date. Your continued use of the site after changes are
                posted constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact
              </h2>
              <p>
                Questions about these terms? Contact us at{" "}
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
