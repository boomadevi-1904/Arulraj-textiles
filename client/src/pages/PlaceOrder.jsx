import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const PlaceOrder = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 80;
  const taxPrice = Math.round(itemsPrice * 0.12);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=placeorder');
      return;
    }
    const saved = localStorage.getItem('shippingAddress');
    if (!saved) {
      navigate('/shipping');
      return;
    }
    setShippingAddress(JSON.parse(saved));
  }, [user, navigate]);

  const placeOrderHandler = async () => {
    try {
      setPlacing(true);
      setError('');
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = {
        orderItems: cartItems.map((i) => ({
          name: i.name,
          qty: i.qty,
          image: i.image,
          price: i.price,
          product: i._id,
        })),
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
        },
        paymentMethod: 'COD',
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };
      const { data } = await axios.post('/api/orders', payload, config);
      clearCart();
      localStorage.removeItem('shippingAddress');
      navigate('/track');
      alert(`Order placed successfully! Your Order ID: ${data._id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!shippingAddress) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-8">Review & Place Order</h2>
      {error && <div className="text-red-500 mb-6">{error}</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-serif text-brand-dark mb-4">Shipping</h3>
            <p className="text-gray-700">
              {shippingAddress.fullName}<br />
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}<br />
              Phone: {shippingAddress.phone}
            </p>
          </div>
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-serif text-brand-dark mb-4">Items</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                    <span>{item.name} x {item.qty}</span>
                  </div>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white p-8 shadow-sm border border-gray-100 h-fit">
          <h3 className="text-xl font-serif text-brand-dark mb-6">Order Summary</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between"><span>Items</span><span>₹{itemsPrice}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{taxPrice}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>₹{shippingPrice}</span></div>
            <div className="border-t pt-3 flex justify-between text-xl font-bold text-brand-dark">
              <span>Total</span><span>₹{totalPrice}</span>
            </div>
          </div>
          <button
            onClick={placeOrderHandler}
            disabled={placing}
            className="w-full mt-6 bg-brand-dark text-white py-3 uppercase tracking-wider hover:bg-brand-gold transition duration-300"
          >
            {placing ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
