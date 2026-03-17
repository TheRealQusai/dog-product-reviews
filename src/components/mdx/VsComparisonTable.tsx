export interface VsRow {
  category: string;
  productA: string;
  productB: string;
  winner?: "A" | "B" | "tie";
}

export default function VsComparisonTable({
  nameA,
  nameB,
  rows,
}: {
  nameA: string;
  nameB: string;
  rows: VsRow[];
}) {
  return (
    <div className="my-10 overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full min-w-[500px] text-sm border border-gray-200 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="py-3 px-4 font-semibold text-gray-600">
              Category
            </th>
            <th className="py-3 px-4 font-semibold text-orange-600">
              {nameA}
            </th>
            <th className="py-3 px-4 font-semibold text-indigo-600">
              {nameB}
            </th>
            <th className="py-3 px-4 font-semibold text-gray-600 text-center w-24">
              Winner
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={row.category} className="bg-white hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-900">
                {row.category}
              </td>
              <td
                className={`py-3 px-4 ${
                  row.winner === "A"
                    ? "text-orange-700 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {row.productA}
              </td>
              <td
                className={`py-3 px-4 ${
                  row.winner === "B"
                    ? "text-indigo-700 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {row.productB}
              </td>
              <td className="py-3 px-4 text-center">
                {row.winner === "A" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                    {nameA}
                  </span>
                )}
                {row.winner === "B" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {nameB}
                  </span>
                )}
                {row.winner === "tie" && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                    Tie
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
