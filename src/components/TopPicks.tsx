import Link from "next/link";

const picks = [
  {
    name: "Acme Premium Chicken & Rice",
    category: "Dog Food",
    rating: 4.8,
    reviews: 2341,
    price: "$54.99",
    badge: "Editor's Choice",
    image: "🥇",
    href: "/blog/best-dog-food-for-small-breeds",
  },
  {
    name: "CloudNine Orthopedic Bed",
    category: "Dog Beds",
    rating: 4.7,
    reviews: 1892,
    price: "$89.00",
    badge: "Best Value",
    image: "🥈",
    href: "/blog/best-dog-beds-for-large-dogs",
  },
  {
    name: "ToughChew Ultra Ball",
    category: "Dog Toys",
    rating: 4.9,
    reviews: 3104,
    price: "$14.99",
    badge: "Most Popular",
    image: "🥉",
    href: "/blog/best-indestructible-dog-toys",
  },
  {
    name: "TrackPaw GPS Collar",
    category: "GPS Trackers",
    rating: 4.6,
    reviews: 987,
    price: "$129.99",
    badge: "Top Rated",
    image: "⭐",
    href: "/blog/best-gps-trackers-for-dogs",
  },
  {
    name: "GlossCoat Grooming Kit",
    category: "Grooming",
    rating: 4.7,
    reviews: 1456,
    price: "$39.99",
    badge: "Best Seller",
    image: "✨",
    href: "/blog/best-dog-food-2026",
  },
  {
    name: "WildBites Grain-Free Formula",
    category: "Dog Food",
    rating: 4.6,
    reviews: 1678,
    price: "$62.99",
    badge: "Premium Pick",
    image: "🏆",
    href: "/blog/best-dog-food-for-small-breeds",
  },
];

export default function TopPicks() {
  return (
    <section id="top-picks" className="py-20 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Top Picks
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Hand-picked favorites based on hundreds of hours of testing and
            thousands of owner reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {picks.map((pick) => (
            <Link
              key={pick.name}
              href={pick.href}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                <span className="text-5xl">{pick.image}</span>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-orange-600 text-white text-xs font-semibold">
                  {pick.badge}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                  {pick.category}
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {pick.name}
                </h3>
                <div className="mt-2 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(pick.rating) ? "text-amber-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {pick.rating}
                  </span>
                  <span className="text-sm text-gray-400">
                    ({pick.reviews.toLocaleString()})
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {pick.price}
                  </span>
                  <span className="text-sm font-medium text-orange-600 group-hover:underline">
                    Read Review →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
