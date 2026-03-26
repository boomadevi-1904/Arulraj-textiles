import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate(`/login?redirect=/product/${id}`);
      return;
    }
    addToCart(product, qty);
    navigate('/cart');
  };
  const saveToMoodboard = () => {
    const saved = localStorage.getItem('moodboard');
    const board = saved ? JSON.parse(saved) : [];
    const next = [...board, product.image];
    localStorage.setItem('moodboard', JSON.stringify(next));
    alert('Saved to Moodboard');
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-serif text-brand-dark">{product.name}</h1>
          <p className="text-2xl text-brand-gold font-bold">₹{product.price}</p>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
            {product.countInStock > 0 && (
              <span className="text-sm text-gray-500">
                ({product.countInStock} items available)
              </span>
            )}
          </div>

          <div className="border-t border-b border-gray-200 py-6">
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <select 
              value={qty} 
              onChange={(e) => setQty(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-brand-gold"
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full bg-brand-dark text-white py-4 uppercase tracking-widest hover:bg-brand-gold transition duration-300 flex items-center justify-center space-x-2"
          >
            <FiShoppingCart size={20} />
            <span>{product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
          <button
            onClick={saveToMoodboard}
            className="w-full mt-3 border border-brand-dark text-brand-dark py-3 uppercase tracking-widest hover:bg-brand-cream transition"
          >
            Save to Moodboard
          </button>
          
          <div className="text-sm text-gray-500 pt-4">
            <p>Category: <span className="text-brand-dark">{product.category}</span></p>
            <p>Brand: <span className="text-brand-dark">{product.brand}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
