import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Logo from "../images/logo.png";
import MainInputs from "../components/MainInputs";
import Image from "next/image";
import AdSense from "@/components/AdSense";

// Lazy load below-the-fold components
const SEOContent = dynamic(() => import("../components/SEOContent"), {
  ssr: true, // Keep SSR for SEO
  loading: () => <div style={{ minHeight: '200px' }} />,
});

const Testimonials = dynamic(() => import("../components/Testimonials"), {
  ssr: true, // Keep SSR for SEO
  loading: () => <div style={{ minHeight: '400px' }} />,
});

export default function Main() {
  return (
    <div className="flex flex-col w-full">
      <section className="flex flex-col items-center w-full gap-5 px-4 mx-auto max-w-7xl">
        <header className="flex flex-col items-center w-full gap-4 text-sm">
          <Image
            src={Logo}
            alt="SendItFax - Free Online Fax Service to USA and Canada"
            width={192}
            height={60}
            priority={true}
            quality={90}
            sizes="(max-width: 768px) 192px, 256px"
            className="w-48 md:w-64"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk46NjU+PVBVVEVFRUVFRUX/2wBDARUXFx4aHjshITtBNTtFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <h1 className="text-center cursor-default">
            Send <span className="font-semibold">Free Fax Online</span> to USA & Canada - No Registration Required
          </h1>
          <p className="text-center text-base cursor-default">
            Fast, secure online fax service. Send up to 3 pages free or 25 pages for $1.99. No account needed.
          </p>
          <p className="text-center text-sm text-gray-600">
            Have questions?{" "}
            <Link href="/faq" className="text-blue-600 hover:underline font-medium">
              Check our FAQ
            </Link>
            {" "}or learn more{" "}
            <Link href="/about" className="text-blue-600 hover:underline font-medium">
              about us
            </Link>.
          </p>
        </header>

        {/* Main content with ads on left and right */}
        <article className="w-full max-w-7xl flex flex-col md:flex-row gap-4">
          {/* Left ad - visible only on desktop */}
          <aside className="hidden md:block md:w-64 lg:w-72 sticky top-4 self-start">
            <AdSense slotKey="mainLeft" format="vertical" style={{ minHeight: '600px', width: '100%' }} />
          </aside>
          
          {/* Central content */}
          <div className="flex-grow">
            <MainInputs />
          </div>
          
          {/* Right ad - visible only on desktop */}
          <aside className="hidden md:block md:w-64 lg:w-72 sticky top-4 self-start">
            <AdSense slotKey="mainRight" format="vertical" style={{ minHeight: '600px', width: '100%' }} />
          </aside>
        </article>
        
        {/* Ad below content - visible only on mobile devices */}
        <div className="w-full max-w-3xl mt-8 md:hidden">
          <AdSense slotKey="mainBottom" format="fluid" style={{ minHeight: '250px' }} />
        </div>
      </section>

      {/* SEO Content Section - Below the form */}
      <SEOContent />
      
      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}
