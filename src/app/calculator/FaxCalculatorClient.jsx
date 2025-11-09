"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Slider, TextField } from "@mui/material";
import { FaCalculator, FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function FaxCalculatorClient() {
  // Calculator state
  const [faxesPerMonth, setFaxesPerMonth] = useState(20);
  const [pagesPerFax, setPagesPerFax] = useState(3);
  const [currentMethod, setCurrentMethod] = useState("traditional"); // traditional, none

  // Cost constants
  const TRADITIONAL_FAX_MACHINE_COST = 150; // one-time
  const TRADITIONAL_MONTHLY_LINE = 40; // phone line
  const TRADITIONAL_PAPER_PER_PAGE = 0.05;
  const TRADITIONAL_INK_PER_PAGE = 0.03;
  const TRADITIONAL_ELECTRICITY = 10; // monthly
  const TRADITIONAL_MAINTENANCE = 15; // monthly

  const SENDITFAX_FREE_FAXES_PER_DAY = 5;
  const SENDITFAX_FREE_PAGES_PER_FAX = 3;
  const SENDITFAX_PAID_PRICE = 1.99;

  // Calculations
  const totalPagesPerMonth = faxesPerMonth * pagesPerFax;
  const faxesPerDay = faxesPerMonth / 30; // average per day
  
  // Traditional Fax Machine Cost
  const traditionalMonthlyCost = 
    TRADITIONAL_MONTHLY_LINE +
    (totalPagesPerMonth * (TRADITIONAL_PAPER_PER_PAGE + TRADITIONAL_INK_PER_PAGE)) +
    TRADITIONAL_ELECTRICITY +
    TRADITIONAL_MAINTENANCE;
  const traditionalYearlyCost = traditionalMonthlyCost * 12 + TRADITIONAL_FAX_MACHINE_COST;

  // SendItFax Cost - CORRECTED LOGIC
  // User gets 5 free faxes per day (up to 3 pages each)
  // If pages per fax <= 3, all faxes up to 150/month are FREE
  // If pages per fax > 3, ALL faxes need to be paid ($1.99 each, up to 25 pages)
  let senditfaxMonthlyCost = 0;
  let senditfaxFreeFaxesCount = 0;
  let senditfaxPaidFaxesCount = 0;
  
  if (pagesPerFax <= SENDITFAX_FREE_PAGES_PER_FAX) {
    // User qualifies for free faxes (up to 5 per day = 150 per month)
    const maxFreeFaxesPerMonth = SENDITFAX_FREE_FAXES_PER_DAY * 30; // 150 faxes
    if (faxesPerMonth <= maxFreeFaxesPerMonth) {
      // All faxes are FREE!
      senditfaxFreeFaxesCount = faxesPerMonth;
      senditfaxPaidFaxesCount = 0;
      senditfaxMonthlyCost = 0;
    } else {
      // Use free limit, pay for the rest
      senditfaxFreeFaxesCount = maxFreeFaxesPerMonth;
      senditfaxPaidFaxesCount = faxesPerMonth - maxFreeFaxesPerMonth;
      senditfaxMonthlyCost = senditfaxPaidFaxesCount * SENDITFAX_PAID_PRICE;
    }
  } else {
    // Pages exceed free limit (>3 pages) - all faxes are paid
    senditfaxFreeFaxesCount = 0;
    senditfaxPaidFaxesCount = faxesPerMonth;
    senditfaxMonthlyCost = faxesPerMonth * SENDITFAX_PAID_PRICE;
  }
  
  const senditfaxYearlyCost = senditfaxMonthlyCost * 12;

  // Savings calculations
  let currentCost = 0;
  let currentMethodName = "";
  
  if (currentMethod === "traditional") {
    currentCost = traditionalYearlyCost;
    currentMethodName = "Traditional Fax Machine";
  } else {
    currentCost = traditionalYearlyCost; // default comparison
    currentMethodName = "Traditional Fax Machine";
  }

  const yearlySavings = currentCost - senditfaxYearlyCost;
  const savingsPercentage = ((yearlySavings / currentCost) * 100).toFixed(1);

  return (
    <>
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaCalculator className="text-blue-600 text-4xl" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Fax Cost Calculator</h1>
        </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Calculate how much you can save by switching to SendItFax compared to traditional fax machines
          </p>
      </div>

      {/* Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-blue-600">📊</span> Your Fax Usage
          </h2>

          <div className="space-y-6">
            {/* Faxes per month */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How many faxes do you send per month?
              </label>
              <TextField
                type="number"
                value={faxesPerMonth}
                onChange={(e) => setFaxesPerMonth(Math.max(1, parseInt(e.target.value) || 1))}
                fullWidth
                variant="outlined"
                inputProps={{ min: 1, max: 1000 }}
              />
              <Slider
                value={faxesPerMonth}
                onChange={(e, value) => setFaxesPerMonth(value)}
                min={1}
                max={200}
                valueLabelDisplay="auto"
                sx={{ mt: 2, color: "#1878F3" }}
              />
            </div>

            {/* Pages per fax */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Average pages per fax?
              </label>
              <TextField
                type="number"
                value={pagesPerFax}
                onChange={(e) => setPagesPerFax(Math.max(1, parseInt(e.target.value) || 1))}
                fullWidth
                variant="outlined"
                inputProps={{ min: 1, max: 25 }}
              />
              <Slider
                value={pagesPerFax}
                onChange={(e, value) => setPagesPerFax(value)}
                min={1}
                max={25}
                valueLabelDisplay="auto"
                sx={{ mt: 2, color: "#1878F3" }}
              />
            </div>

            {/* Current method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What do you currently use?
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="method"
                    value="traditional"
                    checked={currentMethod === "traditional"}
                    onChange={(e) => setCurrentMethod(e.target.value)}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="font-medium">Traditional Fax Machine</span>
                </label>
                <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="method"
                    value="none"
                    checked={currentMethod === "none"}
                    onChange={(e) => setCurrentMethod(e.target.value)}
                    className="mr-3 w-4 h-4"
                  />
                  <span className="font-medium">I don't send faxes yet</span>
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <strong>Total faxes per month:</strong> {faxesPerMonth} faxes
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Average per day:</strong> ~{faxesPerDay.toFixed(1)} faxes/day
              </p>
              <p className="text-sm text-gray-700 mt-1">
                <strong>Total pages per month:</strong> {totalPagesPerMonth} pages
              </p>
              {pagesPerFax <= 3 && faxesPerDay <= 5 && (
                <div className="mt-2 bg-green-100 p-2 rounded">
                  <p className="text-xs text-green-800 font-semibold">
                    ✅ You qualify for 100% FREE faxes with SendItFax!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg border-2 border-green-400 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-green-600">💰</span> Your Savings
          </h2>

          {/* Annual Savings */}
          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-green-500 shadow-md">
            <p className="text-sm text-gray-600 mb-2">Annual Savings with SendItFax</p>
            <p className="text-5xl font-bold text-green-600 mb-2">
              ${yearlySavings > 0 ? yearlySavings.toFixed(2) : '0.00'}
            </p>
            <p className="text-lg text-gray-700">
              Save <strong>{savingsPercentage > 0 ? savingsPercentage : '0'}%</strong> per year!
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-4">
            {/* Current Method */}
            {currentMethod !== "none" && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">{currentMethodName}</p>
                <p className="text-2xl font-bold text-red-600">${currentCost.toFixed(2)}/year</p>
                <p className="text-xs text-gray-600 mt-1">${(currentCost / 12).toFixed(2)}/month</p>
              </div>
            )}

            {/* SendItFax */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-medium text-gray-700 mb-1">SendItFax</p>
              <p className="text-2xl font-bold text-green-600">${senditfaxYearlyCost.toFixed(2)}/year</p>
              <p className="text-xs text-gray-600 mt-1">${senditfaxMonthlyCost.toFixed(2)}/month</p>
            </div>

            {/* Breakdown details */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">SendItFax Breakdown:</p>
              <div className="space-y-2 text-sm text-gray-600">
                {pagesPerFax <= SENDITFAX_FREE_PAGES_PER_FAX ? (
                  <>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <FaCheckCircle className="text-green-600" />
                        <span className="font-semibold text-green-700">Qualifies for FREE faxes!</span>
                      </div>
                      <p className="text-xs text-gray-600 ml-6">
                        Up to 5 free faxes per day (3 pages max each)
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span>Free faxes ({senditfaxFreeFaxesCount}/month):</span>
                      <span className="font-semibold text-green-600">$0.00</span>
                    </div>
                    {senditfaxPaidFaxesCount > 0 && (
                      <div className="flex justify-between">
                        <span>Paid faxes ({senditfaxPaidFaxesCount}/month × $1.99):</span>
                        <span className="font-semibold">${senditfaxMonthlyCost.toFixed(2)}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 p-2 rounded border border-blue-200">
                      <p className="text-xs text-gray-700">
                        <strong>Note:</strong> Pages exceed free limit (3 pages). Priority fax recommended.
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority faxes ({senditfaxPaidFaxesCount}/month × $1.99):</span>
                      <span className="font-semibold">${senditfaxMonthlyCost.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold text-gray-700 mb-3">Additional Benefits:</p>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>No equipment costs or maintenance</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>No phone line required</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Send from anywhere, anytime</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
              <span>Instant delivery tracking</span>
            </div>
          </div>

          {/* CTA */}
          <Link 
            href="/"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors shadow-md flex items-center justify-center gap-2"
          >
            Start Saving Now <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* SEO Content Below */}
      <article className="prose prose-slate max-w-none">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Much Does It Really Cost to Send a Fax?</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            The true cost of sending faxes depends on your method. Traditional fax machines, online fax services, and modern solutions like SendItFax each have different pricing structures. Understanding these costs can help you save hundreds or even thousands of dollars annually.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Traditional Fax Machine Costs</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            A traditional fax machine requires significant upfront and ongoing expenses:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Equipment:</strong> $150-$500 for a quality fax machine</li>
            <li><strong>Phone Line:</strong> $30-$50 per month for a dedicated line</li>
            <li><strong>Paper & Ink:</strong> $0.05-$0.10 per page</li>
            <li><strong>Electricity:</strong> $10-$15 per month</li>
            <li><strong>Maintenance:</strong> $15-$30 per month (toner, repairs)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Total annual cost:</strong> For a business sending 20 faxes per month (3 pages each), you're looking at approximately <strong>$700-$1,000 per year</strong> – and that's before considering the time spent maintaining equipment and troubleshooting issues.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">SendItFax: Modern & Affordable Solution</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            SendItFax offers a revolutionary approach to online faxing with no subscriptions or hidden fees:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
            <li><strong>Free Faxes:</strong> Send up to 5 faxes daily (3 pages each) at absolutely no cost - that's up to 150 free faxes per month!</li>
            <li><strong>Priority Faxes:</strong> Only $1.99 for up to 25 pages with faster delivery and no branding</li>
            <li><strong>No Monthly Fees:</strong> Zero subscriptions, pay only when you need priority service</li>
            <li><strong>No Setup Costs:</strong> Start sending immediately, no registration required</li>
            <li><strong>No Contracts:</strong> Use as much or as little as you need, cancel anytime (nothing to cancel!)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Annual cost:</strong> For typical usage of 20 faxes per month with 3 pages each, your cost would be <strong>$0 per year</strong> - completely free! Even if you send 100 faxes monthly (well within the 150 free limit), you still pay <strong>$0</strong>.
          </p>

          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 text-center mt-8">
            <p className="text-2xl font-bold mb-2">Ready to Save Money?</p>
            <p className="mb-4">Join thousands of businesses already saving with SendItFax</p>
            <Link 
              href="/"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Send Your First Free Fax →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

