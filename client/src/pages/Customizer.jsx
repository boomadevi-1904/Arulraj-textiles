import React, { useRef, useState, useEffect } from 'react';
import StudioNav from '../components/StudioNav';

const Customizer = () => {
  const canvasRef = useRef(null);
  const [color1, setColor1] = useState('#d4af37');
  const [color2, setColor2] = useState('#ffffff');
  const [pattern, setPattern] = useState('stripes');
  const [repeat, setRepeat] = useState(10);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pattern === 'stripes') {
      for (let i = 0; i < canvas.width; i += repeat) {
        ctx.fillStyle = color1;
        ctx.fillRect(i, 0, repeat / 2, canvas.height);
        ctx.fillStyle = color2;
        ctx.fillRect(i + repeat / 2, 0, repeat / 2, canvas.height);
      }
    } else if (pattern === 'dots') {
      ctx.fillStyle = color2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color1;
      for (let y = 0; y < canvas.height; y += repeat) {
        for (let x = 0; x < canvas.width; x += repeat) {
          ctx.beginPath();
          ctx.arc(x + repeat / 2, y + repeat / 2, repeat / 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      ctx.fillStyle = color1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [color1, color2, pattern, repeat]);

  const saveDesign = () => {
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-fabric.png';
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">Color & Pattern Customizer</h2>
      <StudioNav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border p-4 flex items-center justify-center bg-white">
          <canvas ref={canvasRef} width={600} height={400} />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Primary Color</label>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Secondary Color</label>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />
          </div>
          <div>
            <label className="block mb-2">Pattern</label>
            <select value={pattern} onChange={(e) => setPattern(e.target.value)} className="border px-3 py-2 w-full">
              <option value="stripes">Stripes</option>
              <option value="dots">Dots</option>
              <option value="solid">Solid</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Repeat Size</label>
            <input type="range" min="6" max="40" value={repeat} onChange={(e) => setRepeat(Number(e.target.value))} className="w-full" />
          </div>
          <button onClick={saveDesign} className="w-full bg-brand-dark text-white py-3 hover:bg-brand-gold transition">Download Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
