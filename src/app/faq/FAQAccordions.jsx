"use client";

import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

export default function FAQAccordions({ categories, groupedFAQs }) {
  const [expanded, setExpanded] = useState({});

  // Function to create FAQ ID from question
  const createFAQId = (question) => {
    return question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Handle hash change and expand accordion
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Find matching FAQ by ID
        for (const category of categories) {
          const faqs = groupedFAQs[category] || [];
          for (const faq of faqs) {
            const faqId = createFAQId(faq.question);
            if (faqId === hash) {
              // Expand this specific accordion
              setExpanded({ [faqId]: true });
              // Scroll to the accordion after expansion animation
              setTimeout(() => {
                const element = document.getElementById(faqId);
                if (element) {
                  // Use requestAnimationFrame for smoother scroll
                  requestAnimationFrame(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  });
                }
              }, 400);
              break;
            }
          }
        }
      }
    };

    // Check hash on mount with a slight delay to ensure DOM is ready
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        handleHashChange();
      }, 100);
      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange);
      }
    };
  }, [categories, groupedFAQs]);

  const handleChange = (faqId) => (event, isExpanded) => {
    setExpanded({ ...expanded, [faqId]: isExpanded });
  };

  return (
    <>
      {categories.map((category) => (
        <div 
          key={category} 
          id={category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')} 
          className="mb-10 scroll-mt-20"
        >
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-600">
            {category}
          </h2>
          <div className="space-y-2">
            {groupedFAQs[category]?.map((faq) => {
              const faqId = createFAQId(faq.question);
              return (
                <Accordion 
                  key={uuidv4()} 
                  className="shadow-sm"
                  expanded={expanded[faqId] || false}
                  onChange={handleChange(faqId)}
                  id={faqId}
                  data-faq-id={faqId}
                >
                  <AccordionSummary 
                    expandIcon={<IoIosArrowDown />}
                    className="hover:bg-gray-50"
                  >
                    <span className="font-medium">{faq.question}</span>
                  </AccordionSummary>
                  <AccordionDetails className="bg-gray-50">
                    <div style={{ whiteSpace: "pre-line" }} className="text-gray-700">
                      {faq.text}
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

