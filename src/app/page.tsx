import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import TopPicks from "@/components/TopPicks";
import ComparisonTable from "@/components/ComparisonTable";
import type { ComparisonProduct } from "@/components/ComparisonTable";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const comparisonProducts: ComparisonProduct[] = [
  {
    name: "Acme Premium Chicken & Rice",
    image: "/images/products/dog-food-1.jpg",
    rating: 4.8,
    reviewCount: 2341,
    price: "$54.99",
    bestFor: "Overall nutrition",
    pros: [
      "Vet-recommended formula",
      "Real chicken as first ingredient",
      "No artificial preservatives",
    ],
    cons: ["Premium price point", "Only 2 flavor options"],
    affiliateUrl: "https://www.amazon.com/s?k=Acme+Premium+Chicken+Rice+Dog+Food&tag=honestpawfind-20",
    badge: "Editor's Choice",
  },
  {
    name: "WildBites Grain-Free",
    image: "/images/products/dog-food-2.jpg",
    rating: 4.6,
    reviewCount: 1678,
    price: "$62.99",
    bestFor: "Sensitive stomachs",
    pros: [
      "Grain-free recipe",
      "Added probiotics",
      "High protein content",
    ],
    cons: ["Higher cost per serving", "Strong smell"],
    affiliateUrl: "https://www.amazon.com/s?k=WildBites+Grain+Free+Dog+Food&tag=honestpawfind-20",
    badge: "Premium Pick",
  },
  {
    name: "NutriPaws Budget Blend",
    image: "/images/products/dog-toy-2.jpg",
    rating: 4.3,
    reviewCount: 3892,
    price: "$32.99",
    bestFor: "Budget-conscious owners",
    pros: [
      "Affordable price",
      "Large 30lb bags available",
      "Dogs love the taste",
    ],
    cons: ["Contains some fillers", "Less protein per serving"],
    affiliateUrl: "https://www.amazon.com/s?k=NutriPaws+Budget+Dog+Food&tag=honestpawfind-20",
    badge: "Best Value",
  },
  {
    name: "FreshPet Vitality Mix",
    image: "/images/products/grooming-1.jpg",
    rating: 4.7,
    reviewCount: 1245,
    price: "$74.99",
    bestFor: "Fresh food lovers",
    pros: [
      "Refrigerated fresh food",
      "Human-grade ingredients",
      "Visible real veggies",
    ],
    cons: ["Requires refrigeration", "Highest price"],
    affiliateUrl: "https://www.amazon.com/s?k=FreshPet+Vitality+Mix+Dog+Food&tag=honestpawfind-20",
  },
  {
    name: "K9 Power Puppy Gold",
    image: "/images/products/hero-dog-1.jpg",
    rating: 4.5,
    reviewCount: 2104,
    price: "$48.99",
    bestFor: "Puppies & young dogs",
    pros: [
      "DHA for brain development",
      "Balanced calcium levels",
      "Small kibble size",
    ],
    cons: ["Only for puppies under 1yr", "Limited flavors"],
    affiliateUrl: "https://www.amazon.com/s?k=K9+Power+Puppy+Gold+Dog+Food&tag=honestpawfind-20",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Categories />
        <ComparisonTable
          title="Best Dog Foods of 2026"
          subtitle="We tested 40+ dog food brands over 6 months. Here are the top 5 picks for every budget and dietary need."
          products={comparisonProducts}
        />
        <TopPicks />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
