import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-brand-dark mb-6">About Arulraj Textiles</h2>
        <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Textile Loom" 
            className="w-full rounded-lg shadow-xl"
          />
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-serif text-brand-dark">Our Heritage</h3>
          <p className="text-gray-600 leading-relaxed">
            Established in 2017 in Pallipalayam, Tamil Nadu, Arulraj Textiles has grown from a humble proprietorship to a renowned manufacturer of premium quality fabrics.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our commitment to quality is woven into every thread. We specialize in Cotton Grey Fabric, Woven Fabrics, and Cotton Woven Fabrics. With a dedicated team of 26-50 skilled professionals, we ensure that every meter of fabric meets global standards.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 shadow-sm border border-gray-100 text-center">
              <span className="block text-3xl font-bold text-brand-gold">5+</span>
              <span className="text-sm text-gray-500">Years of Excellence</span>
            </div>
            <div className="bg-white p-4 shadow-sm border border-gray-100 text-center">
              <span className="block text-3xl font-bold text-brand-gold">500+</span>
              <span className="text-sm text-gray-500">Happy Clients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
