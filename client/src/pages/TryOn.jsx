import React, { useState } from 'react';
import StudioNav from '../components/StudioNav';

const items = [
  { key: 'sofa', label: 'Sofa' },
  { key: 'curtain', label: 'Curtain' },
  { key: 'shirt', label: 'Shirt' },
  { key: 'saree', label: 'Saree' },
  { key: 'pillow', label: 'Pillow' },
];

const TryOn = () => {
  const [fabric, setFabric] = useState('/images/silk.jpg');
  const [item, setItem] = useState('saree');

  const frameStyle = {
    position: 'relative',
    width: '480px',
    height: '360px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #eee',
  };

  const overlayStyle = {
    backgroundImage: `url(${fabric})`,
    backgroundSize: 'cover',
    mixBlendMode: 'multiply',
    opacity: 0.9,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">Fabric Try-On Simulator</h2>
      <StudioNav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex items-center justify-center bg-white p-4">
          <div style={frameStyle}>
            {item === 'curtain' && (
              <div
                className="absolute"
                style={{ left: 32, top: 16, width: 160, height: 256, ...overlayStyle }}
              />
            )}
            {item === 'sofa' && (
              <div
                className="absolute rounded-lg"
                style={{ left: 96, bottom: 32, width: 224, height: 160, ...overlayStyle }}
              />
            )}
            {item === 'shirt' && (
              <div
                className="absolute rounded"
                style={{ left: 160, top: 64, width: 160, height: 160, ...overlayStyle }}
              />
            )}
            {item === 'saree' && (
              <div
                className="absolute"
                style={{ right: 64, bottom: 32, width: 220, height: 160, ...overlayStyle }}
              />
            )}
            {item === 'pillow' && (
              <div
                className="absolute rounded"
                style={{ right: 96, top: 96, width: 120, height: 120, ...overlayStyle }}
              />
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Fabric</label>
            <select value={fabric} onChange={(e) => setFabric(e.target.value)} className="border px-3 py-2 w-full">
              <option value="/images/silk.jpg">Silk</option>
              <option value="/images/cotton.jpg">Cotton</option>
              <option value="/images/denim.jpg">Denim</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Item</label>
            <select value={item} onChange={(e) => setItem(e.target.value)} className="border px-3 py-2 w-full">
              {items.map((i) => (
                <option key={i.key} value={i.key}>{i.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
