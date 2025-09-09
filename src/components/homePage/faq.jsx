import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import Header from "../common/header";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I create a new task?",
      answer:
        "To create a new task, click the '+' button in the top right corner of your dashboard. Enter your task details, set a due date if needed, and assign it to a project. You can also add labels and priority levels to better organize your tasks.",
    },
    {
      question: "Can I use Todoist for team projects?",
      answer:
        "Yes, Todoist offers collaboration features for teams. You can share projects with team members, assign tasks, set permissions, and comment on tasks. The Business plan includes additional team management features like admin controls and team billing.",
    },
    {
      question: "Is there a free version available?",
      answer:
        "Yes, Todoist offers a Free plan that includes up to 5 active projects, 5 collaborators per project, and 5MB file uploads. For unlimited projects, reminders, and more advanced features, you can upgrade to Pro or Business plans.",
    },
    {
      question: "How does the priority system work?",
      answer:
        "Todoist uses 4 priority levels: Priority 1 (red) for urgent tasks, Priority 2 (orange) for important tasks, Priority 3 (yellow) for medium priority tasks, and Priority 4 (no color) for low priority tasks. You can set priorities manually or let Todoist suggest priorities based on due dates and your usage patterns.",
    },
    {
      question: "Can I access Todoist offline?",
      answer:
        "Yes, Todoist works offline on mobile devices. Any changes you make while offline will sync automatically once you reconnect to the internet. On desktop, you need an internet connection to access your tasks, but we're working on offline support for desktop apps.",
    },
    {
      question: "How secure is my data with Todoist?",
      answer:
        "We take security seriously. Todoist uses SSL/TSL encryption for all data transfers between your devices and our servers. Your data is stored on secure servers with regular backups. We also offer two-factor authentication for added account security.",
    },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8" id="faq">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header
          title={"Frequently Asked Questions"}
          description={
            "Find answers to common questions about Todoist. Can't find what you're looking for? Contact our support team."
          }
        />

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="flex justify-between items-center w-full p-4 md:p-6 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-800 pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 ml-2">
                  {activeIndex === index ? (
                    <IconMinus size={20} className="text-red-600" />
                  ) : (
                    <IconPlus size={20} className="text-red-600" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: {
                          duration: 0.3,
                        },
                        opacity: {
                          duration: 0.25,
                          delay: 0.1,
                        },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: {
                          duration: 0.3,
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 md:px-6 md:pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
