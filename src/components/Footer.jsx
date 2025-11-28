import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-slate-200 mt-auto">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="py-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-6">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <Link href="/" className="inline-block mb-3">
                <Image src={Logo} alt="SendItFax - Free Online Fax Service" width={128} height={40} />
              </Link>
              <p className="text-sm text-gray-600 mb-3">
                Send free faxes online to USA and Canada without registration. Fast, secure, and reliable.
              </p>
              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800 mb-1">Contact Us:</p>
                <a href="mailto:support@senditfax.com" className="text-blue-600 hover:text-blue-800 transition-colors">
                  support@senditfax.com
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Quick Links</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">
                  FAQ
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </nav>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Resources</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/status" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Check Fax Status
                </Link>
                <Link href="/calculator" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Cost Calculator
                </Link>
              </nav>
            </div>

            {/* How to Send Fax Online - Separate Column */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Guides</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/how-to-send-fax-online" className="text-gray-600 hover:text-blue-600 transition-colors">
                  How to Send Fax Online
                </Link>
                <Link href="/how-to-send-fax-for-doctors" className="text-gray-600 hover:text-blue-600 transition-colors">
                  For Doctors
                </Link>
                <Link href="/how-to-send-fax-for-lawyers" className="text-gray-600 hover:text-blue-600 transition-colors">
                  For Lawyers
                </Link>
                <Link href="/how-to-send-fax-personal" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Personal Use
                </Link>
                <Link href="/how-to-send-fax-for-small-business" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Small Business
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Legal</h3>
              <nav className="flex flex-col gap-2 text-sm">
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Use
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 pt-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
              <p>© {new Date().getFullYear()} SendItFax. All rights reserved.</p>
              <p>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Send Free Fax Online
                </Link>
                {" | "}
                <Link href="/faq" className="hover:text-blue-600 transition-colors">
                  Help Center
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Memoize Footer to prevent unnecessary re-renders
export default React.memo(Footer);
