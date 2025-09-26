import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import { IconListCheck } from "@tabler/icons-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 border-t border-blue-200">
      <div className="container mx-auto w-full md:w-[80%] px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Logo + About */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <IconListCheck
                color="rgb(220 38 38)"
                size={40}
                className="rounded border-2 border-spacing-3 border-red-600"
              />
              <h2 className="text-2xl font-bold text-red-600">Todoist</h2>
            </div>
            <p className="text-gray-600 max-w-sm mx-auto md:mx-0">
              A modern task management app to organize your projects, stay
              productive, and achieve your goals efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 text-center md:text-left md:flex md:flex-col md:items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex-1 text-center md:text-left md:flex md:flex-col md:items-end">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <IconBrandGithub size={22} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <IconBrandLinkedin size={22} />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <IconBrandTwitter size={22} />
              </a>
              <a
                href="mailto:support@todoist.com"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <IconMail size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Todoist. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
