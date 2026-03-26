import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-8">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/shop" className="text-brand-gold hover:underline">Go Back to Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center bg-white p-4 shadow-sm border border-gray-100">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="ml-4 flex-grow">
                  <Link to={`/product/${item._id}`} className="text-lg font-serif text-brand-dark hover:text-brand-gold">{item.name}</Link>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Qty: {item.qty}</span>
                  <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-serif text-brand-dark mb-4">Saved Items</h3>
            <p className="text-sm text-gray-600 mb-6">
              This cart is for showcasing products only. Checkout is disabled.
            </p>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Total Items</span>
              <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full bg-red-600 text-white py-3 uppercase tracking-wider hover:bg-red-700 transition duration-300"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
