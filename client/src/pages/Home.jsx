import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/api/products');
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cotton.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-white mb-6 tracking-wide"
          >
            EXQUISITE LUXURY FABRICS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-200 font-light italic mb-10"
          >
            Crafted for the Connoisseur
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/shop" className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition duration-300 text-lg uppercase tracking-widest">
              Discover Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Luxury Fabric Showcase */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image 1 - Fine Silks */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg mb-6">
                <img 
                  src="/images/silk.jpg" 
                  alt="Fine Silks" 
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2">Fine Silks</h3>
              <p className="text-gray-600 italic">Lustrous & Elegant</p>
            </motion.div>

            {/* Image 2 - Durable Denim */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg mb-6">
                <img 
                  src="/images/denim.jpg" 
                  alt="Durable Denim" 
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2">Durable Denim</h3>
              <p className="text-gray-600 italic">Classic & Robust</p>
            </motion.div>

            {/* Image 3 - Pure Cotton */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg mb-6">
                <img 
                  src="/images/cotton.jpg" 
                  alt="Pure Cotton" 
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-2">Pure Cotton</h3>
              <p className="text-gray-600 italic">Soft & Breathable</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6">THE ART OF TEXTILE ELEGANCE</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            At Arulraj Textiles, we weave tradition with modernity. Our fabrics are a testament to superior craftsmanship, 
            blending the finest fibers to create textures that feel as luxurious as they look. Experience the finest in artisanal fabrics.
          </p>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-brand-dark">Featured Collections</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product) => (
              <motion.div 
                key={product._id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <Link to={`/product/${product._id}`} className="px-6 py-2 bg-white text-brand-dark text-sm uppercase tracking-wider hover:bg-brand-gold hover:text-white transition">
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-serif text-brand-dark mb-2">{product.name}</h3>
                  <p className="text-brand-gold font-bold italic">{product.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section - The Art of Weaving */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3753634/3753634-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-20 text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">The Soul of Fabric</h2>
          <p className="text-xl max-w-2xl mx-auto font-light mb-8">
            Watch the intricate process of how our master weavers bring threads to life.
            Every weave tells a story of tradition, dedication, and artistry.
          </p>
          <Link to="/about" className="inline-flex items-center space-x-2 border-b-2 border-white pb-1 hover:text-brand-gold hover:border-brand-gold transition">
            <span>Learn Our Story</span>
          </Link>
        </div>
      </section>

      {/* Parallax / Banner */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Custom Orders & Bulk Supplies</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            We specialize in bulk manufacturing and custom fabric solutions for designers and businesses.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-brand-gold text-white hover:bg-white hover:text-brand-gold transition duration-300 text-lg font-bold">
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
