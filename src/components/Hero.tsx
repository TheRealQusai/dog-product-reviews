export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-orange-600 tracking-wide uppercase mb-4">
            Trusted by 50,000+ pet owners
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Honest Reviews.{" "}
            <span className="text-orange-600">Happy Pets.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Expert reviews, honest comparisons, and curated top picks — so you
            can spend less time researching and more time with your furry friend.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#categories"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
            >
              Browse Categories
            </a>
            <a
              href="#top-picks"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              See Top Picks
            </a>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
