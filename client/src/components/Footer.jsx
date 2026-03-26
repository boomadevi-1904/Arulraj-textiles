import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-brand-gold">Arulraj Textiles</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manufacturer of premium Cotton Grey Fabric and woven fabrics. 
              Delivering excellence in textile craftsmanship since 2017.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-brand-gold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/shop" className="hover:text-white transition">Collections</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-brand-gold">Contact Us</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Pallipalayam, Tamil Nadu</li>
              <li>Email: info@arulrajtextiles.com</li>
              <li>Phone: +91 98765 43210</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-brand-gold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Arulraj Textiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
