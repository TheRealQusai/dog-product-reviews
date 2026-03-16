import Link from "next/link";

export default function AffiliateDisclosure() {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-200 px-5 py-4 mb-10 text-sm text-amber-800 leading-relaxed">
      <p>
        <strong>Affiliate Disclosure:</strong> HonestPawFinds.xyz is a
        participant in the Amazon Services LLC Associates Program. Links in this
        article are affiliate links — if you purchase through them, we may earn a
        small commission at no extra cost to you. This does not influence our
        ratings or recommendations.{" "}
        <Link href="/privacy-policy" className="underline font-medium hover:text-amber-950">
          Learn more
        </Link>
      </p>
    </div>
  );
}
