export default function Newsletter() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-orange-600 to-amber-500 p-8 sm:p-12 lg:p-16 overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Get weekly top picks in your inbox
            </h2>
            <p className="mt-3 text-orange-100 text-lg">
              Join 25,000+ dog owners who get our expert reviews and deals
              every Thursday.
            </p>
            <form className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl px-5 py-3 text-sm bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="rounded-xl px-6 py-3 bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-orange-200">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>

          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -top-12 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
