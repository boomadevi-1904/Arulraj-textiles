import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Use the centralized API service
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiPlus, FiTrash2, FiUsers, FiPackage, FiEdit2, FiXCircle, FiCheckCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveTab = () => {
    if (location.pathname === '/admin/dashboard') return 'users';
    if (location.pathname === '/admin/products') return 'products';
    return 'products'; // default
  };

  const activeTab = getActiveTab();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStock, setEditingStock] = useState(null);
  const [newStock, setNewStock] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      if (activeTab === 'products') {
        // Public route, no token needed, but we use the api instance
        const { data } = await api.get('/api/products');
        setProducts(data);
      } else if (activeTab === 'users') {
        const { data } = await api.get('/api/users', config);
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    } else {
      fetchData();
    }
  }, [user, navigate, activeTab]);

  const updateUserStatusHandler = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    if (window.confirm(`Are you sure you want to set this user to ${newStatus}?`)) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await api.put(`/api/users/${id}/status`, { status: newStatus }, config);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Error updating status');
      }
    }
  };

  const updateStockHandler = async () => {
    if (newStock < 0) {
      alert('Stock cannot be negative');
      return;
    }
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      await api.put(`/api/products/${editingStock._id}/stock`, { countInStock: newStock }, config);
      setEditingStock(null);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating stock');
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create new product?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await api.post('/api/products', {}, config);
        alert('Product created! Please edit the details.');
        fetchData();
        // In a real app, navigate to edit page
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        await api.delete(`/api/products/${id}`, config);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-brand-dark">Admin Dashboard</h2>
      </div>

      <div className="flex space-x-4 mb-8 border-b overflow-x-auto">
        <button
          className={`pb-2 px-4 flex items-center whitespace-nowrap ${activeTab === 'products' ? 'border-b-2 border-brand-gold font-bold text-brand-dark' : 'text-gray-500'}`}
          onClick={() => navigate('/admin/products')}
        >
          <FiPackage className="mr-2" /> Products
        </button>
        <button
          className={`pb-2 px-4 flex items-center whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-brand-gold font-bold text-brand-dark' : 'text-gray-500'}`}
          onClick={() => navigate('/admin/dashboard')}
        >
          <FiUsers className="mr-2" /> Users
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
        </div>
      ) : (
        <div>
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={createProductHandler}
                  className="flex items-center bg-brand-dark text-white px-4 py-2 hover:bg-brand-gold transition rounded shadow"
                >
                  <FiPlus className="mr-2" /> Create Product
                </button>
              </div>
              <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.countInStock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                          <button
                            onClick={() => {
                              setEditingStock(product);
                              setNewStock(product.countInStock);
                            }}
                            className="text-brand-dark hover:text-brand-gold mr-4 p-1"
                            title="Edit Stock"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteProductHandler(product._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Product"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {u.name} {u._id === user._id && <span className="text-xs text-brand-gold">(You)</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                        {u._id !== user._id && (
                          <button
                            onClick={() => updateUserStatusHandler(u._id, u.status)}
                            className={`${u.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} p-1`}
                            title={u.status === 'active' ? 'Deactivate User' : 'Activate User'}
                          >
                            {u.status === 'active' ? <FiXCircle size={18} /> : <FiCheckCircle size={18} />}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Edit Stock Modal */}
      {editingStock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Stock: {editingStock.name}</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock: {editingStock.countInStock}</label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-brand-gold focus:border-brand-gold outline-none"
                min="0"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditingStock(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={updateStockHandler}
                className="bg-brand-dark text-white px-6 py-2 rounded hover:bg-brand-gold transition"
              >
                Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
