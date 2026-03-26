import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudioNav from '../components/StudioNav';

const Moodboard = () => {
  const [products, setProducts] = useState([]);
  const [board, setBoard] = useState(() => {
    const saved = localStorage.getItem('moodboard');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem('moodboard', JSON.stringify(board));
  }, [board]);

  const onAdd = (img) => setBoard((prev) => [...prev, img]);
  const onClear = () => setBoard([]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">Wishlist & Moodboard</h2>
      <StudioNav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border p-4 bg-white min-h-[420px]">
          <div className="grid grid-cols-3 gap-4">
            {board.map((img, idx) => (
              <div key={idx} className="border">
                <img src={img} alt="" className="w-full h-32 object-cover" />
              </div>
            ))}
          </div>
          <button onClick={onClear} className="mt-4 bg-brand-dark text-white px-4 py-2 hover:bg-brand-gold transition">Clear</button>
        </div>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between border p-2 bg-white">
              <div className="flex items-center">
                <img src={p.image} alt={p.name} className="w-14 h-14 object-cover mr-3" />
                <div className="text-sm">{p.name}</div>
              </div>
              <button onClick={() => onAdd(p.image)} className="px-3 py-2 border">Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Moodboard;
