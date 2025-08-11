import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../images/logo.png";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-200">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <Link href="/">
            <Image src={Logo} alt="SendItFax Logo" width={128} height={40} priority={true} />
          </Link>

          <div className="flex flex-col items-center sm:items-end">
            <nav className="flex gap-2 text-sm sm:gap-4 sm:text-base">
              <Link href="/faq">FAQ</Link>
              <p>|</p>
              <Link href="/terms">Terms of Use</Link>
              <p>|</p>
              <Link href="/privacy">Privacy Policy</Link>
            </nav>

            <div className="mt-4 text-sm text-gray-600">© {new Date().getFullYear()} SendItFax. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
