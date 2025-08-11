import FullSEO from "../../config/FullSEO";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../images/logo.png";

export const metadata = { ...FullSEO.Terms };

export default function Terms() {
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
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="italic font-normal mb-4">
        Last Updated:
        <span>Oct 16, 2024</span>
      </p>
      <p className="font-normal">
        Welcome to Send It Fax! These Terms and Conditions govern your access to and use of the Send It Fax website and services (the "Service"). By
        accessing or using the Service, you agree to be bound by these Terms. If you do not agree to all the terms below, do not use the Service.
      </p>
      <h3 className="font-bold">1. Use of the Service</h3>
      <p className="font-normal">
        1.1. Send It Fax allows you to upload documents and send them as faxes to designated recipients.
        <br />
        1.2. You are responsible for ensuring that all information provided during registration and use of the Service is accurate, current, and
        complete.
        <br />
        1.3. You must be at least 18 years old or the legal age of majority in your jurisdiction to use this Service.
      </p>
      <h3 className="font-bold">2. Prohibited Uses</h3>
      <p className="font-normal">
        You agree not to use the Service for any illegal or unauthorized purpose, including but not limited to the following activities:
      </p>
      <ul>
        <li className="font-normal">
          Uploading or sending documents that contain unlawful content, including but not limited to content that violates copyright, trademark, or
          intellectual property laws.
        </li>
        <li className="font-normal">Engaging in activities that promote or contain pornography, sexual content, or obscene material.</li>
        <li className="font-normal">Sending spam, unsolicited commercial communications, or engaging in activities classified as "junk faxing."</li>
        <li className="font-normal">Using the Service to harass, abuse, or threaten others.</li>
        <li className="font-normal">
          Attempting to interfere with the security or integrity of the Service, including unauthorized access to our systems or networks.
        </li>
        <li className="font-normal">Impersonating any person or entity, or misrepresenting your affiliation with any person or entity.</li>
      </ul>
      <p className="font-normal">Any breach of this clause may result in the immediate suspension or termination of your account without notice.</p>
      <h3 className="font-bold">3. Account Responsibility</h3>
      <p className="font-normal">
        You are responsible for maintaining the confidentiality of your account login details and are fully responsible for all activities that occur
        under your account. If you suspect any unauthorized use of your account, you must notify us immediately.
      </p>
      <h3 className="font-bold">4. Intellectual Property Rights</h3>
      <p className="font-normal">
        All content and materials available through the Service, including but not limited to text, graphics, logos, and software, are the property of
        Send It Fax or its licensors. You agree not to copy, distribute, or create derivative works from any content provided through the Service.
      </p>
      <h3 className="font-bold">5. Service Availability</h3>
      <p className="font-normal">
        Send It Fax strives to keep the Service operational at all times, but we do not guarantee uninterrupted or error-free service. We reserve the
        right to suspend or terminate access to the Service at any time for any reason.
      </p>
      <h3 className="font-bold">6. Limitation of Liability</h3>
      <p className="font-normal">
        To the fullest extent permitted by law, Send It Fax and its affiliates, officers, employees, and agents will not be liable for any damages,
        including but not limited to direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the
        Service.
      </p>
      <h3 className="font-bold">7. Indemnification</h3>
      <p className="font-normal">
        You agree to indemnify and hold harmless Send It Fax and its affiliates, officers, employees, and agents from any claims, liabilities,
        damages, or expenses arising from your use of the Service or violation of these Terms and Conditions.
      </p>
      <h3 className="font-bold">8. Privacy Policy</h3>
      <p className="font-normal">
        Our Privacy Policy governs the collection, use, and disclosure of your personal information. Please review the Privacy Policy carefully before
        using the Service.
      </p>
      <h3 className="font-bold">9. Modifications to Terms</h3>
      <p className="font-normal">
        Send It Fax reserves the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the
        Service after any changes will constitute your acceptance of the revised Terms.
      </p>
      <h3 className="font-bold">10. Termination</h3>
      <p className="font-normal">
        We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your
        right to use the Service will cease immediately.
      </p>
      <h3 className="font-bold">11. Governing Law</h3>
      <p className="font-normal">
        These Terms and Conditions are governed by and construed in accordance with the laws of the state of Oregon, without regard to its conflict of
        law principles.
      </p>
      <h3 className="font-bold">12. Contact Information</h3>
      <p className="font-normal">If you have any questions or concerns regarding these Terms, please contact us at </p>
      <a href="mailto:support@senditfax.com">
        <span className="font-normal">support@senditfax.com</span>
      </a>
      <ol start="13">
        <li>
          <strong> Digital Millennium Copyright Act (DMCA) Notice</strong>
        </li>
      </ol>
      <p className="font-normal">
        Send It Fax respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital
        Millennium Copyright Act of 1998 (DMCA), we will respond expeditiously to claims of copyright infringement that are reported to our designated
        copyright agent.
      </p>
      <p className="font-normal">
        If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on our Service,
        please notify our copyright agent as set forth in the DMCA. For your complaint to be valid under the DMCA, you must provide the following
        information in writing:
      </p>
      <ol>
        <li className="font-normal">An electronic or physical signature of a person authorized to act on behalf of the copyright owner;</li>
        <li className="font-normal">Identification of the copyrighted work that you claim has been infringed;</li>
        <li className="font-normal">Identification of the material that is claimed to be infringing and where it is located on the Service;</li>
        <li className="font-normal">
          Information reasonably sufficient to permit Send It Fax to contact you, such as your address, telephone number, and email address;
        </li>
        <li className="font-normal">
          A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner,
          its agent, or law; and
        </li>
        <li className="font-normal">
          A statement, made under penalty of perjury, that the above information is accurate, and that you are the copyright owner or are authorized
          to act on behalf of the owner.
        </li>
      </ol>
      <p className="font-normal">Claims of copyright infringement should be sent to our designated DMCA agent at: support@senditfax.com</p>
      <p className="font-normal">
        We reserve the right to remove content alleged to be infringing without prior notice, at our sole discretion, and without liability to you. In
        appropriate circumstances, we will also terminate a user's account if the user is determined to be a repeat infringer.
      </p>
      <p>&nbsp;</p>
    </section>
  );
}
