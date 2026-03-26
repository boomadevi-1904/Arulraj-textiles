import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Shipping = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('shippingAddress');
    return saved
      ? JSON.parse(saved)
      : {
          fullName: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
          phone: '',
        };
  });

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=shipping');
    }
  }, [user, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify(form));
    navigate('/placeorder');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-8">Shipping Details</h2>
      <form onSubmit={submitHandler} className="bg-white p-8 shadow-sm border border-gray-100 space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} className="w-full border px-4 py-3" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full border px-4 py-3" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full border px-4 py-3" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Postal Code</label>
            <input name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full border px-4 py-3" required />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <input name="country" value={form.country} onChange={handleChange} className="w-full border px-4 py-3" required />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-4 py-3" required />
        </div>
        <button type="submit" className="w-full bg-brand-dark text-white py-3 uppercase tracking-wider hover:bg-brand-gold transition duration-300">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shipping;
