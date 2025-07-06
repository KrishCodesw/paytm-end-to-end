import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 text-black py-6 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
        {/* Left: Brand */}
        <h2 className="genos text-2xl font-medium">Paytm</h2>

        {/* Center: Message */}
        <div className="max-w-xl poiret-one text-sm leading-relaxed px-4">
          <p>
            <strong className="">
              This project is designed and developed by Krish Jain. <br />
              It's a practice project to demonstrate secure transactions in
              MongoDB, REST API integration, and full-stack development using
              React + Express.
            </strong>
          </p>
        </div>

        {/* Right: Copyright */}
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Paytm Clone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
