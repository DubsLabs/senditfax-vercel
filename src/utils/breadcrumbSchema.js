/**
 * Generates BreadcrumbList JSON-LD schema for SEO
 * @param {Array<{label: string, href: string}>} items - Array of breadcrumb items
 * @returns {Object} BreadcrumbList schema object
 */
export function generateBreadcrumbSchema(items) {
  const baseUrl = 'https://senditfax.com';
  
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": item.label,
      "item": item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`
    }))
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
}

