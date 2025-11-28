import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata = { 
  ...FullSEO.CookiePolicy,
  alternates: {
    canonical: "https://senditfax.com/cookie-policy",
  },
};

export default function CookiePolicy() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Cookie Policy", href: "/cookie-policy" }
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
        <Breadcrumbs items={[{ label: "Cookie Policy", href: "/cookie-policy" }]} />
      
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
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Cookie Policy</h1>
          <p className="text-purple-100 text-sm">
            Last Updated: <span className="font-semibold">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#what-are-cookies" className="text-blue-600 hover:underline">1. What Are Cookies</a>
            <a href="#types-of-cookies" className="text-blue-600 hover:underline">2. Types of Cookies We Use</a>
            <a href="#third-party-cookies" className="text-blue-600 hover:underline">3. Third-Party Cookies</a>
            <a href="#cookie-controls" className="text-blue-600 hover:underline">4. Cookie Controls</a>
            <a href="#changes" className="text-blue-600 hover:underline">5. Changes to This Policy</a>
            <a href="#contact-us" className="text-blue-600 hover:underline">6. Contact Us</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-purple-50 border-l-4 border-purple-600 p-5 mb-8 rounded-r-lg">
          <p className="text-gray-800 leading-relaxed">
            This Cookie Policy explains how SendItFax ("we," "us," "our") uses cookies and similar tracking technologies on our website{" "}
            <Link href="https://www.senditfax.com" className="text-blue-600 hover:text-blue-800 font-medium">
              www.senditfax.com
            </Link>
            . By using our website, you consent to the use of cookies as described in this policy.
          </p>
        </div>

        {/* Section 1 - What Are Cookies */}
        <div id="what-are-cookies" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">1. What Are Cookies</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">How Cookies Work</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Cookies store information about your preferences and browsing behavior</li>
                <li>They help websites remember your settings and improve your experience</li>
                <li>Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain until deleted or expired)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 - Types of Cookies We Use */}
        <div id="types-of-cookies" className="mb-8 scroll-mt-20">
          <div className="bg-green-50 border-l-4 border-green-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">2. Types of Cookies We Use</h2>
          </div>
          <div className="pl-4 space-y-6">
            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Essential Cookies</h3>
              <p className="mb-3 text-gray-700">These cookies are necessary for the website to function properly. They enable core functionality such as:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                <li>Security and fraud prevention</li>
                <li>Remembering your form submissions</li>
                <li>Maintaining session state</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">These cookies cannot be disabled as they are essential for the service to work.</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-5 border border-yellow-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Analytics Cookies</h3>
              <p className="mb-3 text-gray-700">We use analytics cookies to understand how visitors interact with our website:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                <li>Google Analytics - to track website usage and improve user experience</li>
                <li>Microsoft Clarity - for user behavior analytics</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">These cookies help us improve our website's performance and user experience.</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Advertising Cookies</h3>
              <p className="mb-3 text-gray-700">We use advertising cookies to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                <li>Display relevant advertisements (Google AdSense)</li>
                <li>Measure ad performance</li>
                <li>Prevent showing the same ad repeatedly</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">These cookies help us provide free services by showing relevant ads.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Preference Cookies</h3>
              <p className="mb-3 text-gray-700">These cookies remember your preferences:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                <li>Language preferences</li>
                <li>Cookie consent choices</li>
                <li>Display settings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3 - Third-Party Cookies */}
        <div id="third-party-cookies" className="mb-8 scroll-mt-20">
          <div className="bg-purple-50 border-l-4 border-purple-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">3. Third-Party Cookies</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver advertisements. These include:
            </p>
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Google Analytics</strong> - Website analytics and performance tracking</li>
                <li><strong>Google AdSense</strong> - Advertising services</li>
                <li><strong>Microsoft Clarity</strong> - User behavior analytics</li>
                <li><strong>Stripe</strong> - Payment processing (when making payments)</li>
              </ul>
            </div>
            <p className="text-gray-700">
              These third parties may use cookies to collect information about your online activities across different websites. We do not control these third-party cookies.
            </p>
          </div>
        </div>

        {/* Section 4 - Cookie Controls */}
        <div id="cookie-controls" className="mb-8 scroll-mt-20">
          <div className="bg-indigo-50 border-l-4 border-indigo-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">4. Cookie Controls</h2>
          </div>
          <div className="pl-4 space-y-4">
            <p className="text-gray-700">
              You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
            </p>
            <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">How to Manage Cookies</h3>
              <p className="mb-3 text-gray-700">You can control cookies through:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies. Check your browser's help section for instructions.</li>
                <li><strong>Cookie Consent Banner:</strong> When you first visit our site, you can choose which cookies to accept.</li>
                <li><strong>Opt-Out Tools:</strong> You can opt out of certain third-party cookies through their respective opt-out pages:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-Out</a></li>
                    <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ad Settings</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-300 rounded p-4">
              <p className="text-gray-800 font-medium">⚠️ Note: Disabling cookies may affect the functionality of our website and your ability to use certain features.</p>
            </div>
          </div>
        </div>

        {/* Section 5 - Changes to This Policy */}
        <div id="changes" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">5. Changes to This Policy</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
            </p>
          </div>
        </div>

        {/* Section 6 - Contact Us */}
        <div id="contact-us" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">6. Contact Us</h2>
          </div>
          <div className="pl-4">
            <p className="text-gray-700">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at{" "}
              <a href="mailto:support@senditfax.com" className="text-blue-600 hover:text-blue-800 font-medium">
                support@senditfax.com
              </a>
            </p>
          </div>
        </div>

        {/* Cookie Summary */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-400 rounded-lg p-6 mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🍪 Cookie Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">Essential Cookies</p>
              <p className="text-gray-600">Required for website functionality - Cannot be disabled</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">Analytics Cookies</p>
              <p className="text-gray-600">Help us improve our website - Can be disabled</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">Advertising Cookies</p>
              <p className="text-gray-600">Enable free services through ads - Can be disabled</p>
            </div>
            <div className="bg-white rounded p-4 shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">Preference Cookies</p>
              <p className="text-gray-600">Remember your settings - Can be disabled</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 mt-8 text-center">
          <h3 className="text-xl font-semibold mb-3">Questions About Cookies?</h3>
          <p className="mb-4 text-blue-100">
            We're here to help. Contact us if you have any questions about our cookie usage.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Send Free Fax
            </Link>
            <Link 
              href="/privacy"
              className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors font-semibold"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

