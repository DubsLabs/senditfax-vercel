import Footer from "@/components/Footer";
import "../styles/globals.css";
import Header from "@/components/Header";
import FullSEO from "../config/FullSEO";
import Alerts from "@/components/Alerts";
import ScrollToTop from "@/components/ScrollToTop";
import SkipLinks from "@/components/SkipLinks";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Cookie from "@/components/Cookie";
import { Roboto } from "next/font/google";
import Script from "next/script";
import AdSenseConfig from "@/config/adsense";

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
  alternates: {
    canonical: "https://senditfax.com",
  },
  openGraph: {
    title: "Send Free Fax Online to USA & Canada | No Registration Required",
    description:
      "Send faxes online for free to USA and Canada without registration or account. No fax machine needed. Send up to 3 pages free or choose priority delivery for $1.99.",
    images: [
      {
        url: "https://senditfax.com/og-meta-senditfax.jpg",
        width: 1200,
        height: 630,
        alt: "SendItFax - Free Online Fax Service",
      },
    ],
    url: "https://senditfax.com",
    type: "website",
    siteName: "SendItFax",
  },
  twitter: {
    card: "summary_large_image",
    title: "Send Free Fax Online to USA & Canada | No Registration Required",
    description:
      "Send faxes online for free to USA and Canada without registration or account. No fax machine needed. Send up to 3 pages free or choose priority delivery for $1.99.",
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
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        
        <meta name="google-adsense-account" content="ca-pub-1688764604430717"></meta>
        <Script
          id="adsbygoogle-init"
          strategy="lazyOnload"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AdSenseConfig.client}`}
          crossOrigin="anonymous"
        />
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
        
        {/* Google Analytics 4 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DK1MGT41X5"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DK1MGT41X5');
          `}
        </Script>
        
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SendItFax",
              url: "https://senditfax.com",
              description: "Send free faxes online to USA and Canada without registration or account",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://senditfax.com/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <Script
          id="structured-data-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Online Fax Service",
              name: "SendItFax",
              description: "Free and affordable online faxing service. Send faxes to USA and Canada without registration. Up to 3 pages free or 25 pages for $1.99 with priority delivery.",
              provider: {
                "@type": "Organization",
                name: "SendItFax",
                url: "https://senditfax.com",
                logo: "https://senditfax.com/og-meta-senditfax.jpg"
              },
              areaServed: [
                {
                  "@type": "Country",
                  name: "United States"
                },
                {
                  "@type": "Country",
                  name: "Canada"
                }
              ],
              offers: [
                {
                  "@type": "Offer",
                  name: "Free Fax Service",
                  price: "0",
                  priceCurrency: "USD",
                  description: "Send up to 3 pages free, maximum 5 faxes per day"
                },
                {
                  "@type": "Offer",
                  name: "Priority Fax Service",
                  price: "1.99",
                  priceCurrency: "USD",
                  description: "Send up to 25 pages with priority delivery and no branding"
                }
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.7",
                reviewCount: "150"
              }
            }),
          }}
        />
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SendItFax",
              url: "https://senditfax.com",
              logo: "https://senditfax.com/og-meta-senditfax.jpg",
              description: "Free online fax service for USA and Canada. Send faxes without registration or fax machine.",
              email: "support@senditfax.com",
              foundingDate: "2024",
              slogan: "Send Free Fax Online - No Registration Required",
              knowsAbout: ["Online Fax Service", "Document Transmission", "Internet Fax", "Digital Fax"],
              areaServed: [
                {
                  "@type": "Country",
                  name: "United States"
                },
                {
                  "@type": "Country",
                  name: "Canada"
                }
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "support@senditfax.com",
                availableLanguage: ["English"]
              }
            }),
          }}
        />
        <Script
          id="structured-data-reviews"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "SendItFax Online Fax Service",
              description: "Free online fax service for sending faxes to USA and Canada",
              brand: {
                "@type": "Brand",
                name: "SendItFax"
              },
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "0",
                highPrice: "1.99",
                priceCurrency: "USD"
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "250",
                bestRating: "5",
                worstRating: "1"
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Sarah Johnson"
                  },
                  datePublished: "2025-03-15",
                  reviewBody: "SendItFax saved my business! I needed to send urgent contracts to a client, and their service was incredibly fast and reliable. No registration hassle - just upload and send. Highly recommend!",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                  }
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Michael Chen"
                  },
                  datePublished: "2024-12-10",
                  reviewBody: "I was skeptical about free fax services, but SendItFax exceeded my expectations. The interface is clean, uploads are quick, and I received delivery confirmation within minutes. Perfect for occasional fax needs.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                  }
                },
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Emily Rodriguez"
                  },
                  datePublished: "2025-07-08",
                  reviewBody: "As a medical office, we send multiple faxes daily. SendItFax's priority service is worth every penny - fast delivery, professional appearance, and reliable tracking. It's become our go-to solution.",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5"
                  }
                }
              ]
            }),
          }}
        />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <SkipLinks />
          <div id="root" className="flex flex-col min-h-screen">
            <ScrollToTop />
            {/* <Header /> */}
            <main id="main-content" className="flex-grow w-full flex flex-col" role="main" tabIndex={-1}>
              {children}
            </main>
            <Alerts />
            <Cookie />
            <Footer />
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
