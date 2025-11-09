"use client";

import React from "react";

export default function PopularQuestions() {
  return (
    <div className="mb-10">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600 p-6 rounded-r-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">🔥 Most Popular Questions</h2>
        <div className="space-y-2">
          <a 
            href="#do-i-need-to-create-an-account" 
            className="block text-blue-600 hover:underline scroll-smooth cursor-pointer"
          >
            → Do I need to create an account?
          </a>
          <a 
            href="#is-senditfax-really-free" 
            className="block text-blue-600 hover:underline scroll-smooth cursor-pointer"
          >
            → Is SendItFax really free?
          </a>
          <a 
            href="#what-file-types-can-i-send" 
            className="block text-blue-600 hover:underline scroll-smooth cursor-pointer"
          >
            → What file types can I send?
          </a>
          <a 
            href="#how-long-does-fax-delivery-take" 
            className="block text-blue-600 hover:underline scroll-smooth cursor-pointer"
          >
            → How long does fax delivery take?
          </a>
        </div>
      </div>
    </div>
  );
}

