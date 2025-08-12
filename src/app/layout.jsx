import Footer from "@/components/Footer";
import "../styles/globals.css";
import Header from "@/components/Header";
import FullSEO from "../config/FullSEO";
import Alerts from "@/components/Alerts";
import ScrollToTop from "@/components/ScrollToTop";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Cookie from "@/components/Cookie";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata = {
  ...FullSEO.Main,
  metadataBase: new URL("https://senditfax.com"),
  openGraph: {
    title: "SendItFax",
    description:
      "Send free faxes to the U.S. and Canada without an account. Options for low-cost, high-priority faxing also available with SendItFax.",
    images: [
      {
        url: "https://senditfax.com/og-meta-senditfax.jpg",
        width: 1200,
        height: 630,
        alt: "SendItFax",
      },
    ],
    url: "https://senditfax.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SendItFax",
    description:
      "Send free faxes to the U.S. and Canada without an account. Options for low-cost, high-priority faxing also available with SendItFax.",
    images: ["https://senditfax.com/og-meta-senditfax.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest?v=2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-1688764604430717"></meta>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function (c, l, a, r, i, t, y) {
              c[a] =
                c[a] ||
                function () {
                  (c[a].q = c[a].q || []).push(arguments);
                };
              t = l.createElement(r);
              t.async = 1;
              t.src = "https://www.clarity.ms/tag/" + i;
              y = l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "ooe85h8n1t");
          `}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Online Fax Service",
              provider: {
                "@type": "Organization",
                name: "SendItFax",
              },
              areaServed: {
                "@type": "Place",
                name: "U.S. and Canada",
              },
              description: "Free and affordable online faxing service with options for priority delivery.",
            }),
          }}
        />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <div id="root">
            <ScrollToTop />
            {/* <Header /> */}
            <main className="px-4 mx-auto max-w-7xl">{children}</main>
            <Alerts />
            <Cookie />
            <Footer />
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
