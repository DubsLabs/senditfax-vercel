import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata = { 
  ...FullSEO.RefundPolicy,
  alternates: {
    canonical: "https://senditfax.com/refund-policy",
  },
};

export default function RefundPolicy() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Refund Policy", href: "/refund-policy" }
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
        <Breadcrumbs items={[{ label: "Refund Policy", href: "/refund-policy" }]} />
      
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
          <h1 className="text-4xl font-bold mb-2 text-white">Refund Policy</h1>
          <p className="text-green-100 text-sm">
            Last Updated: <span className="font-semibold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#overview" className="text-blue-600 hover:underline">1. Overview</a>
            <a href="#refund-eligibility" className="text-blue-600 hover:underline">2. Refund Eligibility</a>
            <a href="#non-refundable" className="text-blue-600 hover:underline">3. Non-Refundable Situations</a>
            <a href="#refund-process" className="text-blue-600 hover:underline">4. Refund Process</a>
            <a href="#processing-time" className="text-blue-600 hover:underline">5. Processing Time</a>
            <a href="#contact-us" className="text-blue-600 hover:underline">6. Contact Us</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-green-50 border-l-4 border-green-600 p-5 mb-8 rounded-r-lg">
          <p className="text-gray-800 leading-relaxed">
            At SendItFax, we strive to provide excellent service. This Refund Policy outlines the circumstances under which refunds may be issued for our paid fax services. Please read this policy carefully before making a purchase.
          </p>
        </div>

        {/* Section 1 - Overview */}
        <div id="overview" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">1. Overview</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">
              SendItFax offers both free and paid fax services. Our paid service costs $1.99 per fax and includes priority delivery, up to 25 pages, and no branding. This refund policy applies specifically to paid fax transactions.
            </p>
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Free Service</h3>
              <p className="text-gray-700">
                Our free fax service is provided at no cost and does not require refunds. Free faxes include SendItFax branding and are limited to 3 pages.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 - Refund Eligibility */}
        <div id="refund-eligibility" className="mb-8 scroll-mt-20">
          <div className="bg-green-50 border-l-4 border-green-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">2. Refund Eligibility</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">Refunds may be issued in the following circumstances:</p>
            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Eligible for Refund</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Failed Transmission:</strong> If the fax fails to transmit due to a technical error on our part</li>
                <li><strong>Duplicate Payment:</strong> If you were charged multiple times for the same fax</li>
                <li><strong>Service Unavailability:</strong> If our service was unavailable at the time of your payment and the fax could not be sent</li>
                <li><strong>Incorrect Processing:</strong> If we processed your payment but failed to send the fax due to our error</li>
                <li><strong>Payment Error:</strong> If you were charged incorrectly (e.g., wrong amount)</li>
              </ul>
            </div>
            <div className="bg-green-100 border border-green-300 rounded p-4">
              <p className="text-gray-800 font-medium">✓ Refund requests must be submitted within 30 days of the transaction date</p>
            </div>
          </div>
        </div>

        {/* Section 3 - Non-Refundable Situations */}
        <div id="non-refundable" className="mb-8 scroll-mt-20">
          <div className="bg-red-50 border-l-4 border-red-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">3. Non-Refundable Situations</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">Refunds will NOT be issued in the following situations:</p>
            <div className="bg-red-50 rounded-lg p-5 border border-red-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Not Eligible for Refund</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Successful Transmission:</strong> If the fax was successfully delivered to the recipient</li>
                <li><strong>Recipient Issues:</strong> If the recipient's fax machine was busy, offline, or unable to receive</li>
                <li><strong>Incorrect Information:</strong> If you provided incorrect recipient fax number or information</li>
                <li><strong>File Format Issues:</strong> If your file was corrupted, in an unsupported format, or contained errors</li>
                <li><strong>User Error:</strong> If the issue was caused by user error (wrong number, wrong file, etc.)</li>
                <li><strong>Change of Mind:</strong> If you simply changed your mind after payment</li>
                <li><strong>Delayed Delivery:</strong> If the fax was delivered but with a delay (unless due to our technical error)</li>
                <li><strong>Tips/Donations:</strong> Tips or donations are non-refundable</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-300 rounded p-4">
              <p className="text-gray-800 font-medium">⚠️ Please verify all information before submitting your fax to avoid non-refundable situations.</p>
            </div>
          </div>
        </div>

        {/* Section 4 - Refund Process */}
        <div id="refund-process" className="mb-8 scroll-mt-20">
          <div className="bg-purple-50 border-l-4 border-purple-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">4. Refund Process</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">To request a refund, please follow these steps:</p>
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>
                  <strong>Contact Us:</strong> Email us at{" "}
                  <a href="mailto:support@senditfax.com" className="text-blue-600 hover:text-blue-800 font-medium">
                    support@senditfax.com
                  </a>{" "}
                  with the subject line "Refund Request"
                </li>
                <li>
                  <strong>Provide Information:</strong> Include the following in your email:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Transaction ID or Payment Intent ID</li>
                    <li>Date and time of the transaction</li>
                    <li>Amount paid</li>
                    <li>Fax ID (if available)</li>
                    <li>Reason for refund request</li>
                    <li>Any relevant screenshots or documentation</li>
                  </ul>
                </li>
                <li>
                  <strong>Review Process:</strong> We will review your request within 2-3 business days
                </li>
                <li>
                  <strong>Decision:</strong> You will receive an email notification of our decision
                </li>
                <li>
                  <strong>Processing:</strong> If approved, the refund will be processed to your original payment method
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Section 5 - Processing Time */}
        <div id="processing-time" className="mb-8 scroll-mt-20">
          <div className="bg-indigo-50 border-l-4 border-indigo-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">5. Processing Time</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">
              Once your refund request is approved, the processing time depends on your payment method:
            </p>
            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Credit/Debit Cards:</strong> 5-10 business days to appear in your account</li>
                <li><strong>Stripe Payments:</strong> Refunds are typically processed within 5-7 business days</li>
                <li><strong>Bank Transfers:</strong> May take up to 10-14 business days</li>
              </ul>
            </div>
            <p className="text-gray-700">
              Please note that the time it takes for the refund to appear in your account may vary depending on your bank or financial institution.
            </p>
          </div>
        </div>

        {/* Section 6 - Contact Us */}
        <div id="contact-us" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">6. Contact Us</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700 mb-3">
              If you have any questions about this Refund Policy or need to request a refund, please contact us:
            </p>
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <p className="text-gray-800 mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:support@senditfax.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  support@senditfax.com
                </a>
              </p>
              <p className="text-gray-800">
                <strong>Response Time:</strong> We typically respond to refund requests within 2-3 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Refund Summary */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-400 rounded-lg p-6 mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">💰 Refund Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-green-700 mb-1">✓ Eligible for Refund</p>
              <p className="text-gray-600">Failed transmissions, duplicate payments, service errors</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-red-700 mb-1">✗ Not Eligible</p>
              <p className="text-gray-600">Successful deliveries, user errors, change of mind</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">⏱️ Request Timeframe</p>
              <p className="text-gray-600">Within 30 days of transaction</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">💳 Processing Time</p>
              <p className="text-gray-600">5-10 business days</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-3">Need Help with a Refund?</h3>
          <p className="mb-4 text-blue-100">
            Contact our support team - we're here to help!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:support@senditfax.com"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Contact Support
            </a>
            <Link 
              href="/faq"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Visit FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

