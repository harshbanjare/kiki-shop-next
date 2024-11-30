"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaSearch } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const FAQs = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const faqData: FAQSection[] = [
    {
      title: "General",
      items: [
        {
          question: "I have trouble accessing the website?",
          answer: [
            "You may want to refresh your browser. If you are still experiencing any difficulty accessing the website, please check to make sure your internet connection is working properly.",
            "If it is not, please contact your internet provider. If you are able to connect but still having problems, you may need to clean out your temporary Internet files, cookies or cache",
          ],
        },
        {
          question: "How do I use Kiki products?",
          answer:
            'Once you have shortlisted a product, please click on it & you will find a small write-up with instructions on "how to use the product". If it is still not helpful please drop us a mail at hello@kikibeauty.in.',
        },
        {
          question: "What type of ingredients are used in Kiki products?",
          answer:
            "We use the safest ingredients to manufacture our products. Our current range of products is Formaldehyde, Mineral Oil, Paraffin, Phenoxyethanols and Volatile Cyclomethicones (D4, D5, D6) free. All products are dermatologically tested. To know the entire ingredient list of individual products please click on the respective product on our site.",
        },
        {
          question: "Does Kiki test on animals?",
          answer:
            "All our Products are 100% cruelty-free and not tested on animals.",
        },
      ],
    },
    {
      title: "Shipping",
      items: [
        {
          question: "What is the estimated time of delivery?",
          answer:
            "Your faves will reach you in 3-7 business days. A few areas may face delays due to government mandated restrictions.",
        },
        {
          question: "Are there any shipping charges applicable on my order?",
          answer:
            "A minimal fee of Rs.49 is applicable on orders below Rs.500.",
        },
        {
          question: "Where can I track my order?",
          answer:
            "We will also send you an email with the tracking details once the order is shipped.",
        },
        {
          question: "Can I amend my order?",
          answer:
            "Once the order is placed we cannot make any changes in the products.",
        },
        {
          question:
            "How can I update my address/contact number for my ongoing order?",
          answer:
            "You can drop an email to hello@kikibeauty.in within 12 to 24 hours of placing the order.",
        },
      ],
    },
    {
      title: "Cancellation",
      items: [
        {
          question: "How do I cancel an order I just placed?",
          answer:
            "You can drop an email to hello@kikibeauty.in within 12 to 24 hours of placing the order.",
        },
      ],
    },
    {
      title: "Returns",
      items: [
        {
          question:
            "I did not like the product I ordered. How do I create a return request?",
          answer:
            "You can drop in a mail to us at hello@kikibeauty.in within 14 days of receiving your order.",
        },
        {
          question: "What is the product replacement/return policy?",
          answer:
            "You can drop in a mail to us hello@kikibeauty.in within 14 days of receiving your product and reverse pickup will be arranged. Once the product reaches us we will help you with the refund or replacement.",
        },
        {
          question: "How do I make a return or exchange?",
          answer:
            "Please drop us a mail on hello@kikibeauty.in with product details and the cause of returning the product. We will be happy to assist you.",
        },
        {
          question:
            "What is the refund procedure for canceled or returned orders?",
          answer: [
            "Canceled Order: In case of a prepaid order - the amount will be refunded back to the account from which the payment was initiated, within 3-5 working days.",
            "Returned Order: (a) In case of a prepaid order - the amount will be refunded back to the account from which the payment was initiated, within 3-5 working days",
            "(b) In case of a cash on delivery order - the amount will be refunded in the form of a cheque or bank transfer for which certain details need to be provided over email (hello@kikibeauty.in), the amount will be refunded back to the account from which it was paid within 3-5 working days.",
          ],
        },
      ],
    },
  ];

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleItem = (question: string) => {
    setOpenItems((prev) => ({ ...prev, [question]: !prev[question] }));
  };

  const filteredFaqData = faqData
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (typeof item.answer === "string" &&
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (Array.isArray(item.answer) &&
            item.answer.some((ans) =>
              ans.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">How can we help you?</h1>
          <p className="text-gray-300 text-lg mb-8">
            Find answers to frequently asked questions about Kiki Beauty
            products and services
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E4AA81] text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 max-w-4xl py-16">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {faqData.map((section) => (
            <button
              key={section.title}
              onClick={() => toggleSection(section.title)}
              className="p-4 text-center rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#E4AA81]/30"
            >
              <h3 className="font-medium text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {section.items.length} articles
              </p>
            </button>
          ))}
        </div>

        {/* FAQ Sections */}
        <div className="space-y-6">
          {filteredFaqData.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-[#E4AA81]/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-black to-zinc-900 text-white"
              >
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <motion.div
                  animate={{ rotate: openSections[section.title] ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown className="text-[#E4AA81]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openSections[section.title] && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      {section.items.map((item) => (
                        <div
                          key={item.question}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 rounded-lg transition-colors duration-200"
                        >
                          <button
                            onClick={() => toggleItem(item.question)}
                            className="w-full py-4 px-4 flex justify-between items-center text-left"
                          >
                            <h3 className="text-lg font-medium pr-8 text-gray-900">
                              {item.question}
                            </h3>
                            <motion.div
                              animate={{
                                rotate: openItems[item.question] ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0"
                            >
                              <FaChevronDown className="text-[#E4AA81]" />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {openItems[item.question] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 text-gray-600 space-y-3">
                                  {Array.isArray(item.answer) ? (
                                    item.answer.map((paragraph, index) => (
                                      <p
                                        key={index}
                                        className="leading-relaxed"
                                      >
                                        {paragraph}
                                      </p>
                                    ))
                                  ) : (
                                    <p className="leading-relaxed">
                                      {item.answer}
                                    </p>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 text-center bg-black text-white p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Please reach out to our
            customer support team.
          </p>
          <a
            href="mailto:hello@kikibeauty.in"
            className="inline-block px-6 py-3 bg-[#E4AA81] text-black font-semibold rounded-lg hover:bg-[#F9E7DA] transition-colors duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
