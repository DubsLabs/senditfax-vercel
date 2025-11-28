import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

// Lazy load the calculator client component (SSR enabled for SEO)
const FaxCalculatorClient = dynamic(() => import("./FaxCalculatorClient"), {
  loading: () => (
    <div style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Loading calculator...</p>
    </div>
  ),
});

export const metadata = {
  title: "Fax Cost Calculator - How Much Does It Cost to Send a Fax? | SendItFax",
  description: "Calculate and compare fax costs. Traditional fax machines cost $700-$1,000/year. SendItFax: as low as $0/year. Free calculator and savings comparison tool.",
  keywords: "fax cost calculator, how much does fax cost, fax machine cost, online fax pricing, fax service comparison, fax cost per page, traditional fax cost, fax savings calculator, free fax calculator",
  alternates: {
    canonical: "https://senditfax.com/calculator",
  },
};

export default function FaxCostCalculator() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Fax Cost Calculator", href: "/calculator" }
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Fax Cost Calculator", href: "/calculator" }]} />

      <div className="mb-8 flex flex-col items-center w-full gap-4">
        <Link href="/">
          <Image src={Logo} alt="SendItFax Logo" width={192} height={60} priority={true} className="w-48 md:w-64" />
        </Link>
      </div>

      <FaxCalculatorClient />
    </section>
    </>
  );
}
