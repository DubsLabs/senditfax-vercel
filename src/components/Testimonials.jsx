"use client";

import React, { memo } from "react";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    location: "California, USA",
    rating: 5,
    text: "SendItFax saved my business! I needed to send urgent contracts to a client, and their service was incredibly fast and reliable. No registration hassle - just upload and send. Highly recommend!",
    date: "March 2025"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Freelance Designer",
    location: "Toronto, Canada",
    rating: 5,
    text: "I was skeptical about free fax services, but SendItFax exceeded my expectations. The interface is clean, uploads are quick, and I received delivery confirmation within minutes. Perfect for occasional fax needs.",
    date: "December 2024"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Medical Office Manager",
    location: "Texas, USA",
    rating: 5,
    text: "As a medical office, we send multiple faxes daily. SendItFax's priority service is worth every penny - fast delivery, professional appearance, and reliable tracking. It's become our go-to solution.",
    date: "July 2025"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Real Estate Agent",
    location: "Florida, USA",
    rating: 5,
    text: "I deal with contracts and documents all day. SendItFax makes faxing effortless - no more bulky fax machines or monthly subscriptions. The mobile experience is fantastic too!",
    date: "February 2025"
  },
  {
    id: 5,
    name: "Jennifer Lee",
    role: "Legal Assistant",
    location: "Vancouver, Canada",
    rating: 4,
    text: "SendItFax is a lifesaver for our law firm. We needed a quick solution when our fax machine broke. The service is secure, fast, and the delivery reports give us peace of mind for legal documents.",
    date: "September 2025"
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "Accountant",
    location: "New York, USA",
    rating: 5,
    text: "Tax season means sending hundreds of faxes. SendItFax's bulk capability and priority delivery ensure my clients' documents reach the IRS on time. Outstanding service!",
    date: "May 2025"
  }
];

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-4">
        <FaQuoteLeft className="text-blue-600 text-2xl flex-shrink-0 mt-1" />
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < testimonial.rating ? "text-yellow-500" : "text-gray-300"}
                size={16}
              />
            ))}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            "{testimonial.text}"
          </p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
            <p className="text-xs text-gray-600">{testimonial.role}</p>
            <p className="text-xs text-gray-500">{testimonial.location}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{testimonial.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust SendItFax for their online faxing needs
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" size={20} />
              ))}
            </div>
            <span className="text-gray-700 font-semibold">4.8/5</span>
            <span className="text-gray-500">based on 250+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm">
            Trusted by small businesses, freelancers, and professionals across USA and Canada
          </p>
        </div>
      </div>
    </section>
  );
}

// Memoize Testimonials to prevent unnecessary re-renders
export default memo(Testimonials);

