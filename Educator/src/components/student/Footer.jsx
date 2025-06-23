import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
  <footer className="bg-black text-white w-full mt-16">
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-b border-white/20 grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* Logo and Intro */}
    <div className="flex flex-col items-center md:items-start">
      <img src={assets.logo} alt="logo" className="w-32" />
      <p className="mt-6 text-sm text-center md:text-left text-white/70 max-w-xs">
        SkillSphere is dedicated to empowering underserved communities through quality and affordable education. Join us in creating brighter futures.
      </p>
    </div>

    {/* Navigation */}
    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-lg font-semibold mb-4">Company</h2>
      <ul className="space-y-2 text-sm text-left text-white/70">
        <li><a href="#" className="hover:text-white transition">Home</a></li>
        <li><a href="#" className="hover:text-white transition">About Us</a></li>
        <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Newsletter */}
    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h2>
      <p className="text-sm text-white/70 max-w-sm text-center md:text-left">
        Get the latest updates, articles, and course releases sent directly to your inbox.
      </p>
      <div className="flex w-full mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-sm font-medium transition-all">
          Subscribe
        </button>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="text-center py-6 text-sm text-white/50">
    © 2025 SkillSphere. All Rights Reserved.
  </div>
</footer>

  );
};

export default Footer;
