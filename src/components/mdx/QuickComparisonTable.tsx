export interface QuickProduct {
  name: string;
  rating: number;
  price: string;
  monthlyFee: string;
  battery: string;
  bestFor: string;
  affiliateUrl: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs font-semibold text-gray-700">{rating}</span>
    </div>
  );
}

export default function QuickComparisonTable({
  products,
}: {
  products: QuickProduct[];
}) {
  return (
    <div className="my-10 overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[640px] text-sm border border-gray-200 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="py-3 px-3 font-semibold text-gray-600 w-8">#</th>
            <th className="py-3 px-3 font-semibold text-gray-600">Product</th>
            <th className="py-3 px-3 font-semibold text-gray-600">Rating</th>
            <th className="py-3 px-3 font-semibold text-gray-600">Price</th>
            <th className="py-3 px-3 font-semibold text-gray-600">Key Spec</th>
            <th className="py-3 px-3 font-semibold text-gray-600">Best For</th>
            <th className="py-3 px-3 font-semibold text-gray-600 w-20"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((p, i) => (
            <tr
              key={p.name}
              className={`${i === 0 ? "bg-orange-50/60" : "bg-white"} hover:bg-gray-50 transition-colors`}
            >
              <td className="py-3 px-3">
                {i === 0 ? (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold">
                    1
                  </span>
                ) : (
                  <span className="text-gray-400 font-medium">{i + 1}</span>
                )}
              </td>
              <td className="py-3 px-3 font-medium text-gray-900">
                {p.name}
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <Stars rating={p.rating} />
              </td>
              <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">
                {p.price}
              </td>
              <td className="py-3 px-3 text-gray-600">
                {p.battery}
              </td>
              <td className="py-3 px-3 text-gray-600">
                {p.bestFor}
              </td>
              <td className="py-3 px-3">
                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-700 transition-colors whitespace-nowrap"
                >
                  View Deal
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
