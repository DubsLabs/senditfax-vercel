import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";
import Breadcrumbs from "../../components/Breadcrumbs";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

export const metadata = { 
  ...FullSEO.Terms,
  alternates: {
    canonical: "https://senditfax.com/terms",
  },
};

export default function Terms() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Terms of Use", href: "/terms" }
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
        <Breadcrumbs items={[{ label: "Terms of Use", href: "/terms" }]} />
      
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
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Terms and Conditions</h1>
          <p className="text-blue-100 text-sm">
            Last Updated: <span className="font-semibold">Oct 16, 2024</span>
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#use-of-service" className="text-blue-600 hover:underline">1. Use of the Service</a>
            <a href="#prohibited-uses" className="text-blue-600 hover:underline">2. Prohibited Uses</a>
            <a href="#account-responsibility" className="text-blue-600 hover:underline">3. Account Responsibility</a>
            <a href="#intellectual-property" className="text-blue-600 hover:underline">4. Intellectual Property Rights</a>
            <a href="#service-availability" className="text-blue-600 hover:underline">5. Service Availability</a>
            <a href="#limitation-of-liability" className="text-blue-600 hover:underline">6. Limitation of Liability</a>
            <a href="#indemnification" className="text-blue-600 hover:underline">7. Indemnification</a>
            <a href="#privacy-policy" className="text-blue-600 hover:underline">8. Privacy Policy</a>
            <a href="#modifications" className="text-blue-600 hover:underline">9. Modifications to Terms</a>
            <a href="#termination" className="text-blue-600 hover:underline">10. Termination</a>
            <a href="#governing-law" className="text-blue-600 hover:underline">11. Governing Law</a>
            <a href="#contact" className="text-blue-600 hover:underline">12. Contact Information</a>
            <a href="#dmca" className="text-blue-600 hover:underline">13. DMCA Notice</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-5 mb-8 rounded-r-lg">
          <p className="text-gray-800 leading-relaxed">
            Welcome to Send It Fax! These Terms and Conditions govern your access to and use of the Send It Fax website and services (the "Service"). By
            accessing or using the Service, you agree to be bound by these Terms. If you do not agree to all the terms below, do not use the Service.
          </p>
        </div>

        {/* Section 1 */}
        <div id="use-of-service" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">1. Use of the Service</h3>
          </div>
          <div className="pl-4 space-y-3 text-gray-700">
            <p>1.1. Send It Fax allows you to upload documents and send them as faxes to designated recipients.</p>
            <p>1.2. You are responsible for ensuring that all information provided during registration and use of the Service is accurate, current, and
            complete.</p>
            <p>1.3. You must be at least 18 years old or the legal age of majority in your jurisdiction to use this Service.</p>
          </div>
        </div>

        {/* Section 2 */}
        <div id="prohibited-uses" className="mb-8 scroll-mt-20">
          <div className="bg-red-50 border-l-4 border-red-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">2. Prohibited Uses</h3>
          </div>
          <p className="pl-4 mb-4 text-gray-700">
            You agree not to use the Service for any illegal or unauthorized purpose, including but not limited to the following activities:
          </p>
          <ul className="list-disc pl-10 space-y-2 text-gray-700">
            <li>
              Uploading or sending documents that contain unlawful content, including but not limited to content that violates copyright, trademark, or
              intellectual property laws.
            </li>
            <li>Engaging in activities that promote or contain pornography, sexual content, or obscene material.</li>
            <li>Sending spam, unsolicited commercial communications, or engaging in activities classified as "junk faxing."</li>
            <li>Using the Service to harass, abuse, or threaten others.</li>
            <li>
              Attempting to interfere with the security or integrity of the Service, including unauthorized access to our systems or networks.
            </li>
            <li>Impersonating any person or entity, or misrepresenting your affiliation with any person or entity.</li>
          </ul>
          <div className="bg-yellow-50 border border-yellow-300 rounded p-4 mt-4">
            <p className="text-gray-800 font-medium">⚠️ Any breach of this clause may result in the immediate suspension or termination of your account without notice.</p>
          </div>
        </div>

        {/* Section 3 */}
        <div id="account-responsibility" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">3. Account Responsibility</h3>
          </div>
          <p className="pl-4 text-gray-700">
            You are responsible for maintaining the confidentiality of your account login details and are fully responsible for all activities that occur
            under your account. If you suspect any unauthorized use of your account, you must notify us immediately.
          </p>
        </div>

        {/* Section 4 */}
        <div id="intellectual-property" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">4. Intellectual Property Rights</h3>
          </div>
          <p className="pl-4 text-gray-700">
            All content and materials available through the Service, including but not limited to text, graphics, logos, and software, are the property of
            Send It Fax or its licensors. You agree not to copy, distribute, or create derivative works from any content provided through the Service.
          </p>
        </div>

        {/* Section 5 */}
        <div id="service-availability" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">5. Service Availability</h3>
          </div>
          <p className="pl-4 text-gray-700">
            Send It Fax strives to keep the Service operational at all times, but we do not guarantee uninterrupted or error-free service. We reserve the
            right to suspend or terminate access to the Service at any time for any reason.
          </p>
        </div>

        {/* Section 6 */}
        <div id="limitation-of-liability" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">6. Limitation of Liability</h3>
          </div>
          <p className="pl-4 text-gray-700">
            To the fullest extent permitted by law, Send It Fax and its affiliates, officers, employees, and agents will not be liable for any damages,
            including but not limited to direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the
            Service.
          </p>
        </div>

        {/* Section 7 */}
        <div id="indemnification" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">7. Indemnification</h3>
          </div>
          <p className="pl-4 text-gray-700">
            You agree to indemnify and hold harmless Send It Fax and its affiliates, officers, employees, and agents from any claims, liabilities,
            damages, or expenses arising from your use of the Service or violation of these Terms and Conditions.
          </p>
        </div>

        {/* Section 8 */}
        <div id="privacy-policy" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">8. Privacy Policy</h3>
          </div>
          <p className="pl-4 text-gray-700">
            Our Privacy Policy governs the collection, use, and disclosure of your personal information. Please review the{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link> carefully before
            using the Service.
          </p>
        </div>

        {/* Section 9 */}
        <div id="modifications" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">9. Modifications to Terms</h3>
          </div>
          <p className="pl-4 text-gray-700">
            Send It Fax reserves the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the
            Service after any changes will constitute your acceptance of the revised Terms.
          </p>
        </div>

        {/* Section 10 */}
        <div id="termination" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">10. Termination</h3>
          </div>
          <p className="pl-4 text-gray-700">
            We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your
            right to use the Service will cease immediately.
          </p>
        </div>

        {/* Section 11 */}
        <div id="governing-law" className="mb-8 scroll-mt-20">
          <div className="bg-gray-100 border-l-4 border-gray-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">11. Governing Law</h3>
          </div>
          <p className="pl-4 text-gray-700">
            These Terms and Conditions are governed by and construed in accordance with the laws of the state of Oregon, without regard to its conflict of
            law principles.
          </p>
        </div>

        {/* Section 12 */}
        <div id="contact" className="mb-8 scroll-mt-20">
          <div className="bg-blue-50 border-l-4 border-blue-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">12. Contact Information</h3>
          </div>
          <p className="pl-4 text-gray-700">
            If you have any questions or concerns regarding these Terms, please contact us at{" "}
            <a href="mailto:support@senditfax.com" className="text-blue-600 hover:underline font-medium">
              support@senditfax.com
            </a>
          </p>
        </div>

        {/* Section 13 - DMCA */}
        <div id="dmca" className="mb-8 scroll-mt-20">
          <div className="bg-purple-50 border-l-4 border-purple-600 pl-4 py-2 mb-4">
            <h3 className="text-xl font-bold text-gray-800 m-0">13. Digital Millennium Copyright Act (DMCA) Notice</h3>
          </div>
          <div className="pl-4 space-y-4 text-gray-700">
            <p>
              Send It Fax respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital
              Millennium Copyright Act of 1998 (DMCA), we will respond expeditiously to claims of copyright infringement that are reported to our designated
              copyright agent.
            </p>
            <p>
              If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on our Service,
              please notify our copyright agent as set forth in the DMCA. For your complaint to be valid under the DMCA, you must provide the following
              information in writing:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>An electronic or physical signature of a person authorized to act on behalf of the copyright owner;</li>
              <li>Identification of the copyrighted work that you claim has been infringed;</li>
              <li>Identification of the material that is claimed to be infringing and where it is located on the Service;</li>
              <li>
                Information reasonably sufficient to permit Send It Fax to contact you, such as your address, telephone number, and email address;
              </li>
              <li>
                A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner,
                its agent, or law; and
              </li>
              <li>
                A statement, made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized
                to act on behalf of the owner.
              </li>
            </ol>
            <div className="bg-purple-100 border border-purple-300 rounded p-4 mt-4">
              <p className="font-medium">Claims of copyright infringement should be sent to our designated DMCA agent at: support@senditfax.com</p>
            </div>
            <p>
              We reserve the right to remove content alleged to be infringing without prior notice, at our sole discretion, and without liability to you. In
              appropriate circumstances, we will also terminate a user's account if the user is determined to be a repeat infringer.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-300 rounded-lg p-6 mt-10 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Ready to Send a Fax?</h3>
          <p className="text-gray-700 mb-4">
            Start using SendItFax today - no registration required!
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Send Free Fax
            </Link>
            <Link 
              href="/privacy"
              className="inline-block bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
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
