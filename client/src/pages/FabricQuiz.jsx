import React, { useState } from 'react';
import axios from 'axios';
import StudioNav from '../components/StudioNav';

const FabricQuiz = () => {
  const [answers, setAnswers] = useState({ season: 'summer', use: 'dress', budget: 'medium' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const recommend = async () => {
    setLoading(true);
    let category = 'Cotton';
    if (answers.use === 'sofa') category = 'Denim';
    if (answers.use === 'curtain') category = 'Silk';
    if (answers.season === 'winter') category = 'Denim';
    if (answers.season === 'summer') category = 'Cotton';
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setResults(data.filter((p) => p.category.toLowerCase() === category.toLowerCase()));
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const update = (name, value) => setAnswers((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">Smart Fabric Recommendation</h2>
      <StudioNav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Season</label>
            <select value={answers.season} onChange={(e) => update('season', e.target.value)} className="border px-3 py-2 w-full">
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Use</label>
            <select value={answers.use} onChange={(e) => update('use', e.target.value)} className="border px-3 py-2 w-full">
              <option value="dress">Dress</option>
              <option value="curtain">Curtain</option>
              <option value="sofa">Sofa</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Budget</label>
            <select value={answers.budget} onChange={(e) => update('budget', e.target.value)} className="border px-3 py-2 w-full">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button onClick={recommend} className="w-full bg-brand-dark text-white py-3 hover:bg-brand-gold transition">Get Suggestions</button>
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <div>Loading...</div>
          ) : results.length === 0 ? (
            <div className="text-gray-600">No matching fabrics found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((p) => (
                <div key={p._id} className="border p-4 bg-white">
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-3" />
                  <div className="text-lg font-serif">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.category}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FabricQuiz;
