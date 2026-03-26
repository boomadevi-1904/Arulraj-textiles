import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          setError('Please login to view your profile');
          setLoading(false);
          return;
        }
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const [profileRes, ordersRes] = await Promise.all([
          axios.get('/api/users/profile', config),
          axios.get('/api/orders/myorders', config),
        ]);
        setProfile(profileRes.data);
        setOrders(ordersRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-8">My Profile</h2>

      {error && <div className="text-red-500 mb-6">{error}</div>}

      {profile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          <div className="bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-serif text-brand-dark mb-4">Account Details</h3>
            <p className="text-gray-700"><span className="font-semibold">Name:</span> {profile.name}</p>
            <p className="text-gray-700"><span className="font-semibold">Email:</span> {profile.email}</p>
            <p className="text-gray-700"><span className="font-semibold">Role:</span> {profile.isAdmin ? 'Admin' : 'Customer'}</p>
            <div className="mt-6">
              <Link to="/shop" className="text-brand-gold hover:underline">Continue Shopping</Link>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-serif text-brand-dark mb-4">Order History</h3>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border">
                  <thead className="bg-brand-cream">
                    <tr>
                      <th className="px-4 py-3 border-b">Order ID</th>
                      <th className="px-4 py-3 border-b">Date</th>
                      <th className="px-4 py-3 border-b">Total</th>
                      <th className="px-4 py-3 border-b">Paid</th>
                      <th className="px-4 py-3 border-b">Delivered</th>
                      <th className="px-4 py-3 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o._id} className="border-b">
                        <td className="px-4 py-3">{o._id}</td>
                        <td className="px-4 py-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">₹{o.totalPrice}</td>
                        <td className="px-4 py-3">{o.isPaid ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3">{o.isDelivered ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3">
                          <Link to="/track" className="text-brand-gold hover:underline">Track</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
