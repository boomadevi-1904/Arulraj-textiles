import React, { useState } from 'react';
import StudioNav from '../components/StudioNav';

const RoomVisualizer = () => {
  const [wallColor, setWallColor] = useState('#e5e3dc');
  const [curtainFabric, setCurtainFabric] = useState('/images/silk.jpg');
  const [sofaFabric, setSofaFabric] = useState('/images/denim.jpg');
  const [carpetFabric, setCarpetFabric] = useState('/images/cotton.jpg');

  const fabrics = [
    { src: '/images/silk.jpg', label: 'Silk' },
    { src: '/images/cotton.jpg', label: 'Cotton' },
    { src: '/images/denim.jpg', label: 'Denim' },
    { src: '/images/linen.jpg', label: 'Linen' },
    { src: '/images/velvet.jpg', label: 'Velvet' },
    { src: '/images/wool.jpg', label: 'Wool' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">Room Visualizer</h2>
      <StudioNav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border p-4">
          <div className="relative w-full aspect-video overflow-hidden">
            <div className="absolute inset-0" style={{ backgroundColor: wallColor }} />
            <div className="absolute left-6 top-6 w-40 h-72 bg-white shadow">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${curtainFabric})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'multiply',
                  opacity: 0.9,
                }}
              />
            </div>
            <div className="absolute bottom-12 left-24 w-64 h-32 bg-gray-300 rounded-lg shadow overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${sofaFabric})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'multiply',
                  opacity: 0.9,
                }}
              />
            </div>
            <div className="absolute bottom-0 inset-x-12 h-20 bg-gray-200">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${carpetFabric})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'multiply',
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {fabrics.map((f) => (
              <button
                key={f.src}
                onClick={() => {
                  setCurtainFabric(f.src);
                  setSofaFabric(f.src);
                  setCarpetFabric(f.src);
                }}
                className="border hover:border-brand-gold"
                title={f.label}
              >
                <img src={f.src} alt={f.label} className="w-full h-16 object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-brand-dark">Wall Color</label>
            <input type="color" value={wallColor} onChange={(e) => setWallColor(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-brand-dark">Curtain Fabric</label>
            <select value={curtainFabric} onChange={(e) => setCurtainFabric(e.target.value)} className="border px-3 py-2 w-full">
              {fabrics.map((f) => (
                <option key={f.src} value={f.src}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-brand-dark">Sofa Fabric</label>
            <select value={sofaFabric} onChange={(e) => setSofaFabric(e.target.value)} className="border px-3 py-2 w-full">
              {fabrics.map((f) => (
                <option key={f.src} value={f.src}>{f.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-brand-dark">Carpet Fabric</label>
            <select value={carpetFabric} onChange={(e) => setCarpetFabric(e.target.value)} className="border px-3 py-2 w-full">
              {fabrics.map((f) => (
                <option key={f.src} value={f.src}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomVisualizer;
