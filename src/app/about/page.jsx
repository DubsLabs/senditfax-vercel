import FullSEO from "../../config/FullSEO";
import Breadcrumbs from "../../components/Breadcrumbs";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../images/logo.png";

export const metadata = { 
  ...FullSEO.About,
  alternates: {
    canonical: "https://senditfax.com/about",
  },
};

export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "About Us", href: "/about" }]} />
      
      <div className="mb-8 flex flex-col items-center w-full gap-4">
        <Link href="/">
          <Image src={Logo} alt="SendItFax Logo" width={192} height={60} priority={true} className="w-48 md:w-64" />
        </Link>
      </div>

      <article className="prose prose-slate max-w-none">
        <h1 className="text-3xl font-bold mb-6">About SendItFax</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <p className="text-lg font-medium text-blue-900 mb-2">
            Your Free Online Fax Solution for USA and Canada
          </p>
          <p className="text-blue-800">
            SendItFax is a completely free online fax service that makes sending faxes simple, fast, and accessible to everyone - no account, no credit card, and no hidden fees required.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p>
          We believe that sending a fax shouldn't require expensive equipment, complicated software, or monthly subscriptions. Our mission is to provide a simple, reliable, and truly free fax service that anyone can use - whether you're a small business owner, healthcare professional, legal practitioner, or an individual who needs to send an occasional fax.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why SendItFax?</h2>
        <p>
          In an increasingly digital world, fax communication remains essential for many industries, particularly in healthcare, legal, real estate, and government sectors where secure document transmission is critical. However, traditional fax machines are expensive to purchase and maintain, requiring dedicated phone lines and physical space.
        </p>
        <p>
          SendItFax eliminates these barriers by providing a web-based solution that works on any device with internet access. No downloads, no installations, no accounts - just fill out a simple form and send your fax.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Free Fax Service</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Truly Free:</strong> Send up to 5 faxes per day (up to 3 pages each) at absolutely no cost</li>
          <li><strong>No Account Required:</strong> Start sending faxes immediately without registration</li>
          <li><strong>No Credit Card:</strong> Free faxes don't require any payment information</li>
          <li><strong>Fast Delivery:</strong> Most faxes are delivered within 5-15 minutes</li>
          <li><strong>Email Notifications:</strong> Track your fax status with automatic email updates</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Priority Fax Service ($1.99)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Extended Pages:</strong> Send up to 25 pages per fax</li>
          <li><strong>Priority Queue:</strong> Faster delivery with priority processing</li>
          <li><strong>No Branding:</strong> Remove SendItFax branding from cover page</li>
          <li><strong>Optional Cover:</strong> Choice to send without a cover page</li>
          <li><strong>No Subscription:</strong> Pay only when you need it</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Coverage</h2>
        <p>
          SendItFax provides comprehensive coverage across the United States and Canada. We support all US area codes (including all 50 states and territories) and all Canadian provinces. Whether you're sending a fax to New York, California, Texas, Ontario, Quebec, or anywhere else in North America, we've got you covered.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Security & Privacy</h2>
        <p>
          We take your privacy seriously. All fax transmissions are encrypted using industry-standard security protocols. We temporarily store fax content for a maximum of 3 days for delivery tracking purposes, after which all data is permanently deleted. We never share your information with third parties, and we never sell your data.
        </p>
        <p>
          For complete details, please review our{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
            Privacy Policy
          </Link>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Who Uses SendItFax?</h2>
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Healthcare Professionals</h3>
            <p className="text-sm text-gray-700">Doctors, nurses, and medical staff sending patient records, prescriptions, and medical documents securely.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Legal Practitioners</h3>
            <p className="text-sm text-gray-700">Lawyers and legal assistants transmitting contracts, court documents, and legal correspondence.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Real Estate Agents</h3>
            <p className="text-sm text-gray-700">Realtors sending offers, contracts, and property documents to clients and escrow companies.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Small Business Owners</h3>
            <p className="text-sm text-gray-700">Entrepreneurs and small businesses sending invoices, purchase orders, and business documents.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Individuals</h3>
            <p className="text-sm text-gray-700">Anyone who needs to send occasional faxes for personal matters, applications, or official documents.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Remote Workers</h3>
            <p className="text-sm text-gray-700">Professionals working from home who need fax capabilities without office equipment.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
        <p>
          SendItFax is built on modern web technologies that ensure reliability, security, and speed. Our platform converts your digital documents into fax format and transmits them through secure channels to traditional fax machines or other online fax services. The process is seamless and typically completes within minutes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Frequently Asked Questions</h2>
        <p>
          Have questions about our service? Visit our{" "}
          <Link href="/faq" className="text-blue-600 hover:underline font-medium">
            FAQ page
          </Link>{" "}
          for detailed answers about how to use SendItFax, our pricing, security features, and more.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Get Started Today</h2>
        <p>
          Ready to send your first fax? It takes less than 2 minutes and requires no registration. Simply visit our{" "}
          <Link href="/" className="text-blue-600 hover:underline font-medium">
            home page
          </Link>, fill out the form, upload your document, and click send. It's that simple!
        </p>

        <div className="bg-green-50 border-l-4 border-green-600 p-6 mt-8 mb-6">
          <h3 className="text-xl font-semibold text-green-900 mb-3">Join Thousands of Satisfied Users</h3>
          <p className="text-green-800 mb-4">
            SendItFax has helped thousands of individuals and businesses send important documents quickly and securely. No expensive equipment, no monthly fees, no hassle - just simple, reliable faxing when you need it.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Send Your First Free Fax Now
          </Link>
        </div>

        <p className="text-sm text-gray-600 mt-8">
          For terms of service, please see our{" "}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms and Conditions
          </Link>.
        </p>
      </article>
    </section>
  );
}
