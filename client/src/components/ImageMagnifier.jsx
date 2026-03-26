import React, { useRef, useState } from 'react';

const ImageMagnifier = ({ src, zoom = 2, width = 400, height = 400 }) => {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, show: false });

  const onMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y, show: true });
  };

  const onMouseLeave = () => setPos((p) => ({ ...p, show: false }));

  const bgPos = `${-pos.x * (zoom - 1)}px ${-pos.y * (zoom - 1)}px`;

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden border border-gray-200"
      style={{ width, height }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
      {pos.show && (
        <div
          className="absolute rounded-full border-2 border-white shadow-md"
          style={{
            width: 150,
            height: 150,
            left: pos.x - 75,
            top: pos.y - 75,
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: bgPos,
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
