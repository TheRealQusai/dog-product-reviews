const categories = [
  {
    name: "Dog Food",
    description: "Kibble, wet food, raw diets & treats reviewed by nutrition experts.",
    icon: "🥩",
    count: 124,
    color: "from-red-50 to-orange-50 border-red-100",
  },
  {
    name: "Dog Beds",
    description: "Orthopedic, bolster, and cooling beds for every breed and budget.",
    icon: "🛏️",
    count: 68,
    color: "from-blue-50 to-indigo-50 border-blue-100",
  },
  {
    name: "Dog Toys",
    description: "Chew toys, puzzles, and fetch gear tested for durability and fun.",
    icon: "🎾",
    count: 93,
    color: "from-green-50 to-emerald-50 border-green-100",
  },
  {
    name: "GPS Trackers",
    description: "Real-time location trackers and smart collars compared side by side.",
    icon: "📍",
    count: 31,
    color: "from-purple-50 to-violet-50 border-purple-100",
  },
  {
    name: "Grooming",
    description: "Brushes, shampoos, nail clippers & grooming kits rated by groomers.",
    icon: "✂️",
    count: 57,
    color: "from-pink-50 to-rose-50 border-pink-100",
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
            We test and review products across five major categories so you can
            make confident choices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className={`group relative rounded-2xl border bg-gradient-to-br ${cat.color} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
            >
              <span className="text-4xl">{cat.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {cat.description}
              </p>
              <p className="mt-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                {cat.count} reviews
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
