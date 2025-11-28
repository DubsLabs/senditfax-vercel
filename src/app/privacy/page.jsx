import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata = { 
  ...FullSEO.Privacy,
  alternates: {
    canonical: "https://senditfax.com/privacy",
  },
};

export default function Privacy() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Privacy Policy", href: "/privacy" }
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
      <section className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
      
      <div className="mb-8 flex flex-col items-center w-full gap-4 text-sm">
        <Link href="/">
          <Image src={Logo} alt="SendItFax Logo" width={192} height={60} priority={true} className="w-48 md:w-64" />
        </Link>
        <h1 className="text-center cursor-default">
          Send <span className="font-semibold">FREE</span> Faxes to U.S. and Canada, no account necessary.
        </h1>
      </div>

      <div className="prose prose-slate max-w-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Privacy Policy</h1>
          <p className="text-green-100 text-sm">
            Last Updated: <span className="font-semibold">Oct 16, 2024</span>
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#information-we-collect" className="text-blue-600 hover:underline">1. Information We Collect</a>
            <a href="#use-of-information" className="text-blue-600 hover:underline">2. Use of Your Information</a>
            <a href="#disclosure" className="text-blue-600 hover:underline">3. Disclosure of Your Information</a>
            <a href="#data-security" className="text-blue-600 hover:underline">4. Data Security</a>
            <a href="#childrens-information" className="text-blue-600 hover:underline">5. Children's Information</a>
            <a href="#changes" className="text-blue-600 hover:underline">6. Changes to This Policy</a>
            <a href="#contact-us" className="text-blue-600 hover:underline">7. Contact Us</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-green-50 border-l-4 border-green-600 p-5 mb-8 rounded-r-lg">
          <p className="text-gray-800 leading-relaxed">
            SendItFax ("we," "us," "our") is committed to protecting your personally identifiable information ("PII"). This Privacy Policy applies to
            our website{" "}
            <Link href="http://www.senditfax.com" className="text-blue-600 hover:text-blue-800 font-medium">
              www.SendItFax.com
            </Link>{" "}
            and the document upload and fax transmission services ("Services") provided through it.
          </p>
        </div>

        {/* Section 1 - Information We Collect */}
        <div id="information-we-collect" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">1. Information We Collect</h2>
          </div>
          
          <div className="pl-4 space-y-6">
            <p className="text-gray-700">We collect both PII and non-personally identifiable information ("non-PII").</p>

            {/* PII Subsection */}
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Personally Identifiable Information</h3>
              <p className="mb-3 text-gray-700">We may collect PII when you:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                <li>Submit sender and receiver information for fax transmission</li>
                <li>Provide content to be sent via fax</li>
                <li>Request customer support</li>
                <li>Subscribe to newsletters</li>
                <li>Make a purchase</li>
              </ul>
            </div>

            {/* Non-PII Subsection */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Non-Personally Identifiable Information</h3>
              <p className="mb-3 text-gray-700">We also collect non-PII, such as:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                <li>IP address and device identifiers</li>
                <li>Usage data (e.g., pages viewed, ads clicked)</li>
                <li>Demographic information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 - Use of Your Information */}
        <div id="use-of-information" className="mb-8 scroll-mt-20">
          <div className="bg-purple-50 border-l-4 border-purple-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">2. Use of Your Information</h2>
          </div>
          <div className="pl-4">
            <p className="mb-3 text-gray-700">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide and enhance our Services</li>
              <li>Communicate with you about your account and transactions</li>
              <li>Personalize user experience</li>
              <li>Conduct marketing and analytics</li>
            </ul>
          </div>
        </div>

        {/* Section 3 - Disclosure of Your Information */}
        <div id="disclosure" className="mb-8 scroll-mt-20">
          <div className="bg-yellow-50 border-l-4 border-yellow-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">3. Disclosure of Your Information</h2>
          </div>
          <div className="pl-4">
            <p className="mb-3 text-gray-700">We do not sell your PII. However, we may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Service providers who assist in operating our website and Services</li>
              <li>Law enforcement, if required by law</li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-300 rounded p-4 mt-4">
            <p className="text-gray-800 font-medium">✓ We do NOT sell your personally identifiable information</p>
          </div>
        </div>

        {/* Section 4 - Data Security */}
        <div id="data-security" className="mb-8 scroll-mt-20">
          <div className="bg-green-50 border-l-4 border-green-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">4. Data Security</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700">
              We implement reasonable security measures to protect your PII but cannot guarantee complete security. You are responsible for
              safeguarding your information while using public networks.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-300 rounded p-4 mt-4">
            <p className="text-gray-800">
              <span className="font-semibold">🔒 Security Measures:</span> We use encryption, secure protocols, and regular security updates to protect your data.
            </p>
          </div>
        </div>

        {/* Section 5 - Children's Information */}
        <div id="childrens-information" className="mb-8 scroll-mt-20">
          <div className="bg-orange-50 border-l-4 border-orange-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">5. Children's Information</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700">
              Our Services are not intended for users under 13. If we discover that we have collected PII from a child under 13 without parental
              consent, we will delete that information.
            </p>
          </div>
        </div>

        {/* Section 6 - Changes to This Policy */}
        <div id="changes" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">6. Changes to This Policy</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700">We may update this Privacy Policy. Your continued use of our Services after changes indicates acceptance of the new policy.</p>
          </div>
        </div>

        {/* Section 7 - Contact Us */}
        <div id="contact-us" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">7. Contact Us</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700">
              For questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:support@senditfax.com" className="text-blue-600 hover:text-blue-800 font-medium">
                support@senditfax.com
              </a>
            </p>
          </div>
        </div>

        {/* Privacy Commitment Section */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-400 rounded-lg p-6 mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🛡️ Our Privacy Commitment</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">🔒 Secure Encryption</p>
              <p className="text-gray-600">All data transmitted through HTTPS/SSL</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">🚫 No Data Selling</p>
              <p className="text-gray-600">We never sell your personal information</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">⏱️ Limited Storage</p>
              <p className="text-gray-600">Fax data deleted after 3 days</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-3">Ready to Send Secure Faxes?</h3>
          <p className="mb-4 text-blue-100">
            Your privacy is protected with SendItFax
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Send Free Fax
            </Link>
            <Link 
              href="/terms"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Terms of Use
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-600 text-center border-t pt-6">
          <p>
            SendItFax is committed to transparency and protecting your privacy. For more information, visit our{" "}
            <Link href="/faq" className="text-blue-600 hover:underline">FAQ page</Link>.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
