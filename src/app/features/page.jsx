import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";
import featurePoints from "../../utils/featurePoints";

export const metadata = { 
  ...FullSEO.Features,
  alternates: {
    canonical: "https://senditfax.com/features",
  },
};

export default function Features() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Features", href: "/features" }
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
        <Breadcrumbs items={[{ label: "Features", href: "/features" }]} />
      
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">SendItFax Features</h1>
          <p className="text-blue-100 text-lg">
            Everything you need to send faxes online - fast, secure, and reliable
          </p>
        </div>

        {/* Free vs Paid Comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free Plan */}
          <div className="bg-white border-2 border-green-500 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-green-600 mb-2">Free Fax</h2>
              <p className="text-4xl font-bold text-gray-800">$0.00</p>
              <p className="text-gray-600 text-sm mt-1">Forever free, no credit card needed</p>
            </div>
            <ul className="space-y-3">
              {featurePoints.Free.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors block"
            >
              Send Free Fax
            </Link>
          </div>

          {/* Paid Plan */}
          <div className="bg-white border-2 border-blue-500 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">Priority Fax</h2>
              <p className="text-4xl font-bold text-gray-800">$1.99</p>
              <p className="text-gray-600 text-sm mt-1">Per fax, one-time payment</p>
            </div>
            <ul className="space-y-3">
              {featurePoints.Paid.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors block"
            >
              Send Priority Fax
            </Link>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Registration Required</h3>
              <p className="text-gray-700">
                Start sending faxes immediately without creating an account. No email verification, no sign-up process - just upload and send.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Encrypted</h3>
              <p className="text-gray-700">
                All fax transmissions are encrypted using industry-standard security protocols. Your documents are protected from unauthorized access.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Multiple File Formats</h3>
              <p className="text-gray-700">
                Support for PDF and DOCX files. Upload multiple files (up to 3) and send them as a single fax transmission.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-700">
                Priority faxes are delivered faster than free faxes. Get instant delivery confirmation and tracking for all your faxes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Delivery Tracking</h3>
              <p className="text-gray-700">
                Track the status of your fax in real-time. Receive email notifications with your unique Fax ID for status checking.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 border border-pink-200">
              <div className="text-4xl mb-3">💳</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-700">
                Powered by Stripe for secure payment processing. Your payment information is never stored on our servers.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
              <div className="text-4xl mb-3">🌎</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">USA & Canada Coverage</h3>
              <p className="text-gray-700">
                Send faxes to any fax number in the United States and Canada. Reliable delivery to both countries.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Protected</h3>
              <p className="text-gray-700">
                Your fax content is automatically deleted after 3 days. We never sell your personal information or fax content.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Features */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Technical Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-800 mb-1">Mobile Friendly</h3>
              <p className="text-sm text-gray-600">Works on all devices - desktop, tablet, and mobile</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🌐</div>
              <h3 className="font-semibold text-gray-800 mb-1">Browser Based</h3>
              <p className="text-sm text-gray-600">No software installation required - works in any modern browser</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="font-semibold text-gray-800 mb-1">Easy to Use</h3>
              <p className="text-sm text-gray-600">Simple, intuitive interface - send faxes in minutes</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">👨‍⚕️ Healthcare Professionals</h3>
              <p className="text-gray-600 text-sm">Send medical records, prescriptions, and patient information securely</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">⚖️ Legal Professionals</h3>
              <p className="text-gray-600 text-sm">Transmit legal documents, contracts, and court filings</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">🏢 Small Businesses</h3>
              <p className="text-gray-600 text-sm">Send invoices, purchase orders, and business documents</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-2">👤 Personal Use</h3>
              <p className="text-gray-600 text-sm">Send applications, forms, and personal documents</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-3">Ready to Experience These Features?</h3>
          <p className="mb-6 text-blue-100">
            Start sending faxes today - no registration required!
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Send Free Fax
            </Link>
            <Link 
              href="/calculator"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Cost Calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

