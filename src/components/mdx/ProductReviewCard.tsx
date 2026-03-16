export interface ProductReviewProps {
  rank: number;
  name: string;
  tagline: string;
  rating: number;
  price: string;
  image: string;
  bestFor: string;
  overview: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
}

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

export default function ProductReviewCard({
  rank,
  name,
  tagline,
  rating,
  price,
  image,
  bestFor,
  overview,
  pros,
  cons,
  affiliateUrl,
}: ProductReviewProps) {
  const isWinner = rank === 1;

  return (
    <div
      id={name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      className={`my-10 rounded-2xl border-2 overflow-hidden ${
        isWinner
          ? "border-orange-300 shadow-lg shadow-orange-100"
          : "border-gray-100"
      }`}
    >
      {/* Header bar */}
      <div
        className={`flex items-center gap-3 px-6 py-3 ${
          isWinner
            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
            isWinner ? "bg-white/20 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          {rank}
        </span>
        <span className="font-bold">{name}</span>
        {isWinner && (
          <span className="ml-auto text-xs font-semibold bg-white/20 px-2.5 py-0.5 rounded-full">
            Our Top Pick
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8 bg-white">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Image placeholder */}
          <div className="shrink-0 w-full sm:w-48 h-48 rounded-xl bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center">
            <span className="text-6xl">{image}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 italic">{tagline}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <Stars rating={rating} />
              <span className="text-sm font-semibold text-gray-700">
                {rating} / 5
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-extrabold text-gray-900">
                {price}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Best for: {bestFor}
              </span>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              {overview}
            </p>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-2">
              Pros
            </p>
            <ul className="space-y-1.5">
              {pros.map((pro) => (
                <li
                  key={pro}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <svg
                    className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
            <p className="text-xs font-bold text-red-800 uppercase tracking-wide mb-2">
              Cons
            </p>
            <ul className="space-y-1.5">
              {cons.map((con) => (
                <li
                  key={con}
                  className="flex items-start gap-2 text-sm text-gray-500"
                >
                  <svg
                    className="w-4 h-4 text-red-400 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isWinner
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-200"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.045 18.02c.07-.116.36-.37.782-.628.422-.26 1.06-.614 1.76-.866 1.398-.506 3.12-.782 3.12-.782s-.04-.2-.06-.32c-.02-.12-.03-.19-.05-.32-.02-.13-.04-.26-.05-.39a9.2 9.2 0 01.04-1.565c.07-.51.17-.96.3-1.39.26-.87.6-1.56.97-2.15.37-.59.78-1.07 1.18-1.49.4-.42.79-.78 1.14-1.08.35-.3.65-.55.9-.74.25-.2.43-.34.56-.42l.16-.11c.12-.08.18-.12.18-.12s-.07.05-.2.17c-.13.12-.32.31-.57.57-.24.26-.54.6-.86 1.02-.32.42-.66.92-1 1.52-.34.6-.65 1.3-.9 2.06-.12.38-.23.77-.32 1.17-.09.4-.16.81-.2 1.23a9.06 9.06 0 00.04 1.57c.03.2.07.36.1.56.03.19.08.38.13.56.2-.06.43-.16.7-.27.28-.12.59-.26.93-.4.34-.14.72-.3 1.12-.44.41-.15.84-.29 1.28-.41.44-.12.9-.22 1.35-.29.46-.06.92-.1 1.37-.1.45 0 .9.04 1.33.13.42.1.83.24 1.2.46.37.22.7.52.96.89.26.38.44.83.52 1.34.04.26.06.52.05.78-.01.26-.04.51-.09.76-.1.5-.28.98-.5 1.42-.44.88-1.02 1.63-1.68 2.24-.66.6-1.41 1.07-2.18 1.4-.77.33-1.56.53-2.34.62-.39.05-.78.07-1.15.07-.38 0-.74-.03-1.09-.08a6.24 6.24 0 01-.96-.23c-.3-.1-.58-.23-.84-.38a4.7 4.7 0 01-.97-.77c-.36-.36-.69-.8-.96-1.33-.27-.52-.49-1.12-.62-1.78 0 0-.87.3-1.8.77-.93.47-1.93 1.12-2.58 1.88-.02.02-.05.05-.08.08-.02.04-.05.07-.07.11-.03.04-.05.08-.07.12l-.03.05c-.02.03-.03.04-.04.04v.02l-.01-.01c-.02-.06 0-.19.09-.39zm15.09.42c.52-.25 1-.57 1.43-.94.43-.37.82-.79 1.14-1.26.32-.47.56-.99.7-1.54.07-.27.12-.56.14-.85.02-.29 0-.58-.05-.86a2.2 2.2 0 00-.33-.82 1.98 1.98 0 00-.62-.61c-.49-.3-1.08-.43-1.67-.44-.59 0-1.19.1-1.76.27-.57.17-1.12.4-1.63.66-.51.26-.99.56-1.42.87-.43.31-.82.64-1.15.96l-.01.02c.08.42.2.82.36 1.18.16.37.35.71.58 1.01.23.3.49.56.78.77.29.21.6.38.93.49.34.11.69.17 1.06.17.37 0 .75-.06 1.14-.17l-.02.09z" />
            </svg>
            Check Price on Amazon
          </a>
          <span className="text-[10px] text-gray-400">
            Affiliate link — we may earn a commission
          </span>
        </div>
      </div>
    </div>
  );
}
