import Link from "next/link";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Categories: [
    { label: "Dog Food", href: "#" },
    { label: "Dog Beds", href: "#" },
    { label: "Dog Toys", href: "#" },
    { label: "GPS Trackers", href: "#" },
    { label: "Grooming", href: "#" },
  ],
  Resources: [
    { label: "Buying Guides", href: "#" },
    { label: "How We Test", href: "#" },
    { label: "Compare Products", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold text-white">HonestPawFinds</span>
            </Link>
            <p className="mt-3 text-xs font-medium text-gray-500 italic">
              Honest Reviews. Happy Pets.
            </p>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Helping pet owners find the best products since 2024. Independent
              reviews you can trust.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                {heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliate disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
            HonestPawFinds.xyz is a participant in the Amazon Services LLC
            Associates Program, an affiliate advertising program designed to
            provide a means for sites to earn advertising fees by advertising and
            linking to Amazon.com.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} HonestPawFinds. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "Instagram", "YouTube"].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
