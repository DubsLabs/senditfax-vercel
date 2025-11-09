"use client";

import React from "react";
import Link from "next/link";
import { FaChevronRight, FaHome } from "react-icons/fa";

function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="w-full mb-4">
      <ol className="flex items-center gap-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
        {/* Home */}
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="flex items-center">
          <Link 
            href="/" 
            itemProp="item"
            className="flex items-center hover:text-blue-600 transition-colors"
          >
            <FaHome className="mr-1" size={14} />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
          {items.length > 0 && <FaChevronRight className="ml-2 text-gray-400" size={10} />}
        </li>

        {/* Dynamic items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const position = index + 2;

          return (
            <li 
              key={item.href || index} 
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              {isLast ? (
                <span itemProp="name" className="text-gray-800 font-medium">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link 
                    href={item.href} 
                    itemProp="item"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <FaChevronRight className="ml-2 text-gray-400" size={10} />
                </>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Memoize Breadcrumbs to prevent unnecessary re-renders when items don't change
export default React.memo(Breadcrumbs);

