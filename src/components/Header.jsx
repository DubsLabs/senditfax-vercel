import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-[lightgray] px-4 py-3 rounded-br-2xl rounded-bl-2xl">
      <Link href="/">
        <h1>SendItFax</h1>
      </Link>

      <p>1.000.000 Faxes Sent</p>

      {/* <nav className="flex gap-4">
        <Link to="/FAQ">FAQ</Link>
        <p>|</p>
        <Link to="/about">About</Link>
      </nav> */}
    </header>
  );
}
