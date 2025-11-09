const FAQList = [
  // GETTING STARTED
  {
    category: "Getting Started",
    question: "What is SendItFax?",
    text: "SendItFax is a free online fax service that allows you to send faxes to USA and Canada without a fax machine, account registration, or credit card. Simply visit our website, fill out a form, upload your document, and send. It's completely browser-based and works on any device with internet access.",
  },
  {
    category: "Getting Started",
    question: "Do I need to create an account?",
    text: "No! SendItFax requires no account creation or registration. You can send faxes immediately without signing up, creating passwords, or providing payment information for free faxes. This makes the process quick and hassle-free.",
  },
  {
    category: "Getting Started",
    question: "How do I send a fax?",
    text: `Sending a fax is simple:
    1. Go to SendItFax.com
    2. Fill in sender information (your name, email, phone)
    3. Enter receiver information (recipient name and fax number)
    4. Upload your document (PDF, DOC, or DOCX)
    5. Complete the CAPTCHA verification
    6. Click "Send Free Fax Now"
    7. Check your email for delivery confirmation
    
The entire process takes less than 2 minutes!`,
  },
  {
    category: "Getting Started",
    question: "Can I send faxes from my phone?",
    text: "Yes! SendItFax is fully optimized for mobile devices. You can send faxes from your iPhone, Android phone, iPad, or any tablet. The mobile interface is responsive and easy to use. You can even upload documents directly from your phone's camera or storage.",
  },
  {
    category: "Getting Started",
    question: "Do I need to download any software?",
    text: "No software download or installation is required. SendItFax works entirely in your web browser (Chrome, Firefox, Safari, Edge, etc.). This means you can use it on any device without taking up storage space or dealing with app updates.",
  },

  // PRICING & PLANS
  {
    category: "Pricing & Plans",
    question: "Is SendItFax really free?",
    text: "Yes! SendItFax offers truly free faxing - not a 'free trial' that converts to a paid plan. You can send up to 5 faxes per day (up to 3 pages each) completely free, forever. No credit card required, no hidden fees, no automatic charges.",
  },
  {
    category: "Pricing & Plans",
    question: "What's the difference between Free and Priority faxing?",
    text: `FREE FAX:
    • Completely free (not a trial)
    • No credit card required
    • Maximum 3 pages + cover page
    • Up to 5 faxes per day
    • SendItFax branding on cover page
    • Delivery within 5-15 minutes
    
PRIORITY FAX ($1.99):
    • Pay per fax (no subscription)
    • Maximum 25 pages + optional cover
    • No daily limit
    • No SendItFax branding
    • Optional: remove cover page entirely
    • Priority delivery (2-5 minutes)
    • Secure Stripe payment`,
  },
  {
    category: "Pricing & Plans",
    question: "How does the $1.99 priority fax work?",
    text: "When you choose the priority option, you'll be directed to a secure Stripe payment page. After payment, your fax is placed in a priority queue for faster delivery. You can send up to 25 pages, remove branding, and even send without a cover page. No subscription or recurring charges - you only pay when you send.",
  },
  {
    category: "Pricing & Plans",
    question: "Are there any hidden fees?",
    text: "No! Free faxes are 100% free with no hidden charges. Priority faxes cost exactly $1.99 per transmission - no additional fees, taxes, or surprise charges. What you see is what you pay.",
  },
  {
    category: "Pricing & Plans",
    question: "What happens if I exceed 5 free faxes per day?",
    text: "If you've sent 5 free faxes in a 24-hour period, you'll need to wait until the next day to send more free faxes, or you can use the priority fax option ($1.99) which has no daily limit. The 5-fax limit resets every 24 hours from your first fax.",
  },

  // FILE & DOCUMENT QUESTIONS
  {
    category: "Files & Documents",
    question: "What file types can I send?",
    text: "SendItFax supports PDF, DOC, and DOCX file formats. These are the most common document types and cover virtually all faxing needs. Maximum file size is 25 MB per document. You can attach multiple files, but they must be uploaded all at once.",
  },
  {
    category: "Files & Documents",
    question: "What's the page limit?",
    text: "Free faxes: Maximum 3 pages (not including the auto-generated cover page). Priority faxes ($1.99): Maximum 25 pages. The system automatically counts pages from your uploaded documents and displays the total before sending.",
  },
  {
    category: "Files & Documents",
    question: "Can I send multiple files in one fax?",
    text: "Yes! You can attach multiple files (PDF, DOC, DOCX) to a single fax. They will be combined and sent as one transmission. Just make sure the total page count doesn't exceed your plan limit (3 pages for free, 25 for paid). Important: You must upload all files at once - you cannot add more after clicking send.",
  },
  {
    category: "Files & Documents",
    question: "Can I send faxes without a cover page?",
    text: "Cover pages are required for free faxes (they include sender/receiver information and SendItFax branding). With the priority fax option ($1.99), you can choose to remove the cover page entirely by checking the 'Remove Cover Page' option.",
  },
  {
    category: "Files & Documents",
    question: "What should I write in the cover page text?",
    text: "The cover page text is optional and limited to 500 characters. You can include a brief message, instructions, reference numbers, or any context for the recipient. If you leave it blank, only the sender/receiver information will appear on the cover page.",
  },

  // DELIVERY & TRACKING
  {
    category: "Delivery & Tracking",
    question: "How long does fax delivery take?",
    text: "Free faxes typically deliver within 5-15 minutes, depending on queue length. Priority faxes ($1.99) receive expedited processing and usually deliver within 2-5 minutes. You'll receive email notifications at each stage: queued, sending, delivered, or failed.",
  },
  {
    category: "Delivery & Tracking",
    question: "How do I track my fax status?",
    text: "After sending, you'll receive an email with a unique Fax ID. You can track your fax at any time by visiting senditfax.com/status and entering your Fax ID. The status page shows real-time updates: queued, processing, sending, delivered, or failed.",
  },
  {
    category: "Delivery & Tracking",
    question: "What if my fax fails to deliver?",
    text: "If delivery fails, you'll receive an email notification explaining the reason (busy line, no answer, disconnected number, etc.). Common causes include the recipient's fax machine being turned off, out of paper, or the line being busy. You can resend your fax for free - just use the same information and upload the document again.",
  },
  {
    category: "Delivery & Tracking",
    question: "Will I receive a delivery confirmation?",
    text: "Yes! You'll receive email notifications at multiple stages: initial confirmation when your fax is queued, and a final confirmation when it's successfully delivered. These emails include your Fax ID, recipient information, and timestamp.",
  },
  {
    category: "Delivery & Tracking",
    question: "Can I get proof of delivery?",
    text: "Yes, your email confirmations serve as proof of delivery. They include the Fax ID, transmission date/time, recipient fax number, page count, and delivery status. Keep these emails for your records as they provide official documentation of the transmission.",
  },

  // COVERAGE & COMPATIBILITY
  {
    category: "Coverage & Compatibility",
    question: "Which countries can I send faxes to?",
    text: "Currently, SendItFax supports fax transmission to the United States and Canada only. This includes all 50 US states, US territories, and all Canadian provinces. We support all area codes including toll-free numbers (800, 888, 877, 866, 855, 844, 833).",
  },
  {
    category: "Coverage & Compatibility",
    question: "Can I send to international numbers?",
    text: "At this time, SendItFax only supports USA and Canada. We're working on expanding international coverage in the future. For now, the system only accepts valid US and Canadian fax numbers in standard 10-digit format.",
  },
  {
    category: "Coverage & Compatibility",
    question: "What fax number formats are accepted?",
    text: "We accept standard North American 10-digit fax numbers. The system automatically formats your input, so you can enter numbers as: (123) 456-7890, 123-456-7890, or 1234567890. All formats are accepted and validated before sending.",
  },
  {
    category: "Coverage & Compatibility",
    question: "Can I send to toll-free fax numbers?",
    text: "Yes! SendItFax supports all toll-free fax numbers including 800, 888, 877, 866, 855, 844, and 833 prefixes. These are commonly used by businesses and government agencies.",
  },

  // SECURITY & PRIVACY
  {
    category: "Security & Privacy",
    question: "Is SendItFax secure?",
    text: "Yes! All fax transmissions are encrypted using industry-standard HTTPS/SSL/TLS protocols. Your documents are transmitted securely through encrypted channels. We use the same security standards as online banking.",
  },
  {
    category: "Security & Privacy",
    question: "What is your data storage policy?",
    text: "We temporarily store fax content for a maximum of 3 days for delivery tracking and troubleshooting purposes only. After 3 days, all fax content is permanently and automatically deleted from our servers. We never share, sell, or use your data for any other purpose.",
  },
  {
    category: "Security & Privacy",
    question: "Do you share my information?",
    text: "No. We never share, sell, or distribute your personal information or fax content to third parties. Your data is used solely for fax transmission and delivery notifications. See our Privacy Policy for complete details.",
  },
  {
    category: "Security & Privacy",
    question: "Is SendItFax HIPAA compliant?",
    text: "SendItFax uses encryption and secure transmission protocols similar to those required for HIPAA compliance. However, for transmitting protected health information (PHI), we recommend verifying that SendItFax meets your specific organizational compliance requirements. Contact us for more information about healthcare use cases.",
  },
  {
    category: "Security & Privacy",
    question: "Why do you need CAPTCHA verification?",
    text: "CAPTCHA (the 'I'm not a robot' checkbox) helps us prevent spam, abuse, and automated bot attacks. This security measure ensures our service remains reliable and available for legitimate users. It takes just a few seconds to complete.",
  },

  // TECHNICAL ISSUES
  {
    category: "Technical Support",
    question: "What if I entered the wrong fax number?",
    text: "Unfortunately, once a fax is sent, it cannot be recalled or cancelled. Always double-check the recipient's fax number before clicking send. If you accidentally sent to the wrong number, you'll need to send a new fax to the correct recipient.",
  },
  {
    category: "Technical Support",
    question: "I didn't receive a confirmation email. What should I do?",
    text: "First, check your spam/junk folder - emails sometimes get filtered there. Make sure you entered the correct email address. Add senditfax.com to your email whitelist. If you still don't see the email after 10 minutes, you can check your fax status directly at senditfax.com/status if you noted your Fax ID.",
  },
  {
    category: "Technical Support",
    question: "My fax is stuck in 'queued' status. Is something wrong?",
    text: "Faxes typically remain in 'queued' status for 1-5 minutes while being processed. During high-traffic times, free faxes may take up to 15 minutes. If your fax remains queued for more than 20 minutes, there may be a technical issue. Priority faxes ($1.99) are processed faster with priority queue placement.",
  },
  {
    category: "Technical Support",
    question: "Can I send faxes if I have a slow internet connection?",
    text: "Yes! SendItFax works on any internet connection. Uploading files might take longer on slow connections, but once uploaded, the fax transmission doesn't depend on your connection speed - it's handled by our servers.",
  },
  {
    category: "Technical Support",
    question: "What browsers are supported?",
    text: "SendItFax works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend using the latest version of your browser for the best experience. The service works on both desktop and mobile browsers.",
  },

  // USE CASES
  {
    category: "Use Cases",
    question: "Can I use SendItFax for business purposes?",
    text: "Absolutely! SendItFax is used by individuals, small businesses, healthcare professionals, legal practitioners, real estate agents, and more. Whether you need to send contracts, invoices, medical records, or legal documents, SendItFax handles it all securely and reliably.",
  },
  {
    category: "Use Cases",
    question: "Is SendItFax suitable for sending legal documents?",
    text: "Yes! Faxed documents are legally binding in most jurisdictions, and SendItFax provides the same legal validity as traditional fax machines. You receive delivery confirmations that serve as proof of transmission. Many law firms and legal professionals use online fax services for contracts, court filings, and legal correspondence.",
  },
  {
    category: "Use Cases",
    question: "Can healthcare providers use SendItFax?",
    text: "Yes! Many healthcare professionals use SendItFax to transmit medical records, prescriptions, referrals, and patient information. Our service uses encryption and secure transmission. For HIPAA-covered entities handling protected health information (PHI), please verify compliance with your organization's requirements.",
  },
];

export default FAQList;
