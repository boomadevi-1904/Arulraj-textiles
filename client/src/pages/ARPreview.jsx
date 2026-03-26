import React, { useEffect, useRef, useState, useCallback } from 'react';
import StudioNav from '../components/StudioNav';

const ARPreview = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [fabric, setFabric] = useState('/images/cotton.jpg');
  const [overlay, setOverlay] = useState({
    x: 120,
    y: 80,
    width: 200,
    height: 260,
    opacity: 0.85,
  });
  const [dragging, setDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (error) {
        console.error(error);
      }
    };
    start();
  }, []);

  const onPointerDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    dragOffsetRef.current = { x: px - overlay.x, y: py - overlay.y };
    setDragging(true);
  };

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      const rect = containerRef.current.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      setOverlay((o) => ({
        ...o,
        x: Math.max(0, Math.min(px - dragOffsetRef.current.x, rect.width - o.width)),
        y: Math.max(0, Math.min(py - dragOffsetRef.current.y, rect.height - o.height)),
      }));
    },
    [dragging]
  );

  const onPointerUp = () => setDragging(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      el.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [dragging, overlay.width, overlay.height, onPointerMove]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-brand-dark mb-4">AR Preview (Beta)</h2>
      <StudioNav />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative bg-black">
          <div ref={containerRef} className="relative w-full">
            <video ref={videoRef} className="w-full h-auto" muted playsInline />
            <div
              onPointerDown={onPointerDown}
              className="absolute border border-white/60"
              style={{
                left: overlay.x,
                top: overlay.y,
                width: overlay.width,
                height: overlay.height,
                backgroundImage: `url(${fabric})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: overlay.opacity,
                mixBlendMode: 'multiply',
                touchAction: 'none',
                cursor: 'grab',
              }}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block mb-2">Fabric</label>
          <select value={fabric} onChange={(e) => setFabric(e.target.value)} className="border px-3 py-2 w-full">
            <option value="/images/cotton.jpg">Cotton</option>
            <option value="/images/silk.jpg">Silk</option>
            <option value="/images/denim.jpg">Denim</option>
          </select>
          <div>
            <label className="block mb-2">Width</label>
            <input
              type="range"
              min="120"
              max="600"
              value={overlay.width}
              onChange={(e) => setOverlay((o) => ({ ...o, width: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Height</label>
            <input
              type="range"
              min="120"
              max="600"
              value={overlay.height}
              onChange={(e) => setOverlay((o) => ({ ...o, height: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-2">Opacity</label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.01"
              value={overlay.opacity}
              onChange={(e) => setOverlay((o) => ({ ...o, opacity: Number(e.target.value) }))}
              className="w-full"
            />
          </div>
          <div className="text-gray-600 text-sm">Drag the fabric rectangle over your window or sofa.</div>
        </div>
      </div>
    </div>
  );
};

export default ARPreview;
