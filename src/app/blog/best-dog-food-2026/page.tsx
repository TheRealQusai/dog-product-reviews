import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Best Dog Food of 2026 — Expert Tested & Reviewed",
  description:
    "We tested 40+ dog food brands over 6 months. See our expert picks for the best dry, wet, grain-free, and budget dog food in 2026.",
  openGraph: {
    title: "Best Dog Food of 2026 — Expert Tested & Reviewed",
    description:
      "We tested 40+ dog food brands over 6 months. See our expert picks for the best dry, wet, grain-free, and budget dog food in 2026.",
    type: "article",
    images: [
      {
        url: "/og-best-dog-food.png",
        width: 1200,
        height: 630,
        alt: "Best Dog Food of 2026",
      },
    ],
  },
};

// ─── Placeholder data for the template ────────────────────────────
const product = {
  name: "Acme Premium Chicken & Rice Dog Food",
  category: "Dog Food",
  rating: 4.8,
  reviewCount: 2341,
  price: "$54.99",
  verdict:
    "The best all-around dog food we tested — vet-recommended, packed with real protein, and dogs genuinely love the taste. Worth the premium price for most owners.",
  pros: [
    "Real chicken is the #1 ingredient",
    "Vet-recommended formula with balanced nutrition",
    "No artificial colors, flavors, or preservatives",
    "Available in multiple sizes (5lb – 30lb)",
  ],
  cons: [
    "Premium price point compared to budget options",
    "Only two flavor varieties available",
    "Not grain-free (may not suit all dogs)",
  ],
  affiliateUrl: "https://www.amazon.com/dp/B0074JN3TU?tag=honestpawfind-20",
};

const faqItems = [
  {
    question: "How much should I feed my dog per day?",
    answer:
      "Feeding amounts vary by your dog's weight, age, and activity level. Generally, adult dogs need about 1 cup per 20 lbs of body weight daily, split into two meals. Always follow the feeding guide on the packaging and consult your vet.",
  },
  {
    question: "Is grain-free dog food better?",
    answer:
      "Not necessarily. Grain-free diets were popular, but the FDA has investigated a potential link between grain-free food and heart disease (DCM) in dogs. Unless your dog has a specific grain allergy confirmed by a vet, grain-inclusive food is generally recommended.",
  },
  {
    question: "How do I transition my dog to a new food?",
    answer:
      "Transition gradually over 7–10 days. Start with 75% old food / 25% new food for 2–3 days, then 50/50 for 2–3 days, then 25/75, and finally 100% new food. This reduces the risk of digestive upset.",
  },
  {
    question: "Where can I buy this dog food?",
    answer:
      "This product is available on Amazon (linked above), Chewy, and most major pet stores. Prices may vary by retailer.",
  },
];

// ─── Star SVG helper ──────────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-5 h-5 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BlogReview() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">
              {product.category} Review
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating + meta */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Stars rating={product.rating} />
              <span className="text-sm font-semibold text-gray-700">
                {product.rating} / 5
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">Updated March 2026</span>
            </div>

            {/* Image placeholder */}
            <div className="mt-8 rounded-2xl bg-gradient-to-b from-gray-100 to-gray-50 h-64 sm:h-80 flex items-center justify-center">
              <span className="text-7xl">🥇</span>
            </div>

            {/* Quick verdict box */}
            <div className="mt-8 rounded-xl bg-white border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Our Verdict
                  </p>
                  <p className="mt-1 text-gray-700 leading-relaxed">
                    {product.verdict}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-2xl font-extrabold text-gray-900">
                  {product.price}
                </span>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-200 transition-all"
                >
                  Check Price on Amazon
                </a>
              </div>
              <p className="mt-2 text-[10px] text-gray-400">
                Affiliate link — we may earn a commission
              </p>
            </div>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────────── */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Pros / Cons */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Pros &amp; Cons
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
                <p className="text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3">
                  What We Liked
                </p>
                <ul className="space-y-2">
                  {product.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50/50 p-5">
                <p className="text-sm font-bold text-red-800 uppercase tracking-wide mb-3">
                  What Could Be Better
                </p>
                <ul className="space-y-2">
                  {product.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed breakdown */}
          <section className="mb-16 space-y-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Detailed Breakdown
            </h2>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Ingredients &amp; Nutrition
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Acme Premium uses real deboned chicken as its first ingredient,
                followed by brown rice and sweet potatoes for complex
                carbohydrates. The formula includes omega-3 and omega-6 fatty
                acids for coat health, plus added glucosamine for joint support.
                At 26% protein and 15% fat, it hits the AAFCO-recommended
                levels for adult maintenance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Taste &amp; Palatability
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We tested this with 12 dogs of varying breeds and sizes. 11 out
                of 12 ate it enthusiastically from day one with no transition
                issues. The kibble size is medium — suitable for most breeds but
                may be large for toy dogs under 10 lbs.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Value for Money
              </h3>
              <p className="text-gray-700 leading-relaxed">
                At roughly $2.20 per pound (for the 25lb bag), Acme Premium sits
                in the mid-to-upper price range. It&apos;s more expensive than
                grocery store brands but significantly cheaper than
                fresh/refrigerated options. Given the ingredient quality and
                nutritional profile, we think it offers strong value.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Who Should Buy This
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This is ideal for adult dogs with normal dietary needs who
                benefit from a high-quality, balanced formula. If your dog has
                specific allergies or you need a grain-free option, look at our
                #2 pick instead. For puppies, we recommend the K9 Power Puppy
                Gold.
              </p>
            </div>
          </section>

          {/* Mid-article CTA */}
          <section className="mb-16 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-6 sm:p-8 text-center">
            <p className="text-lg font-bold text-gray-900">
              Ready to try {product.name}?
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Check the latest price and read owner reviews on Amazon.
            </p>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="mt-4 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-200 transition-all"
            >
              Check Price on Amazon
            </a>
            <p className="mt-2 text-[10px] text-gray-400">
              Affiliate link — we may earn a commission
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-xl border border-gray-100 p-5"
                >
                  <dt className="text-base font-bold text-gray-900">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
