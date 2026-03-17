/**
 * Product image placeholder with gradient background.
 *
 * To replace with a real image, swap the inner content:
 *   <ProductImage>
 *     <Image src="/images/products/tractive.jpg" alt="Tractive GPS" fill className="object-contain p-4" />
 *   </ProductImage>
 */

const gradients: Record<string, string> = {
  "Dog Food": "from-amber-50 to-orange-100",
  "Dog Beds": "from-blue-50 to-indigo-100",
  "Dog Toys": "from-green-50 to-emerald-100",
  "GPS Trackers": "from-violet-50 to-purple-100",
  Grooming: "from-pink-50 to-rose-100",
  default: "from-gray-50 to-gray-100",
};

export default function ProductImage({
  emoji,
  category,
  children,
  className = "h-48",
}: {
  emoji?: string;
  category?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const gradient = gradients[category || "default"] || gradients.default;

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${gradient} rounded-xl overflow-hidden ${className}`}
    >
      {children || <span className="text-5xl sm:text-6xl">{emoji}</span>}
    </div>
  );
}
