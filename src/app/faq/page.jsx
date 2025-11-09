import FullSEO from "../../config/FullSEO";
import Script from "next/script";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../images/logo.png";
import FAQAccordions from "./FAQAccordions";
import PopularQuestions from "./PopularQuestions";

import FAQList from "../../utils/FAQList";

export const metadata = {
  ...FullSEO.FAQ,
  alternates: {
    canonical: "https://senditfax.com/faq",
  },
};

export default function FAQ() {
  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQList.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.text.replace(/\n/g, ' ').trim()
      }
    }))
  };

  // Group FAQs by category
  const categories = [
    "Getting Started",
    "Pricing & Plans",
    "Files & Documents",
    "Delivery & Tracking",
    "Coverage & Compatibility",
    "Security & Privacy",
    "Technical Support",
    "Use Cases"
  ];

  const groupedFAQs = categories.reduce((acc, category) => {
    acc[category] = FAQList.filter(item => item.category === category);
    return acc;
  }, {});

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
        
        <div className="mb-8 flex flex-col items-center w-full gap-4">
          <Link href="/">
            <Image src={Logo} alt="SendItFax Logo" width={192} height={60} priority={true} className="w-48 md:w-64" />
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about sending faxes online with SendItFax. Can't find what you're looking for?{" "}
            <Link href="/how-to-send-fax-online" className="text-blue-600 hover:underline font-medium">
              Check our complete guide
            </Link>.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="text-sm text-blue-700 hover:text-blue-900 hover:underline"
              >
                {category}
              </a>
            ))}
          </div>
        </div>

        {/* Popular Questions */}
        <PopularQuestions />

        {/* FAQ Categories */}
        <FAQAccordions categories={categories} groupedFAQs={groupedFAQs} />

        {/* Still Have Questions Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-6">
            We're here to help! Explore our additional resources or start sending your fax right away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/how-to-send-fax-online"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Complete Guide
            </Link>
            <Link 
              href="/"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Send Free Fax Now
            </Link>
            <Link 
              href="/about"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="border border-gray-300 rounded-lg p-5 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">📖 How-To Guide</h3>
            <p className="text-sm text-gray-600 mb-3">
              Step-by-step instructions for sending faxes online.
            </p>
            <Link href="/how-to-send-fax-online" className="text-blue-600 hover:underline text-sm font-medium">
              Read Guide →
            </Link>
          </div>
          <div className="border border-gray-300 rounded-lg p-5 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">🔒 Privacy & Security</h3>
            <p className="text-sm text-gray-600 mb-3">
              Learn how we protect your data and documents.
            </p>
            <Link href="/privacy" className="text-blue-600 hover:underline text-sm font-medium">
              Privacy Policy →
            </Link>
          </div>
          <div className="border border-gray-300 rounded-lg p-5 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">📄 Check Status</h3>
            <p className="text-sm text-gray-600 mb-3">
              Track your fax delivery in real-time.
            </p>
            <Link href="/status" className="text-blue-600 hover:underline text-sm font-medium">
              Track Fax →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 bg-gray-100 border border-gray-300 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">📋 Disclaimer</h3>
          <p className="text-sm text-gray-700">
            Service features subject to change. Users advised to review current{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              terms and conditions
            </Link>{" "}
            before transmission. For specific compliance requirements (HIPAA, legal, etc.), please verify that SendItFax meets your organizational needs.
          </p>
        </div>

        {/* SEO Footer Text */}
        <div className="mt-10 text-sm text-gray-600 text-center border-t pt-6">
          <p>
            SendItFax provides free online fax services to USA and Canada. Send faxes without a fax machine, account, or credit card. Fast, secure, and reliable online faxing for individuals and businesses.
          </p>
        </div>
      </div>
    </>
  );
}
