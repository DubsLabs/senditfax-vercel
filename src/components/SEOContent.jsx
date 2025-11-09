"use client";

import React, { useState, memo } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function AccordionItem({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-300 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <h2 className="text-base md:text-lg font-semibold text-gray-800">{title}</h2>
        {isOpen ? (
          <FaChevronUp className="text-blue-600 flex-shrink-0 ml-4" size={16} />
        ) : (
          <FaChevronDown className="text-blue-600 flex-shrink-0 ml-4" size={16} />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 text-sm leading-relaxed space-y-3 text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

function SEOContent() {
  return (
    <section className="w-full py-8 bg-white mt-8">
      <div className="max-w-4xl mx-auto px-4">
        <article className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          
          <AccordionItem title="About Our Free Online Fax Service" defaultOpen={true}>
            <p>
              SendItFax is a modern, free online fax service that lets you send faxes to USA and Canada without requiring a fax machine, registration, or account creation. In today's digital world, you shouldn't need expensive equipment or complicated software to send a fax. Our service makes it simple to send faxes online from any device - your computer, tablet, or phone.
            </p>
            <p>
              Whether you need to send medical documents, legal papers, business contracts, or any other important documents, SendItFax provides a reliable and secure way to transmit your information. Our free fax service allows you to send up to 3 pages per fax, with a limit of 5 free faxes per day. For larger documents or priority delivery, our affordable paid option is available for just $1.99 per fax, supporting up to 25 pages. Learn more about our service in our{" "}
              <Link href="/faq" className="text-blue-600 hover:underline font-medium">
                FAQ section
              </Link>.
            </p>
            <p>
              Unlike traditional fax services that require monthly subscriptions or expensive per-page rates, SendItFax offers true free faxing - not a "free trial" that converts to a paid plan. You can send faxes whenever you need them, without worrying about recurring charges or hidden fees. For more details, please review our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                Terms of Use
              </Link>.
            </p>
          </AccordionItem>

          <AccordionItem title="How to Send a Fax Online for Free">
            <p>
              Sending a fax online with SendItFax is incredibly easy. No software installation, no account creation, and no credit card required for free faxes. Here's how to send your fax in just a few simple steps:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>
                <strong>Fill in the sender information:</strong> Enter your name, email address, and phone number. This information will appear on the cover page and allows the recipient to contact you.
              </li>
              <li>
                <strong>Enter recipient details:</strong> Provide the recipient's name and fax number. We support all US and Canadian fax numbers in standard format.
              </li>
              <li>
                <strong>Upload your documents:</strong> Attach one or more files in PDF, DOC, or DOCX format. The total page count for free faxes is limited to 3 pages, while paid faxes can include up to 25 pages.
              </li>
              <li>
                <strong>Add a cover page message (optional):</strong> You can include a custom message that will appear on the cover page. This is optional - you can send fax with just attachments if preferred.
              </li>
              <li>
                <strong>Complete the CAPTCHA verification:</strong> This security measure helps us prevent spam and ensures our service remains reliable for legitimate users.
              </li>
              <li>
                <strong>Click "Send Free Fax Now":</strong> Your fax will be queued for transmission. You'll receive a confirmation with a tracking ID to monitor your fax status.
              </li>
            </ol>
            <p>
              The entire process takes less than 2 minutes. Once your fax is sent, you'll receive email notifications about the delivery status, so you always know when your fax has been successfully received. For detailed information about how we handle your data, see our{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </Link>.
            </p>
          </AccordionItem>

          <AccordionItem title="Send Fax to USA and Canada - Coverage and Features">
            <p>
              Our online fax service provides comprehensive coverage across the United States and Canada. Whether you're sending a fax to New York, California, Texas, Florida, or any other US state, or to Canadian provinces like Ontario, Quebec, British Columbia, or Alberta, SendItFax ensures reliable delivery to any valid fax number.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Supported Fax Numbers:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All US area codes (including toll-free 800, 888, 877, 866, 855, 844, 833 numbers)</li>
              <li>All Canadian area codes and provinces</li>
              <li>Both landline and dedicated fax numbers</li>
              <li>Business and residential fax lines</li>
            </ul>
            <h3 className="font-semibold mt-4 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>No registration required:</strong> Start sending faxes immediately without creating an account</li>
              <li><strong>No credit card for free faxes:</strong> Truly free service with no hidden charges</li>
              <li><strong>Multiple file formats:</strong> Support for PDF, DOC, and DOCX files</li>
              <li><strong>Secure transmission:</strong> All faxes are sent through encrypted connections</li>
              <li><strong>Email notifications:</strong> Receive updates about your fax delivery status</li>
              <li><strong>Fax tracking:</strong> Monitor your fax status with a unique tracking ID</li>
            </ul>
            <p>
              For users who need to send larger documents or require priority delivery, our paid fax service offers enhanced features including the ability to remove the cover page entirely, send up to 25 pages, and get priority queue processing for faster delivery.
            </p>
          </AccordionItem>

          <AccordionItem title="Send Fax from Phone Without Registration">
            <p>
              In today's mobile-first world, you shouldn't be tied to a desktop computer to send a fax. SendItFax is fully optimized for mobile devices, allowing you to send faxes from your smartphone or tablet just as easily as from a computer. Whether you're using an iPhone, Android phone, iPad, or any other mobile device, our responsive design ensures a smooth experience.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Benefits of Mobile Faxing:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Send faxes on the go:</strong> No need to wait until you're at a computer - send important documents from anywhere</li>
              <li><strong>No app installation required:</strong> Use your mobile browser - no need to download or install any apps</li>
              <li><strong>Access files from your phone:</strong> Upload documents directly from your phone's storage or cloud services</li>
              <li><strong>Same features as desktop:</strong> All functionality available on mobile devices</li>
              <li><strong>No account or login:</strong> Start faxing immediately without any registration process</li>
            </ul>
            <p>
              This is particularly useful for professionals who need to send faxes while traveling, working remotely, or simply don't have access to a traditional fax machine or desktop computer. Real estate agents, healthcare professionals, lawyers, and business people can all benefit from the convenience of mobile faxing.
            </p>
            <p>
              The process is identical to sending from a desktop: fill in the form, upload your documents, and hit send. The mobile-optimized interface makes it easy to complete all steps on a smaller screen, and the file upload process is streamlined for mobile use.
            </p>
          </AccordionItem>

          <AccordionItem title="Why Choose SendItFax for Your Online Faxing Needs">
            <p>
              With numerous online fax services available, you might wonder what makes SendItFax the best choice for your faxing needs. Here are the key advantages that set us apart:
            </p>
            <h3 className="font-semibold mt-4 mb-2">Truly Free Service:</h3>
            <p>
              Unlike many competitors who offer "free trials" that automatically convert to paid subscriptions, SendItFax provides genuinely free faxing. No credit card required, no automatic charges, and no hidden fees. Send up to 5 faxes per day (up to 3 pages each) completely free, forever.
            </p>
            <h3 className="font-semibold mt-4 mb-2">No Account Required:</h3>
            <p>
              We respect your time and privacy. You don't need to create an account, remember passwords, or manage yet another online profile. Simply visit our website, fill in the form, and send your fax. It's that simple.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Fast and Reliable:</h3>
            <p>
              Our infrastructure is built for reliability. Free faxes are typically delivered within minutes, and paid faxes receive priority treatment for even faster delivery. You'll receive email notifications to confirm successful transmission.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Secure and Private:</h3>
            <p>
              All fax transmissions are encrypted and secured. We temporarily store fax content for a maximum of 3 days for delivery tracking purposes, after which all data is permanently deleted. We never share your information with third parties.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Affordable Paid Option:</h3>
            <p>
              When you need to send larger documents or want priority delivery, our paid service is available for just $1.99 per fax. This includes up to 25 pages, no SendItFax branding, optional cover page removal, and priority queue processing. No subscription required - pay only when you need it.
            </p>
            <h3 className="font-semibold mt-4 mb-2">Great for Business and Personal Use:</h3>
            <p>
              Whether you're sending medical records, legal documents, business contracts, real estate paperwork, or personal documents, SendItFax handles all your faxing needs. Our service is trusted by individuals, small businesses, and professionals across North America.
            </p>
            <p>
              Join thousands of satisfied users who have discovered the convenience of online faxing without the hassle of traditional fax machines, phone lines, or expensive fax services. Try SendItFax today and experience the easiest way to send faxes online.
            </p>
          </AccordionItem>

          <AccordionItem title="Frequently Asked Questions About Online Faxing">
            <p className="mb-3">
              Have more questions? Visit our comprehensive{" "}
              <Link href="/faq" className="text-blue-600 hover:underline font-medium">
                FAQ page
              </Link>{" "}
              for detailed answers.
            </p>
            <h3 className="font-semibold">Do I need a fax machine to use SendItFax?</h3>
            <p>
              No, you don't need a fax machine at all. SendItFax is a completely online service that sends faxes over the internet to traditional fax machines. You just need a computer or smartphone with internet access.
            </p>
            
            <h3 className="font-semibold mt-4">Is SendItFax really free?</h3>
            <p>
              Yes! Our free service allows you to send up to 5 faxes per day (up to 3 pages each) at absolutely no cost. There's no free trial period, no credit card required, and no automatic conversion to a paid plan. It's free, forever.
            </p>
            
            <h3 className="font-semibold mt-4">What file types can I send?</h3>
            <p>
              We support PDF, DOC, and DOCX files. These are the most common document formats and cover the vast majority of faxing needs. The maximum file size is 25 MB per document.
            </p>
            
            <h3 className="font-semibold mt-4">How long does it take to send a fax?</h3>
            <p>
              Free faxes are typically delivered within 5-15 minutes, depending on the queue. Paid faxes receive priority processing and are usually delivered within 2-5 minutes. You'll receive email notifications about the delivery status.
            </p>
            
            <h3 className="font-semibold mt-4">Can I send faxes internationally?</h3>
            <p>
              Currently, SendItFax supports fax transmission to USA and Canada only. This covers all US states and territories, as well as all Canadian provinces.
            </p>

            <h3 className="font-semibold mt-4">Is my information secure?</h3>
            <p>
              Absolutely. All transmissions are encrypted using industry-standard security protocols. We temporarily store fax content for a maximum of 3 days for tracking purposes, after which it's permanently deleted. We never share your information with third parties.
            </p>
          </AccordionItem>

        </article>
      </div>
    </section>
  );
}

// Memoize SEOContent to prevent unnecessary re-renders
export default memo(SEOContent);
