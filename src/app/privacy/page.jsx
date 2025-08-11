import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";

export const metadata = { ...FullSEO.Privacy };

export default function Privacy() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col items-center w-full gap-4 text-sm">
        <Link href="/">
          <Image src={Logo} alt="SendItFax Logo" width={192} height={60} priority={true} className="w-48 md:w-64" />
        </Link>
        <h1 className="text-center cursor-default">
          Send <span className="font-semibold">FREE</span> Faxes to U.S. and Canada, no account necessary.
        </h1>
      </div>

      <div className="prose prose-slate max-w-none">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="mb-6">
          <p className="text-gray-600">
            Last Updated: <span className="font-medium">Oct 16, 2024</span>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            SendItFax ("we," "us," "our") is committed to protecting your personally identifiable information ("PII"). This Privacy Policy applies to
            our website{" "}
            <Link href="http://www.senditfax.com" className="text-blue-600 hover:text-blue-800">
              www.SendItFax.com
            </Link>{" "}
            and the document upload and fax transmission services ("Services") provided through it.
          </p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect both PII and non-personally identifiable information ("non-PII").</p>

            <h3 className="text-xl font-medium mb-3">Personally Identifiable Information</h3>
            <p className="mb-2">We may collect PII when you:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Submit sender and receiver information for fax transmission</li>
              <li>Provide content to be sent via fax</li>
              <li>Request customer support</li>
              <li>Subscribe to newsletters</li>
              <li>Make a purchase</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Non-Personally Identifiable Information</h3>
            <p className="mb-2">We also collect non-PII, such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address and device identifiers</li>
              <li>Usage data (e.g., pages viewed, ads clicked)</li>
              <li>Demographic information</li>
            </ul>
          </section>

          {/* Use of Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and enhance our Services</li>
              <li>Communicate with you about your account and transactions</li>
              <li>Personalize user experience</li>
              <li>Conduct marketing and analytics</li>
            </ul>
          </section>

          {/* Disclosure of Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Disclosure of Your Information</h2>
            <p className="mb-2">We do not sell your PII. However, we may share your information with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Service providers who assist in operating our website and Services</li>
              <li>Law enforcement, if required by law</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your PII but cannot guarantee complete security. You are responsible for
              safeguarding your information while using public networks.
            </p>
          </section>

          {/* Children's Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Children's Information</h2>
            <p>
              Our Services are not intended for users under 13. If we discover that we have collected PII from a child under 13 without parental
              consent, we will delete that information.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p>We may update this Privacy Policy. Your continued use of our Services after changes indicates acceptance of the new policy.</p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:support@senditfax.com" className="text-blue-600 hover:text-blue-800">
                support@senditfax.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
