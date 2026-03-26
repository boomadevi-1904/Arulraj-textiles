import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-brand-dark mb-6">Contact Us</h2>
        <p className="text-gray-500">We'd love to hear from you. Get in touch with us for any queries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 text-center shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
            <FiMapPin size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Visit Us</h3>
          <p className="text-gray-600">Pallipalayam, Tamil Nadu, India</p>
        </div>
        <div className="bg-white p-8 text-center shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
            <FiPhone size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Call Us</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
        <div className="bg-white p-8 text-center shadow-sm hover:shadow-md transition duration-300">
          <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
            <FiMail size={24} />
          </div>
          <h3 className="font-bold text-lg mb-2">Email Us</h3>
          <p className="text-gray-600">info@arulrajtextiles.com</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg border-t-4 border-brand-gold">
        <h3 className="text-2xl font-serif text-brand-dark mb-6 text-center">Send us a Message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold" />
          </div>
          <input type="text" placeholder="Subject" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold" />
          <textarea rows="4" placeholder="Message" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-brand-gold"></textarea>
          <button type="submit" className="w-full bg-brand-dark text-white py-3 uppercase tracking-widest hover:bg-brand-gold transition duration-300">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
