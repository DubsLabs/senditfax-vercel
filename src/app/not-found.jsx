import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo.png";

export const metadata = {
  title: "Page Not Found - SendItFax",
  description: "The page you're looking for doesn't exist. Return to SendItFax to send free faxes online.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <Link href="/" className="inline-block mb-8">
          <Image 
            src={Logo} 
            alt="SendItFax Logo" 
            width={192} 
            height={60} 
            className="w-48 md:w-64 mx-auto"
          />
        </Link>

        <div className="border-2 border-gray-300 rounded-lg p-12 mb-8 bg-gray-50">
          <h1 className="text-8xl font-bold mb-4 text-gray-800">404</h1>
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            What would you like to do?
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/"
              className="border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-2">📠</span>
              <span>Send a Fax</span>
            </Link>
            <Link 
              href="/faq"
              className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-2">❓</span>
              <span>Visit FAQ</span>
            </Link>
            <Link 
              href="/how-to-send-fax-online"
              className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-2">📖</span>
              <span>How-To Guide</span>
            </Link>
            <Link 
              href="/status"
              className="border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-2">📊</span>
              <span>Check Fax Status</span>
            </Link>
          </div>
        </div>

        <div className="text-gray-600">
          <p className="mb-4">
            Need help? Check out these popular pages:
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span>•</span>
            <Link href="/about" className="text-blue-600 hover:underline">About Us</Link>
            <span>•</span>
            <Link href="/faq" className="text-blue-600 hover:underline">FAQ</Link>
            <span>•</span>
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
