export interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ items }: { items: FAQItem[] }) {
  // Structured data for Google rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="my-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-gray-100 bg-white p-5"
          >
            <dt className="text-base font-bold text-gray-900">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm text-gray-600 leading-relaxed">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
