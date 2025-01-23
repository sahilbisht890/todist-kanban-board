import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl text-red-800 font-bold">Todist</h2>
        <p className="text-lg font-medium mt-2 text-gray-800">
          © {new Date().getFullYear()} Todist. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="#"
            className="text-gray-900"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-900"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-900"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
