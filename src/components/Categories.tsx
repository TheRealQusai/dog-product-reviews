import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Dog Food",
    description: "Kibble, wet food, raw diets & treats reviewed by nutrition experts.",
    image: "/images/products/dog-food-1.jpg",
    count: 124,
    href: "/blog/best-dog-food-for-small-breeds",
  },
  {
    name: "Dog Beds",
    description: "Orthopedic, bolster, and cooling beds for every breed and budget.",
    image: "/images/products/dog-bed-1.jpg",
    count: 68,
    href: "/blog/best-dog-beds-for-large-dogs",
  },
  {
    name: "Dog Toys",
    description: "Chew toys, puzzles, and fetch gear tested for durability and fun.",
    image: "/images/products/dog-toy-1.jpg",
    count: 93,
    href: "/blog/best-indestructible-dog-toys",
  },
  {
    name: "GPS Trackers",
    description: "Real-time location trackers and smart collars compared side by side.",
    image: "/images/products/gps-tracker-1.jpg",
    count: 31,
    href: "/blog/best-gps-trackers-for-dogs",
  },
  {
    name: "Grooming",
    description: "Brushes, shampoos, nail clippers & grooming kits rated by groomers.",
    image: "/images/products/grooming-1.jpg",
    count: 57,
    href: "/blog/best-dog-food-2026",
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            We test and review pet products across five major categories so you
            can make confident choices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                  {cat.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-orange-600 uppercase tracking-wide">
                  {cat.count} reviews →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
